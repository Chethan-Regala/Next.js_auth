"use client"
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import MainLayout from '../layout/main-layout';
import Card from '../global/card';

const StudentDashboardPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;
    if (!session || session.user?.role !== "student") {
      router.replace("/signin");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!session || session.user?.role !== "student") {
    return null;
  }



  return (
    <MainLayout>
      <h1 className="text-3xl font-bold mb-6 text-black text-center md:text-left">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl text-black font-semibold mb-2">Welcome!</h2>
          <p className='text-black'>This is your student dashboard. Here you can find your enrolled courses, grades, and profile information.</p>
        </Card>
        <Card>
          <h2 className="text-xl text-black font-semibold mb-2">Upcoming Assignments</h2>
          <p className='text-black'>Stay on top of your coursework!</p>
        </Card>
      </div>
    </MainLayout>
  );
};

export default StudentDashboardPage;