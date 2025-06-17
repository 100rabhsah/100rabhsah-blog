'use client';
import Link from 'next/link';
import { useState } from 'react';
import { BlogPost } from '@/types/blog';
import SearchBar from './SearchBar';

export default function BlogListingContent({ initialPosts }: { initialPosts: BlogPost[] }) {
  const [displayedPosts, setDisplayedPosts] = useState(initialPosts);

  const handleSearch = (filteredPosts: BlogPost[]) => {
    setDisplayedPosts(filteredPosts);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
      <SearchBar posts={initialPosts} onSearch={handleSearch} />
      {displayedPosts.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 py-8">
          No posts found matching your search criteria.
        </div>
      ) : (
        <div className="grid gap-8">
          {displayedPosts.map((post) => (
            <article key={post.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-2">
                <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition">
                  {post.title}
                </Link>
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {post.excerpt}
              </p>
              <div className="flex gap-2 mb-4">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:text-blue-700 transition"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      )}
    </div>
  );
} 