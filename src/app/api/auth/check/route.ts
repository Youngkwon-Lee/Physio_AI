import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get auth token from cookie
    const token = request.cookies.get('auth-token');

    if (!token) {
      return NextResponse.json(
        { isAuthenticated: false },
        { status: 200 }
      );
    }

    // TODO: 실제로는 토큰을 검증해야 함
    return NextResponse.json(
      { isAuthenticated: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: '인증 상태 확인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 