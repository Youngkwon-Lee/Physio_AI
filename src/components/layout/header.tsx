'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/auth-context';

// Custom logo component
const OchyLogo = () => (
  <Link href="/" className="flex items-center space-x-2">
    <div className="flex items-center">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="40" height="40" rx="12" fill="rgb(223, 255, 50)" />
        <path 
          d="M12 20C12 12 28 12 28 20C28 28 12 28 12 20Z" 
          stroke="gray" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
        <path 
          d="M20 12C20 12 24 16 24 20C24 24 20 28 20 28" 
          stroke="gray" 
          strokeWidth="2.5" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        />
      </svg>
      <span className="text-gray-900 text-2xl font-bold ml-3 tracking-tight">PHYSIO</span>
      <span className="text-[rgb(223,255,50)] text-sm font-semibold ml-2">AI</span>
    </div>
  </Link>
);

// Timer component
const Timer = () => {
  const [time, setTime] = useState('06:23:55:25');

  // For a real timer implementation, uncomment this
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // Update time logic here
  //   }, 1000);
  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="bg-white/10 rounded-xl px-4 py-2 border border-[rgb(223,255,50)]/10">
      <div className="text-[rgb(223,255,50)] text-xs font-medium mb-1">남은 시간</div>
      <div className="text-gray-900 text-xl font-mono tracking-wider">{time}</div>
    </div>
  );
};

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
}

const Header = ({ showBackButton = true, title }: HeaderProps) => {
  const { user } = useAuth();

  return (
    <header className="bg-white/80 backdrop-blur-sm w-full h-20 px-6 fixed top-0 left-0 right-0 z-10 flex justify-between items-center border-b border-gray-200">
      <div className="flex items-center space-x-4">
        <OchyLogo />
        {showBackButton && (
          <button className="bg-gray-100 hover:bg-gray-200 rounded-full p-2 ml-4 transition-colors">
            <ChevronLeft className="w-5 h-5 text-gray-700" />
          </button>
        )}
        {title && (
          <h1 className="text-xl font-medium ml-8 text-gray-900">{title}</h1>
        )}
      </div>

      <div className="flex items-center space-x-8">
        {user ? (
          <>
            <div className="text-center px-4 py-2 bg-white/80 rounded-xl border border-gray-200">
              <div className="text-gray-900 font-medium">7일 무료 체험</div>
              <div className="text-gray-500 text-sm">또는 10회 분석까지</div>
            </div>

            <Timer />

            <div className="flex items-center space-x-4">
              <Link href="/upload-video">
                <Button className="bg-[rgb(223,255,50)] hover:bg-[rgb(203,235,30)] text-gray-900 px-6 py-5 rounded-xl font-medium transition-colors">
                  새 동영상
                </Button>
              </Link>
              <Link href="/logout">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors">
                  로그아웃
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/login">
              <Button variant="ghost" className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors">
                로그인
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[rgb(223,255,50)] hover:bg-[rgb(203,235,30)] text-gray-900 px-6 py-2 rounded-xl font-medium transition-colors">
                회원가입
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
