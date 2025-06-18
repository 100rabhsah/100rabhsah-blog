import { blogPosts } from '@/data/blog-posts';
import { notFound } from 'next/navigation';
import BlogPostPageContent from '@/components/BlogPostPageContent';
import { use } from 'react';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = use(params);
  const post = blogPosts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPageContent post={post} />;
} 