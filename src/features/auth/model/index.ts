// 'use server';

// import { cookies } from 'next/headers';

// export type SocialProvider = 'kakao' | 'google' | 'apple';

// export async function getAccessToken(provider: SocialProvider, code: string) {
//   try {
//     const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/${provider}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       credentials: 'include',
//       body: JSON.stringify({ code }),
//     });

//     if (!response.ok) {
//       console.log(`${provider} accessToken 응답 오류`);
//     }

//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// }

// export async function handleSocialAuth(provider: SocialProvider, code: string) {
//   try {
//     const tokenData = await getAccessToken(provider, code);

//     cookies().set('accessToken', tokenData.accessToken);
//     return { success: true };
//   } catch (error) {
//     console.error(`${provider} 인증 처리 실패:`, error);
//     return { success: false, error };
//   }
// }
