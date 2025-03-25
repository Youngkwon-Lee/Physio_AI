'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, Users, UserCircle, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

const navItems: NavItem[] = [
  {
    href: '/analysis',
    icon: Activity,
    label: '분석'
  },
  {
    href: '/patients',
    icon: Users,
    label: '환자'
  },
  {
    href: '/profile',
    icon: UserCircle,
    label: '내 정보'
  },
  {
    href: '/subscription',
    icon: Crown,
    label: '구독'
  }
];

export default function NavSidebar() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 bottom-0 w-24 bg-white border-r border-gray-100 flex flex-col items-center py-8">
      <div className="mb-12">
        <Link href="/">
          <div className="w-12 h-12 bg-[rgb(223,255,50)] rounded-xl flex items-center justify-center">
            <img src="/logo.png" alt="PHYSIO AI" className="w-8 h-8" />
          </div>
        </Link>
      </div>
      <div className="flex-1 flex flex-col items-center space-y-4">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'w-full flex flex-col items-center py-3 px-2 group relative',
                isActive && 'after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-1 after:h-8 after:bg-[rgb(223,255,50)] after:rounded-r-full'
              )}
            >
              <div
                className={cn(
                  'w-12 h-12 rounded-xl flex items-center justify-center transition-colors',
                  isActive
                    ? 'bg-[rgb(223,255,50)]/20 text-gray-900'
                    : 'text-gray-400 group-hover:text-gray-900 group-hover:bg-gray-50'
                )}
              >
                <item.icon className="w-6 h-6" />
              </div>
              <span
                className={cn(
                  'mt-1 text-xs',
                  isActive ? 'text-gray-900 font-medium' : 'text-gray-500 group-hover:text-gray-900'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
