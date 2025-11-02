"use client"
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MainLayout from '../layout/main-layout';
import Card from '../global/card';

const AdminDashboardSimple = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (!session || session.user?.role !== 'admin') {
      router.replace('/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session || session.user?.role !== 'admin') return null;

  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6 text-black text-center md:text-left">Admin Dashboard</h1>
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <h2 className="text-xl text-black font-semibold mb-2">Welcome!</h2>
          <p className='text-black'>This is your admin dashboard. Manage users, settings, and system configurations from here.</p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboardSimple;
