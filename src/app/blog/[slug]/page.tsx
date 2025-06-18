import { notFound } from 'next/navigation';
import BlogPostPageContent from '@/components/BlogPostPageContent';
import { getPosts } from '@/lib/posts';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const posts = await getPosts();
  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostPageContent post={post} />;
} 