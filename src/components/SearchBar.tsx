'use client';
import { useState, useEffect, useCallback } from 'react';
import { BlogPost } from '@/types/blog';

interface SearchBarProps {
  onSearch: (filteredPosts: BlogPost[]) => void;
  posts: BlogPost[];
}

export default function SearchBar({ onSearch, posts }: SearchBarProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filterPosts = useCallback((term: string) => {
    const filtered = posts.filter((post) => {
      const titleMatch = post.title.toLowerCase().includes(term.toLowerCase());
      const tagMatch = post.tags.some(tag => 
        tag.toLowerCase().includes(term.toLowerCase())
      );
      return titleMatch || tagMatch;
    });
    onSearch(filtered);
  }, [posts, onSearch]);

  // Debounce search to avoid too many updates
  useEffect(() => {
    const timer = setTimeout(() => {
      filterPosts(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm, filterPosts]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by title or tags..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
        <div className="absolute right-3 top-2.5 text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
} 