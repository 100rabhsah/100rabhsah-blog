'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAdmin } from '@/context/AdminContext';
import Link from 'next/link';

export default function AdminPage() {
  const { isAdmin } = useAdmin();
  const router = useRouter();

  useEffect(() => {
    if (!isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, router]);

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 mt-16">
      <h1 className="text-2xl font-bold mb-8">Admin Dashboard</h1>
      <div className="grid gap-6">
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="flex gap-4">
            <Link
              href="/create"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Create New Post
            </Link>
          </div>
        </div>
        <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Admin Information</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Welcome to your admin dashboard. Here you can manage your blog posts and access administrative features.
          </p>
        </div>
      </div>
    </div>
  );
} 