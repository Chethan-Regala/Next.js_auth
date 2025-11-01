import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../api/auth/[...nextauth]/route';
import AdminDashboardSimple from '../../components/pages/admin-dashboard';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session || session.user?.role !== 'admin') {
    redirect('/signin');
  }
  
  // minimal server-side guard is already done above. Render a simple client
  // admin dashboard that matches the student dashboard's clean style.
  return <AdminDashboardSimple />;
}