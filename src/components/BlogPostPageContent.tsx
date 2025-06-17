'use client';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import { useAdmin } from '@/context/AdminContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { BlogPost } from '@/types/blog';

export default function BlogPostPageContent({ post }: { post: BlogPost }) {
  const { isAdmin } = useAdmin();
  const router = useRouter();
  const [error, setError] = useState('');

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    const res = await fetch(`/api/posts/${post.slug}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/');
    } else {
      setError('Failed to delete post');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-8"
      >
        ← Back to Blog
      </Link>
      {isAdmin && (
        <div className="flex gap-2 mb-4">
          <Link
            href={`/edit/${post.slug}`}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
          >
            Delete
          </button>
        </div>
      )}
      {error && <div className="text-red-600 mb-4">{error}</div>}
      <article className="prose dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <div className="text-gray-500 dark:text-gray-400 mb-8">
          {new Date(post.date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </div>
        <div className="flex gap-2 mb-8">
          {post.tags.map((tag: string, idx: number) => (
            <span
              key={tag + '-' + idx}
              className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{post.content}</ReactMarkdown>
      </article>
    </div>
  );
} 