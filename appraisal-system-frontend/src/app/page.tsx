'use client';
import { useAuth } from '@/providers/AuthContext';
import LoginPage from './(auth)/login/page';
import SignupPage from './(auth)/signup/page';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function App() {
  const { isLoggedIn, view } = useAuth();
  const router = useRouter();

  // Redirect to dashboard if logged in
  useEffect(() => {
    if (isLoggedIn) {
      router.push('/dashboard');
    }
  }, [isLoggedIn, router]);

  // Show loading while redirecting
  if (isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black dark:border-white mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-black dark:text-white">Redirecting to Dashboard...</h1>
        </div>
      </div>
    );
  }

  // Show login or signup based on view
  if (view === 'signup') {
    return <SignupPage />;
  }
  
  return <LoginPage />;
}