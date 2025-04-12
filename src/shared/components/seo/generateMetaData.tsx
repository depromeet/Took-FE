import { Metadata } from 'next';
import { cookies } from 'next/headers';

const BASE_URL = 'https://www.even-took.com';

// 동적 메타데이터 생성 함수
export async function generateMetaDataSEO({ params }: { params?: { slug: string } } = {}): Promise<Metadata> {
  // 쿠키를 통해 인증 토큰(또는 사용자 정보를) 확인합니다.
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken');

  const { name } = JSON.parse(cookieStore.get('userData')?.value ?? '{}');

  let title = '';
  let description = '';
  let image = '';
  let url = '';

  if (accessToken) {
    title = name;
    description = `${name}님의 명함을 확인해보세요!`;
    image = '/images/og/OG-01.png';
    url = `${BASE_URL}/${params?.slug}`;
  } else {
    title = '디지털 명함 서비스 Took';
    description = '디지털 명함 서비스 Took 지금 바로 명함을 만들어보세요!';
    image = '/images/og/OG-02.png';
    url = `${BASE_URL}`;
  }

  return {
    title: 'Took',
    description,
    openGraph: {
      title: 'Took',
      description,
      url,
      images: [
        {
          url: image,
        },
      ],
    },
    other: {
      'og:site_name': 'Took',
      'og:type': 'website',
      'og:image:width': '1200',
      'og:image:height': '630',
      'og:image:alt': title,
      // 카카오톡 공유를 위한 추가 메타데이터
      'og:image:secure_url': image, // 이미지 주소
      'og:image:type': 'image/png', // 이미지 타입
    },
  };
}
