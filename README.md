# 100rabhsah Blog

A modern personal blog built with Next.js, TypeScript, and Tailwind CSS, featuring Supabase for data storage and Cloudinary for image uploads.

## Features

- 📝 **Blog Management**: Create, edit, and delete blog posts
- 🖼️ **Image Upload**: Drag-and-drop image uploads with Cloudinary
- 🔍 **Search**: Search posts by title and tags
- 👨‍💼 **Admin Panel**: Secure admin interface for content management
- 📱 **Responsive Design**: Mobile-friendly interface
- 🌙 **Dark Mode**: Built-in dark mode support
- ⚡ **Fast Performance**: Optimized with Next.js 15

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Image Storage**: Cloudinary
- **Authentication**: Client-side admin authentication
- **Markdown**: React Markdown with HTML support

## Quick Start

### Prerequisites

- Node.js 18+ 
- Supabase account
- Cloudinary account

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd 100rabhsah-blog
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
   - Copy `.env.example` to `.env.local`
   - Fill in your Supabase and Cloudinary credentials

4. Set up the database:
   - Follow the [Setup Guide](./SETUP_GUIDE.md) to configure Supabase and Cloudinary

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

Create a `.env.local` file with the following variables:

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

## Admin Usage

1. Navigate to `/login` and enter your admin password
2. Access the admin panel at `/admin`
3. Create, edit, or delete blog posts
4. Upload images using the drag-and-drop interface

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── api/            # API routes
│   ├── admin/          # Admin pages
│   ├── blog/           # Blog pages
│   └── ...
├── components/         # React components
├── lib/               # Utility libraries
│   ├── supabase.ts    # Supabase client
│   ├── cloudinary.ts  # Cloudinary config
│   └── database.ts    # Database service
├── types/             # TypeScript types
└── context/           # React context
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The app can be deployed to any platform that supports Next.js. Make sure to:
- Set all environment variables
- Configure build settings for Next.js
- Set up proper CORS if needed

## Security Notes

- Admin password is stored in localStorage (consider implementing proper auth for production)
- Supabase RLS policies are configured for basic security
- API keys should be kept secure and not committed to version control

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For setup help, see the [Setup Guide](./SETUP_GUIDE.md) or create an issue in the repository.
