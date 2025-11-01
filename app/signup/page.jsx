"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';
import InputField from '../../components/global/input-field';
import Button from '../../components/global/button';

export default function SignUpPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.email || !form.password || !form.role) {
      toast.error('All fields are required.');
      return;
    }

    setIsLoading(true);
    toast.loading('Creating your account...', { id: 'signup' });

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success('Registration successful! Logging you in...', { id: 'signup' });
        
        // Auto sign-in after successful registration
        setTimeout(async () => {
          try {
            const signInResult = await signIn('credentials', {
              email: form.email,
              password: form.password,
              redirect: false,
            });

            if (signInResult?.ok) {
              toast.success('Welcome! Redirecting to your dashboard...', { id: 'signup' });
              router.push(data.redirectPath);
            } else {
              toast.error('Registration succeeded, but automatic login failed. Please sign in manually.');
              setTimeout(() => router.push('/signin'), 2000);
            }
          } catch {
            toast.error('Registration succeeded, but automatic login failed. Please sign in manually.');
            setTimeout(() => router.push('/signin'), 2000);
          }
        }, 1500);
      } else {
        toast.error(data.error, { id: 'signup' });
      }
    } catch {
      toast.error('Registration failed. Please try again.', { id: 'signup' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 bg-white">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl text-black font-bold mb-6 text-center">Sign Up</h2>
        
        <InputField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
        
        <InputField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />
        
        <InputField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />
        
        <div className="mb-4">
          <label className="block text-sm text-black font-medium mb-1">Role</label>
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full px-3 py-2 text-black border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Registering...' : 'Sign Up'}
        </Button>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          Already have an account?{' '}
          <a href="/signin" className="font-medium text-blue-800 hover:text-blue-900 underline">
            Sign in here
          </a>
        </p>
      </div>
    </div>
  );
}