import { notFound } from 'next/navigation';
import BlogPostPageContent from '@/components/BlogPostPageContent';
import { databaseService } from '@/lib/database';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  
  try {
    const post = await databaseService.getPostBySlug(slug);

    if (!post) {
      notFound();
    }

    return <BlogPostPageContent post={post} />;
  } catch (error) {
    console.error('Error fetching post:', error);
    notFound();
  }
} 