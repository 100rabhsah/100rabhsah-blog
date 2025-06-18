import { NextResponse } from 'next/server';
import { writeFile, readFile } from 'fs/promises';
import path from 'path';
import { BlogPost } from '@/types/blog';

const POSTS_FILE = path.join(process.cwd(), 'src/data/blog-posts.ts');

export async function POST(request: Request) {
  try {
    const post = await request.json();
    
    // Read existing posts
    const fileContent = await readFile(POSTS_FILE, 'utf-8');
    const postsMatch = fileContent.match(/export const blogPosts: BlogPost\[\] = (\[[\s\S]*?\]);/);
    
    if (!postsMatch) {
      throw new Error('Could not parse existing posts');
    }

    const existingPosts: BlogPost[] = eval(postsMatch[1]);
    
    // Add new post with ID
    const newPost: BlogPost = {
      ...post,
      id: (existingPosts.length + 1).toString()
    };
    
    // Update the file content
    const updatedContent = fileContent.replace(
      /export const blogPosts: BlogPost\[\] = \[[\s\S]*?\];/,
      `export const blogPosts: BlogPost[] = ${JSON.stringify([...existingPosts, newPost], null, 2)};`
    );
    
    await writeFile(POSTS_FILE, updatedContent, 'utf-8');
    
    return NextResponse.json({ success: true, post: newPost });
  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json(
      { error: 'Failed to save post' },
      { status: 500 }
    );
  }
} 