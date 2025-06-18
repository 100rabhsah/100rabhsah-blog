import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { BlogPost } from '@/types/blog';

const POSTS_FILE = path.join(process.cwd(), 'src/data/blog-posts.ts');

export async function POST(request: Request) {
  try {
    const post = await request.json();
    console.log('Received post data:', post);
    
    // Ensure slug is properly generated
    if (!post.slug) {
      post.slug = post.title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    }
    
    // Read existing posts
    const fileContent = await readFile(POSTS_FILE, 'utf-8');
    const postsMatch = fileContent.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*?\]);/);
    
    if (!postsMatch) {
      throw new Error('Could not parse existing posts');
    }

    const existingPosts: BlogPost[] = eval(postsMatch[1]);
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
    
    // Update the file content
    const updatedContent = fileContent.replace(
      /export const blogPosts: BlogPost\[\] = \[[\s\S]*?\];/,
      `export const blogPosts: BlogPost[] = ${JSON.stringify([...existingPosts, newPost], null, 2)};`
    );
    
    await writeFile(POSTS_FILE, updatedContent, 'utf-8');
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