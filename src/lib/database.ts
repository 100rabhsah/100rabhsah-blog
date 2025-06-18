import { supabase } from './supabase';
import { BlogPost } from '@/types/blog';

export const databaseService = {
  // Get all blog posts
  async getAllPosts(): Promise<BlogPost[]> {
    console.log('🔍 Fetching all posts from Supabase...');
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error fetching posts:', error);
      throw error;
    }

    console.log(`✅ Found ${data?.length || 0} posts:`, data?.map(p => ({ id: p.id, title: p.title, slug: p.slug })));
    return data || [];
  },

  // Get a single blog post by slug
  async getPostBySlug(slug: string): Promise<BlogPost | null> {
    console.log(`🔍 Fetching post by slug: ${slug}`);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`❌ Error fetching post with slug "${slug}":`, error);
      return null;
    }

    console.log(`✅ Found post:`, { id: data.id, title: data.title, slug: data.slug });
    return data;
  },

  // Create a new blog post
  async createPost(post: Omit<BlogPost, 'id'>): Promise<BlogPost> {
    console.log('📝 Creating new post:', { title: post.title, slug: post.slug });
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();

    if (error) {
      console.error('❌ Error creating post:', error);
      throw error;
    }

    console.log('✅ Post created successfully:', { id: data.id, title: data.title });
    return data;
  },

  // Update a blog post
  async updatePost(id: string, updates: Partial<BlogPost>): Promise<BlogPost> {
    console.log(`🔄 Updating post with ID: ${id}`);
    const { data, error } = await supabase
      .from('blog_posts')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('❌ Error updating post:', error);
      throw error;
    }

    console.log('✅ Post updated successfully:', { id: data.id, title: data.title });
    return data;
  },

  // Delete a blog post
  async deletePost(id: string): Promise<void> {
    console.log(`🗑️ Deleting post with ID: ${id}`);
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('❌ Error deleting post:', error);
      throw error;
    }

    console.log('✅ Post deleted successfully');
  },

  // Search posts by title or tags
  async searchPosts(query: string): Promise<BlogPost[]> {
    console.log(`🔍 Searching posts for query: ${query}`);
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .or(`title.ilike.%${query}%,tags.cs.{${query}}`)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('❌ Error searching posts:', error);
      throw error;
    }

    console.log(`✅ Found ${data?.length || 0} posts matching "${query}"`);
    return data || [];
  }
}; 