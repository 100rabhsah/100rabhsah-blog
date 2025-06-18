# Supabase & Cloudinary Setup Guide

This guide will help you set up Supabase for data storage and Cloudinary for image uploads.

## 1. Supabase Setup

### Step 1: Create a Supabase Project
1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization and enter project details
4. Wait for the project to be created

### Step 2: Get Your Project Credentials
1. Go to Settings > API in your Supabase dashboard
2. Copy the following values:
   - Project URL
   - Anon public key
   - Service role key (keep this secret!)

### Step 3: Set Up the Database
1. Go to the SQL Editor in your Supabase dashboard
2. Copy and paste the contents of `supabase-migration.sql`
3. Run the migration to create the `blog_posts` table

## 2. Cloudinary Setup

### Step 1: Create a Cloudinary Account
1. Go to [cloudinary.com](https://cloudinary.com) and sign up
2. Verify your email and complete the setup

### Step 2: Get Your Cloudinary Credentials
1. Go to your Cloudinary Dashboard
2. Copy the following values:
   - Cloud name
   - API Key
   - API Secret

## 3. Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# Admin Configuration
ADMIN_PASSWORD=your_admin_password
```

## 4. Data Migration

If you have existing blog posts in your local `blog-posts.ts` file, you can migrate them to Supabase:

1. Run the development server: `npm run dev`
2. Go to `/admin` and log in
3. Create new posts using the existing content, or
4. Use the Supabase dashboard to manually insert the data

## 5. Testing the Setup

1. Start your development server: `npm run dev`
2. Test creating a new blog post with image upload
3. Verify that images are uploaded to Cloudinary
4. Check that posts are saved to Supabase

## 6. Deployment

### Vercel Deployment
1. Add your environment variables to your Vercel project settings
2. Deploy your application
3. The app will now use Supabase and Cloudinary in production

### Environment Variables for Production
Make sure to add all the environment variables to your production environment (Vercel, Netlify, etc.)

## 7. Security Notes

- Keep your service role key and API secrets secure
- Consider implementing proper authentication for admin operations
- Review and adjust RLS policies in Supabase as needed
- Set up proper CORS settings if needed

## 8. Troubleshooting

### Common Issues:
1. **Environment variables not loading**: Make sure they're properly set in your deployment platform
2. **CORS errors**: Check your Supabase and Cloudinary CORS settings
3. **Upload failures**: Verify your Cloudinary credentials and folder permissions
4. **Database connection issues**: Check your Supabase URL and API keys

### Debug Steps:
1. Check browser console for errors
2. Verify environment variables are loaded
3. Test API endpoints directly
4. Check Supabase and Cloudinary dashboards for errors 