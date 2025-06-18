import BlogListingContent from '@/components/BlogListingContent';
import { getPosts } from '@/lib/posts';

export default async function BlogPage() {
  const posts = await getPosts();
  return <BlogListingContent initialPosts={posts} />;
} 