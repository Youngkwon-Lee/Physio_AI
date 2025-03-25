import type { Metadata } from 'next';
import '@/app/globals.css';
import ClientBody from './ClientBody';
import { AuthProvider } from '@/contexts/auth-context';

export const metadata: Metadata = {
  title: 'PHYSIO AI - 동작 분석 플랫폼',
  description: 'AI 기반 동작 분석 플랫폼으로 당신의 운동을 더 효과적이고 안전하게 만들어드립니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="min-h-screen bg-background text-foreground">
        <AuthProvider>
          <ClientBody>{children}</ClientBody>
        </AuthProvider>
      </body>
    </html>
  );
}
