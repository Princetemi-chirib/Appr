'use client';
import { useAuth } from '@/providers/AuthContext';
import { Building } from 'lucide-react';

export default function LoginPage() {
  const { onLogin, onSwitchToSignup } = useAuth();
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black p-4">
      <div className="w-full max-w-md p-6 md:p-8 space-y-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg border border-black dark:border-white">
        <div className="flex flex-col items-center">
          <div className="flex items-center space-x-2 mb-4">
            <Building className="h-10 w-10 text-black dark:text-white" />
            <h1 className="text-4xl font-extrabold text-black dark:text-white">Appraisal</h1>
          </div>
          <h2 className="text-2xl font-bold text-center text-black dark:text-white">Welcome Back</h2>
          <p className="text-center text-gray-700 dark:text-gray-300 mt-2">Sign in to your account</p>
        </div>
        <form onSubmit={(e) => { e.preventDefault(); onLogin('Worker'); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Email address</label>
            <input
              type="email"
              required
              className="w-full mt-1 px-4 py-2 border border-black dark:border-white rounded-md shadow-sm focus:ring-black focus:border-black dark:focus:ring-white dark:focus:border-white bg-white dark:bg-black text-black dark:text-white"
              placeholder="you@company.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Password</label>
            <input
              type="password"
              required
              className="w-full mt-1 px-4 py-2 border border-black dark:border-white rounded-md shadow-sm focus:ring-black focus:border-black dark:focus:ring-white dark:focus:border-white bg-white dark:bg-black text-black dark:text-white"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-md shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
          >
            Sign in
          </button>
        </form>
        <p className="text-center text-sm text-gray-700 dark:text-gray-300">
          Don&apos;t have an account?{' '}
          <button onClick={onSwitchToSignup} className="font-medium text-black dark:text-white hover:underline">
            Sign up
          </button>
        </p>
      </div>
    </div>
  );
}
