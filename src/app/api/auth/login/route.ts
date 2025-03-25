import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // TODO: 실제 인증 로직 구현
    // 여기서는 간단한 예시로 이메일이 존재하는지만 확인
    if (!email || !password) {
      return NextResponse.json(
        { error: '이메일과 비밀번호를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 임시 사용자 데이터
    const user = {
      id: '1',
      email,
      name: '테스트 사용자',
    };

    const response = NextResponse.json(
      { user, message: '로그인 성공' },
      { status: 200 }
    );

    // Set auth cookie
    response.cookies.set('auth-token', 'dummy-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: '로그인 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 