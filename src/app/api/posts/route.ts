import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { BlogPost } from '@/types/blog';

// Use JSON file in public directory for production compatibility
const POSTS_FILE = path.join(process.cwd(), 'public', 'blog-posts.json');

export async function POST(request: Request) {
  try {
    const post = await request.json();
    console.log('Received post data:', post);
    
    // Ensure slug is properly generated
    if (!post.slug) {
      post.slug = post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    // Read existing posts from JSON file
    let existingPosts: BlogPost[] = [];
    try {
      const fileContent = await readFile(POSTS_FILE, 'utf-8');
      existingPosts = JSON.parse(fileContent);
    } catch {
      // File doesn't exist yet, start with empty array
      console.log('No existing posts file found, starting fresh');
    }
    
    console.log('Existing posts count:', existingPosts.length);
    
    // Check for duplicate slug
    const existingSlug = existingPosts.find(p => p.slug === post.slug);
    if (existingSlug) {
      return NextResponse.json(
        { error: 'A post with this slug already exists' },
        { status: 400 }
      );
    }
    
    // Add new post with ID
    const newPost: BlogPost = {
      ...post,
      id: (existingPosts.length + 1).toString()
    };
    
    console.log('New post to save:', newPost);
    
    // Save to JSON file
    await writeFile(POSTS_FILE, JSON.stringify([...existingPosts, newPost], null, 2), 'utf-8');
    console.log('Post saved successfully');
    
    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to save post' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Read posts from JSON file
    let posts: BlogPost[] = [];
    try {
      const fileContent = await readFile(POSTS_FILE, 'utf-8');
      posts = JSON.parse(fileContent);
    } catch {
      // File doesn't exist yet, return empty array
      console.log('No posts file found');
    }
    
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error reading posts:', error);
    return NextResponse.json(
      { error: 'Failed to read posts' },
      { status: 500 }
    );
  }
} 