// middleware.ts
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isFile = request.nextUrl.pathname.match(/\.(.*)$/);

  // 인증이 필요하지 않은 경로들
  const publicPaths = [
    '/login', // 로그인 페이지
    '/api/auth', // 인증 관련 API 경로
    '/api/auth/callback', // 소셜 로그인 콜백 경로
    '/onboarding', // 온보딩 페이지
  ];

  const sharePaths = ['/card-share', '/card-detail'];

  const settingPublicPaths = ['/setting/privacy-terms', '/setting/terms', '/setting/user-quit'];

  // 현재 경로가 public 경로인지 확인
  const isPublicPath = publicPaths.some((publicPath) => path === publicPath || path.startsWith(`${publicPath}/`));
  // 설정 페이지 중 public 경로인지 확인 추가
  const isSettingPublicPath = settingPublicPaths.some(
    (settingPath) => path === settingPath || path.startsWith(`${settingPath}/`),
  );

  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  // 파일 요청은 통과
  if (isFile) {
    return NextResponse.next();
  }

  // 설정페이지 중 토큰 없이 접근 가능한 페이지 체크
  if (isSettingPublicPath) {
    return NextResponse.next();
  }

  if (sharePaths.some((sharePath) => path === sharePath || path.startsWith(`${sharePath}/`))) {
    // 미로그인 시 접속 가능한 URL
    // 미로그인 시 접속 가능한 URL + 토큰이 없다면 (토큰 만료일 경우)
    if (!accessToken || !refreshToken) {
      return NextResponse.redirect(new URL('/login', request.url));
    } else {
      return NextResponse.next();
    }
  }

  // 토큰이 존재할 때 로그인 페이지에 접근한다면 /경로로 리다이렉트
  if (isPublicPath && accessToken && refreshToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // 인증이 필요한 경로에 토큰 없이 접근하려고 하면 온보딩 페이지로 리다이렉트
  // 임시로 온보딩 페이지로 리다이렉션합니다. 추후 isLogined 와 같은 서버 스펙 나오면 분리예정
  // 추가 고려사항
  if (!isPublicPath && (!accessToken || !refreshToken)) {
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
