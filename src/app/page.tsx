export const dynamic = 'force-dynamic';

import { databaseService } from '@/lib/database';
import HomeContent from '@/components/HomeContent';

export default async function Home() {
  console.log('🏠 Home page rendering at:', new Date().toISOString());
  
  try {
    const posts = await databaseService.getAllPosts();
    console.log('📝 Home fetched posts:', posts.map(p => ({ id: p.id, title: p.title, slug: p.slug })));
    
    return <HomeContent initialPosts={posts} />;
  } catch (error) {
    console.error('❌ Error fetching posts:', error);
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Welcome to My Blog</h1>
        <div className="text-center text-red-500 py-8">
          Error loading blog posts. Please try again later.
        </div>
      </div>
    );
  }
}
