'use client';

import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

export default function Navbar() {
  const { data: session } = useSession();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const username = session?.user?.username ?? session?.user?.name ?? session?.user?.email;

  const handleLogout = async () => {
    setIsLoggingOut(true);
    toast.loading('Logging you out...', { id: 'logout' });
    
    try {
      await signOut({ callbackUrl: '/signin' });
      toast.success('Logout successful!', { id: 'logout' });
    } catch {
      toast.error('Logout failed. Please try again.', { id: 'logout' });
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="bg-blue-800 shadow-lg border-b-2 border-blue-900">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link 
            href="/" 
            className="font-bold text-xl text-white hover:text-blue-100 transition-colors duration-200"
          >
            SecureAuth
          </Link>
          
          <div className="flex items-center">
            {session?.user ? (
              <div className="flex items-center gap-4">
                <div className="text-white">
                  <span className="text-sm opacity-90">Welcome,</span>
                  <span className="ml-1 font-medium">{username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-blue-800 transition-all duration-200 font-medium text-sm btn-transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoggingOut ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Signing Out...
                    </div>
                  ) : (
                    'Sign Out'
                  )}
                </button>
              </div>
            ) : (
              <Link 
                href="/signin" 
                className="px-4 py-2 bg-white text-blue-800 rounded-lg hover:bg-blue-50 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-800 transition-all duration-200 font-medium text-sm btn-transition"
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
