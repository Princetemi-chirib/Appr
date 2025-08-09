'use client';
import { useAuth } from '@/providers/AuthContext';
import { Layout } from '@/components/Layout';
import WorkerDashboard from '@/components/dashboards/WorkerDashboard';
import ManagerDashboard from '@/components/dashboards/ManagerDashboard';
import MDDashboard from '@/components/dashboards/MDDashboard';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// Import the HRDashboard with the correct filename (it has a typo in the filename)
import HRDashboard from '@/components/dashboards/HRDahboard';

export default function DashboardPage() {
  const { isLoggedIn, userRole, onRoleChange } = useAuth();
  const router = useRouter();

  // Redirect to main page if not logged in
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/');
    }
  }, [isLoggedIn, router]);

  // Show loading while redirecting
  if (!isLoggedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Redirecting...</h1>
        </div>
      </div>
    );
  }

  let dashboardComponent;
  switch (userRole) {
    case 'Worker':
      dashboardComponent = <WorkerDashboard />;
      break;
    case 'Manager':
      dashboardComponent = <ManagerDashboard />;
      break;
    case 'HR':
      dashboardComponent = <HRDashboard />;
      break;
    case 'MD':
      dashboardComponent = <MDDashboard />;
      break;
    default:
      dashboardComponent = <p className="p-8">Dashboard not found for this role.</p>;
  }

  return (
    <Layout userRole={userRole} onRoleChange={onRoleChange}>
      {dashboardComponent}
    </Layout>
  );
}

