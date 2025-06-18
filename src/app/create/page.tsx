'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BlogPostForm from '@/components/BlogPostForm';
import { BlogPost } from '@/types/blog';

export default function CreatePostPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (post: Omit<BlogPost, 'id'>) => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      console.log('Submitting post:', post);
      
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      console.log('Response status:', response.status);
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error response:', errorData);
        throw new Error(errorData.error || 'Failed to create post');
      }

      const data = await response.json();
      console.log('Success response:', data);
      
      // Redirect to blog listing page instead of specific post to avoid 404
      router.push('/blog');
    } catch (err) {
      console.error('Error creating post:', err);
      setError(err instanceof Error ? err.message : 'Failed to create post');
    } finally {
      setIsSubmitting(false);
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
      
      {isSubmitting && (
        <div className="mt-4 p-4 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-100 rounded-lg">
          Creating post...
        </div>
      )}
    </div>
  );
} 