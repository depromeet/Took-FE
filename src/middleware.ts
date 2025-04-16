// middleware.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isFile = request.nextUrl.pathname.match(/\.(.*)$/);

  // 인증이 필요하지 않은 로그인/인증 관련 경로들
  const authPublicPaths = [
    '/login', // 로그인 페이지
    '/api/auth', // 인증 관련 API 경로
    '/api/auth/callback', // 소셜 로그인 콜백 경로
    '/onboarding', // 온보딩 페이지
  ];

  // 인증 여부와 상관없이 접근 가능한 공개 경로들
  const openAccessPaths = [
    '/card-share', // 카드 공유 페이지
    '/card-detail', // 카드 상세 페이지
    '/setting/privacy-terms',
    '/setting/terms',
    '/setting/user-quit',
  ];

  // 현재 경로가 인증 관련 공개 경로인지 확인
  const isAuthPublicPath = authPublicPaths.some(
    (publicPath) => path === publicPath || path.startsWith(`${publicPath}/`),
  );

  // 현재 경로가 인증 여부 상관없이 접근 가능한 공개 경로인지 확인
  const isOpenAccessPath = openAccessPaths.some((openPath) => path === openPath || path.startsWith(`${openPath}/`));

  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  // 인증 여부 확인
  const isAuthenticated = accessToken && refreshToken;

  // 문자가 있는지 검사합니다 (예: .css, .js, .png 등).
  // 로그인 페이지 CSS 깨짐 현상 해결
  if (isFile) {
    return NextResponse.next();
  }

  // 토큰이 존재할 때 로그인 페이지에 접근한다면 /경로로 리다이렉트
  if (isAuthPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 인증 여부와 상관없이 접근 가능한 경로
  if (isOpenAccessPath) {
    return NextResponse.next();
  }

  // 인증이 필요한 경로에 토큰 없이 접근하려고 하면 온보딩 페이지로 리다이렉트
  if (!isAuthPublicPath && !isAuthenticated) {
    return NextResponse.redirect(new URL('/onboarding', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 다음으로 시작하는 경로를 제외한 모든 요청 경로를 매칭합니다:
     * - api (API 라우트)
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘 파일)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
