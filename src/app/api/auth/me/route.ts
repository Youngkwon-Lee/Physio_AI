import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Get auth token from cookie
    const token = request.cookies.get('auth-token');

    if (!token) {
      return NextResponse.json(
        { error: '인증되지 않은 사용자입니다.' },
        { status: 401 }
      );
    }

    // TODO: 실제로는 토큰을 검증하고 사용자 정보를 데이터베이스에서 가져와야 함
    // 여기서는 임시로 더미 데이터 반환
    const user = {
      id: '1',
      email: 'test@example.com',
      name: '테스트 사용자',
    };

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { error: '사용자 정보를 가져오는 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 