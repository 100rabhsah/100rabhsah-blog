import { blogPosts } from '@/data/blog-posts';
import HomeContent from '@/components/HomeContent';

export default function Home() {
  return <HomeContent initialPosts={blogPosts} />;
}
