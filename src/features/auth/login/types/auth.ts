// 소셜 버튼 타입
export type SocialProvider = 'KAKAO' | 'GOOGLE' | 'APPLE';

// POST - api/auth/login/{oauthType}

export type ApiResponse = {
  status: string;
  message: string;
  timestamp: string;
};

export type UserDto = {
  id: number;
  name: string;
};

export type TokenDto = {
  accessToken: string;
  refreshToken: string;
};

export type AuthResponseDto = {
  token: TokenDto;
  user: UserDto;
};

export type AuthDto = ApiResponse & AuthResponseDto;

// GET - api/auth/{oauthType}
export type RedirectDto = {
  status: string;
  message: string;
  timestamp: string;
  data: {
    url: string;
  };
};
