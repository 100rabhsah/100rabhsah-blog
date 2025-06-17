'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogPostForm from '@/components/BlogPostForm';
import { BlogPost } from '@/types/blog';

export default function CreatePostPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (post: Omit<BlogPost, 'id'>) => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Redirect to the new post
      const data = await response.json();
      router.push(`/blog/${data.post.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create post');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Create New Post</h1>
      
      {error && (
        <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">
          {error}
        </div>
      )}

      <BlogPostForm onSubmit={handleSubmit} />
    </div>
  );
} 