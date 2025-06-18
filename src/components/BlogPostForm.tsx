'use client';

import { useState, useEffect, useRef } from 'react';
import { BlogPost } from '@/types/blog';
import ImageUpload from './ImageUpload';

interface BlogPostFormProps {
  onSubmit: (post: Omit<BlogPost, 'id'>) => void;
  initialValues?: {
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    tags: string;
  };
  isEdit?: boolean;
}

export default function BlogPostForm({ onSubmit, initialValues, isEdit }: BlogPostFormProps) {
  const [title, setTitle] = useState(initialValues?.title || '');
  const [slug, setSlug] = useState(initialValues?.slug || '');
  const [excerpt, setExcerpt] = useState(initialValues?.excerpt || '');
  const [content, setContent] = useState(initialValues?.content || '');
  const [tags, setTags] = useState(initialValues?.tags || '');
  const contentTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (initialValues) {
      setTitle(initialValues.title);
      setSlug(initialValues.slug);
      setExcerpt(initialValues.excerpt);
      setContent(initialValues.content);
      setTags(initialValues.tags);
    }
  }, [initialValues]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate slug if not provided
    let generatedSlug = slug;
    if (!generatedSlug) {
      generatedSlug = title.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');
    }
    
    const newPost = {
      title,
      slug: generatedSlug,
      date: new Date().toISOString().split('T')[0],
      excerpt,
      content,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
    };
    onSubmit(newPost);
    if (!isEdit) {
      setTitle('');
      setSlug('');
      setExcerpt('');
      setContent('');
      setTags('');
    }
  };

  const handleImageUpload = (imageUrl: string) => {
    const textarea = contentTextareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const currentContent = textarea.value;
    
    // Insert markdown image syntax at cursor position
    const imageMarkdown = `![Image](${imageUrl})`;
    const newContent = currentContent.substring(0, start) + imageMarkdown + currentContent.substring(end);
    
    setContent(newContent);
    
    // Reset cursor position after the inserted image markdown
    setTimeout(() => {
      textarea.focus();
      const newPosition = start + imageMarkdown.length;
      textarea.setSelectionRange(newPosition, newPosition);
    }, 0);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-2">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800"
        />
      </div>
      <div>
        <label htmlFor="slug" className="block text-sm font-medium mb-2">
          Slug (optional - will be generated from title if empty)
        </label>
        <input
          type="text"
          id="slug"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800"
        />
      </div>
      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
          Excerpt
        </label>
        <textarea
          id="excerpt"
          value={excerpt}
          onChange={(e) => setExcerpt(e.target.value)}
          required
          rows={3}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800"
        />
      </div>
      <div>
        <label htmlFor="content" className="block text-sm font-medium mb-2">
          Content (Markdown supported)
        </label>
        <div className="space-y-4">
          <ImageUpload onImageUpload={handleImageUpload} />
          <textarea
            id="content"
            ref={contentTextareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 font-mono"
          />
        </div>
      </div>
      <div>
        <label htmlFor="tags" className="block text-sm font-medium mb-2">
          Tags (comma-separated)
        </label>
        <input
          type="text"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800"
        />
      </div>
      <button
        type="submit"
        className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        {isEdit ? 'Update Post' : 'Create Post'}
      </button>
    </form>
  );
} 