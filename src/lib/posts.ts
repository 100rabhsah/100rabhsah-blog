import { BlogPost } from '@/types/blog';

export async function getPosts(): Promise<BlogPost[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/posts`, {
      cache: 'no-store'
    });
    
    if (!response.ok) {
      console.error('Failed to fetch posts');
      return [];
    }
    
    const data = await response.json();
    return data.posts || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
} 