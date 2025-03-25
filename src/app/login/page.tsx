'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/auth-context';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setUser } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setUser(data.user);
        // 이전 페이지가 있으면 그 페이지로, 없으면 분석 페이지로 이동
        const from = searchParams.get('from');
        router.push(from || '/analysis');
      } else {
        setError(data.error || '로그인에 실패했습니다.');
      }
    } catch (error) {
      setError('로그인 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center">
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
        </div>

        <div className="bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">로그인</h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-600 rounded-lg text-sm">
              {error}
            </div>
          )}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-50"
                placeholder="이메일을 입력하세요"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                비밀번호
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-50"
                placeholder="비밀번호를 입력하세요"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-[rgb(223,255,50)] rounded border-gray-300" />
                <span className="ml-2 text-sm text-gray-600">로그인 상태 유지</span>
              </label>
              <Link href="/forgot-password" className="text-sm text-[rgb(223,255,50)] hover:text-[rgb(203,235,30)]">
                비밀번호 찾기
              </Link>
            </div>
            <Button
              type="submit"
              className="w-full bg-[rgb(223,255,50)] text-gray-900 hover:bg-[rgb(203,235,30)]"
            >
              로그인
            </Button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-gray-600">계정이 없으신가요?</span>{' '}
            <Link href="/signup" className="text-[rgb(223,255,50)] hover:text-[rgb(203,235,30)] font-medium">
              회원가입
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 