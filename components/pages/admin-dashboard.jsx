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

  const username = session.user?.name ?? session.user?.username ?? session.user?.email;

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto">
        <Card>
          <h1 className="text-2xl font-semibold text-black text-center">Welcome, {username}.</h1>
          <p className="text-sm text-gray-700 text-center mt-2">This is your admin dashboard.</p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default AdminDashboardSimple;
