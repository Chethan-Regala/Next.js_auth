"use client"
import React, { useState, useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import InputField from '../global/input-field';
import Button from '../global/button';

const SignInPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (status === 'loading') return;
    if (session?.user) {
      const role = session.user.role;
      const redirectPath = role === 'admin' ? '/admin_dashboard' : 
                          role === 'consumer' ? '/consumer' : '/student_dashboard';
      router.replace(redirectPath);
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (session?.user) {
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
      toast.error('Email and password are required.');
      return;
    }

    setIsLoading(true);
    toast.loading('Signing you in...', { id: 'signin' });

    try {
      const result = await signIn('credentials', {
        email: form.email,
        password: form.password,
        redirect: false,
      });

      if (result?.error) {
        toast.error('Invalid email or password', { id: 'signin' });
        return;
      }

      if (result?.ok) {
        toast.success('Login successful! Redirecting...', { id: 'signin' });
        setTimeout(() => {
          window.location.href = '/';
        }, 1000);
      }
    } catch {
      toast.error('An unexpected error occurred.', { id: 'signin' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="w-full max-w-md px-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-800 mb-2">
            Welcome Back
          </h1>
          <p className="text-gray-600">
            Sign in to access your secure dashboard
          </p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl p-8 card-shadow-lg border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            <InputField
              label="Email Address"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email address"
            />
            
            <InputField
              label="Password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600 font-medium">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-blue-800 hover:bg-blue-900 disabled:bg-blue-400 text-white font-semibold rounded-lg transition-all duration-200 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 btn-transition"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Signing In...
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="font-medium text-blue-800 hover:text-blue-900 underline">
              Sign up here
            </a>
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Secure authentication powered by NextAuth
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;