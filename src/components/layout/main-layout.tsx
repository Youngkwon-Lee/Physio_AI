'use client';

import Header from './header';
import NavSidebar from './nav-sidebar';
import { useAuth } from '@/contexts/auth-context';

interface MainLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  title?: string;
}

const MainLayout = ({
  children,
  showBackButton = true,
  title
}: MainLayoutProps) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header showBackButton={showBackButton} title={title} />
      {user && <NavSidebar />}
      <main className={`pt-24 ${user ? 'pl-24' : 'pl-6'} pr-6 pb-8`}>
        <div className="max-w-[1920px] mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
