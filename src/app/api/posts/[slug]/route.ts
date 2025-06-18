import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { BlogPost } from '@/types/blog';

// Use JSON file in public directory for production compatibility
const POSTS_FILE = path.join(process.cwd(), 'public', 'blog-posts.json');

/**
 * @param {Request} request
 * @param {{ params: { slug: string } }} context
 */
// @ts-expect-error Next.js does not provide explicit types for context
export async function DELETE(request, context) {
  try {
    const { slug } = context.params;
    
    // Read existing posts from JSON file
    let existingPosts: BlogPost[] = [];
    try {
      const fileContent = await readFile(POSTS_FILE, 'utf-8');
      existingPosts = JSON.parse(fileContent);
    } catch {
      return NextResponse.json(
        { error: 'No posts found' },
        { status: 404 }
      );
    }
    
    // Remove the post with the given slug
    const updatedPosts = existingPosts.filter(post => post.slug !== slug);
    
    // Save to JSON file
    await writeFile(POSTS_FILE, JSON.stringify(updatedPosts, null, 2), 'utf-8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}

/**
 * @param {Request} request
 * @param {{ params: { slug: string } }} context
 */
// @ts-expect-error Next.js does not provide explicit types for context
export async function PUT(request, context) {
  try {
    const { slug } = context.params;
    const updated = await request.json();
    
    // Read existing posts from JSON file
    let existingPosts: BlogPost[] = [];
    try {
      const fileContent = await readFile(POSTS_FILE, 'utf-8');
      existingPosts = JSON.parse(fileContent);
    } catch {
      return NextResponse.json(
        { error: 'No posts found' },
        { status: 404 }
      );
    }
    
    // Update the post with the given slug
    existingPosts = existingPosts.map(post =>
      post.slug === slug ? { ...post, ...updated } : post
    );
    
    // Save to JSON file
    await writeFile(POSTS_FILE, JSON.stringify(existingPosts, null, 2), 'utf-8');
    
    const updatedPost = existingPosts.find(post => post.slug === (updated.slug || slug));
    return NextResponse.json({ success: true, post: updatedPost });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    );
  }
} 