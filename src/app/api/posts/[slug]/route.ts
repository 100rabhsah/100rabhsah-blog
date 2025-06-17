import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { BlogPost } from '@/types/blog';

const POSTS_FILE = path.join(process.cwd(), 'src/data/blog-posts.ts');

/**
 * @param {Request} request
 * @param {{ params: { slug: string } }} context
 */
// @ts-expect-error Next.js does not provide explicit types for context
export async function DELETE(request, context) {
  try {
    const { slug } = context.params;
    // Read existing posts
    const fileContent = await readFile(POSTS_FILE, 'utf-8');
    const postsMatch = fileContent.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*?\]);/);
    if (!postsMatch) {
      throw new Error('Could not parse existing posts');
    }
    const existingPosts: BlogPost[] = eval(postsMatch[1]);
    // Remove the post with the given slug
    const updatedPosts = existingPosts.filter(post => post.slug !== slug);
    // Update the file content
    const updatedContent = fileContent.replace(
      /export const blogPosts: BlogPost\[\] = \[[\s\S]*?\];/,
      `export const blogPosts: BlogPost[] = ${JSON.stringify(updatedPosts, null, 2)};`
    );
    await writeFile(POSTS_FILE, updatedContent, 'utf-8');
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
    // Read existing posts
    const fileContent = await readFile(POSTS_FILE, 'utf-8');
    const postsMatch = fileContent.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*?\]);/);
    if (!postsMatch) {
      throw new Error('Could not parse existing posts');
    }
    let existingPosts: BlogPost[] = eval(postsMatch[1]);
    // Update the post with the given slug
    existingPosts = existingPosts.map(post =>
      post.slug === slug ? { ...post, ...updated } : post
    );
    // Update the file content
    const updatedContent = fileContent.replace(
      /export const blogPosts: BlogPost\[\] = \[[\s\S]*?\];/,
      `export const blogPosts: BlogPost[] = ${JSON.stringify(existingPosts, null, 2)};`
    );
    await writeFile(POSTS_FILE, updatedContent, 'utf-8');
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