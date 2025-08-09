import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/providers/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Appraisal System',
  description: 'Company-wide appraisal system built with Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

