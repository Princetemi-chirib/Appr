'use client';
import { useAuth } from '@/providers/AuthContext';
import { mockTeams } from '@/lib/mock-data';

export default function SignupPage() {
  const { onSignup, onSwitchToLogin } = useAuth();

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-50 dark:bg-gray-900 rounded-xl shadow-lg border border-black dark:border-white">
        <h2 className="text-3xl font-bold text-center text-black dark:text-white">Create an Account</h2>
        <p className="text-center text-gray-700 dark:text-gray-300">Join your team and get started</p>
        <form onSubmit={(e) => { e.preventDefault(); onSignup(); }} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Full Name</label>
            <input
              type="text"
              required
              className="w-full mt-1 px-4 py-2 border border-black dark:border-white rounded-md shadow-sm focus:ring-black focus:border-black dark:focus:ring-white dark:focus:border-white bg-white dark:bg-black text-black dark:text-white"
              placeholder="John Doe"
            />
          </div>
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
          <div>
            <label className="block text-sm font-medium text-black dark:text-white">Select Team</label>
            <select
              required
              className="w-full mt-1 px-4 py-2 border border-black dark:border-white rounded-md shadow-sm focus:ring-black focus:border-black dark:focus:ring-white dark:focus:border-white bg-white dark:bg-black text-black dark:text-white"
            >
              <option value="">-- Choose your team --</option>
              {mockTeams.map((team, index) => (
                <option key={index} value={team}>{team}</option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full py-3 px-4 bg-black text-white dark:bg-white dark:text-black font-semibold rounded-md shadow-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors border border-black dark:border-white"
          >
            Sign up
          </button>
        </form>
        <p className="text-center text-sm text-gray-700 dark:text-gray-300">
          Already have an account?{' '}
          <button onClick={onSwitchToLogin} className="font-medium text-black dark:text-white hover:underline">
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}

