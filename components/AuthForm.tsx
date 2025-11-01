'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

/**
 * AuthForm Component
 * 
 * A reusable authentication form component that handles:
 * 1. User login authentication
 * 2. Form validation and error handling
 * 3. Submission to NextAuth.js endpoints
 */
export function AuthForm({ mode = 'signin' }: { mode: 'signin' | 'login' }) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple client-side validation
    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (result?.error) {
        setError(result.error || 'Invalid credentials');
        return;
      }

      if (result?.ok) {
        // Redirect based on user role after successful signin
        router.push('/');
      }
    } catch {
      setError('An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 card-shadow-lg border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-800 mb-2">
            Email Address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:ring-0 transition-colors duration-200 text-gray-800 placeholder-gray-400"
            placeholder="Enter your email address"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-gray-800 mb-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-800 focus:ring-0 transition-colors duration-200 text-gray-800 placeholder-gray-400"
            placeholder="Enter your password"
          />
        </div>

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
            mode === 'signin' ? 'Sign In' : 'Sign In'
          )}
        </button>
      </form>
    </div>
  );
}