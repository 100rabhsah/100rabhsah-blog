'use client';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import BlogPostForm from '@/components/BlogPostForm';
import { BlogPost } from '@/types/blog';
import { useState, useEffect } from 'react';
import { getPosts } from '@/lib/posts';

export default function EditPostPageContent({ slug }: { slug: string }) {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const [error, setError] = useState('');
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const posts = await getPosts();
        const found = posts.find((p: BlogPost) => p.slug === slug);
        setPost(found || null);
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Failed to load post');
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [slug]);

  if (!isAdmin) {
    return <div className="max-w-2xl mx-auto px-4 py-8 text-center text-red-600">Admin access required.</div>;
  }

  if (loading) {
    return <div className="max-w-2xl mx-auto px-4 py-8 text-center">Loading...</div>;
  }

  if (!post) {
    return <div className="max-w-2xl mx-auto px-4 py-8 text-center">Post not found.</div>;
  }

  const handleSubmit = async (updated: Omit<BlogPost, 'id'>) => {
    try {
      const response = await fetch(`/api/posts/${post.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (!response.ok) throw new Error('Failed to update post');
      const data = await response.json();
      router.push(`/blog/${data.post.slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update post');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post</h1>
      {error && <div className="mb-6 p-4 bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-100 rounded-lg">{error}</div>}
      <BlogPostForm
        onSubmit={handleSubmit}
        initialValues={{
          title: post.title,
          slug: post.slug,
          excerpt: post.excerpt,
          content: post.content,
          tags: post.tags.join(', '),
        }}
        isEdit
      />
    </div>
  );
} 