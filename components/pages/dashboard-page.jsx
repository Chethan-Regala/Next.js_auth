"use client"
import React, { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState('');

  // RBAC: redirect unauthenticated users to signin, and non-admins to home
  useEffect(() => {
    if (status === 'loading') return; // avoid flicker while session loads

    if (status === 'unauthenticated') {
      router.replace('/signin');
      return;
    }

    // If authenticated but not admin, redirect to home
    if (session && session.user && session.user.role !== 'admin') {
      router.replace('/');
    }
  }, [status, session, router]);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      setCurrentTime(`${timeString} • ${dateString}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-800 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const username = session?.user?.name ?? session?.user?.username ?? session?.user?.email;
  const userRole = session?.user?.role || 'user';

  // Log session data to browser console
  console.log('Admin session (browser):', session?.user);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 via-blue-900 to-slate-900">
      <div className="container mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            {getGreeting()}, {username}!
          </h1>
          <p className="text-blue-100 text-lg mb-2">
            Welcome to your admin dashboard
          </p>
          <p className="text-blue-200 text-sm">
            {currentTime}
          </p>
        </div>

        {/* Main Dashboard Card */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl p-8 card-shadow-lg">
            {/* User Info Section */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Admin Dashboard Overview
                  </h2>
                  <p className="text-gray-600">
                    Manage users, courses, and system settings
                  </p>
                </div>
                <div className="text-right">
                  <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    ADMIN
                  </div>
                </div>
              </div>
            </div>

            {/* User Details */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Account Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium text-gray-800">{username}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email:</span>
                    <span className="font-medium text-gray-800">{session?.user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Role:</span>
                    <span className="font-medium text-gray-800 capitalize">{userRole}</span>
                  </div>
                </div>
              </div>

              <div className="bg-red-50 rounded-lg p-4">
                <h3 className="font-semibold text-red-800 mb-2">Admin Controls</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-red-700">User Management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-red-700">Course Management</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                    <span className="text-red-700">System Settings</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center">
              <button
                onClick={() => signOut({ callbackUrl: '/signin' })}
                className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all duration-200 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 btn-transition"
              >
                Sign Out Securely
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}