import HomeContent from '@/components/HomeContent';
import { getPosts } from '@/lib/posts';

export default async function Home() {
  const posts = await getPosts();
  return <HomeContent initialPosts={posts} />;
}
