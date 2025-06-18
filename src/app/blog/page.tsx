import { blogPosts } from '@/data/blog-posts';
import BlogListingContent from '@/components/BlogListingContent';
 
export default function BlogPage() {
  return <BlogListingContent initialPosts={blogPosts} />;
} 