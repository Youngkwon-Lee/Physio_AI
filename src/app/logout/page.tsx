'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // 로그아웃 성공 시 로그인 페이지로 리다이렉트
          router.push('/login');
        } else {
          console.error('Logout failed');
          router.push('/');
        }
      } catch (error) {
        console.error('Logout error:', error);
        router.push('/');
      }
    };

    logout();
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="text-xl text-gray-600">로그아웃 중...</div>
    </div>
  );
} 