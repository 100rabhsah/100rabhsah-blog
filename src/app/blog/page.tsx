import { databaseService } from '@/lib/database';
import BlogListingContent from '@/components/BlogListingContent';
 
export default async function BlogPage() {
  try {
    const posts = await databaseService.getAllPosts();
    return <BlogListingContent initialPosts={posts} />;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog Posts</h1>
        <div className="text-center text-red-500 py-8">
          Error loading blog posts. Please try again later.
        </div>
      </div>
    );
  }
} 