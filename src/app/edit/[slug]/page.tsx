import EditPostPageContent from '@/components/EditPostPageContent';
import { use } from 'react';

interface EditPostPageProps {
  params: Promise<{ slug: string }>;
}

export default function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = use(params);
  return <EditPostPageContent slug={slug} />;
} 