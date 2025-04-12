// 소셜 버튼 타입
export type SocialProvider = 'KAKAO' | 'GOOGLE' | 'APPLE';

// POST - api/auth/login/{oauthType}

export type ApiResponse<T> = {
  status: string;
  message: string;
  timestamp: string;
  data: T;
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
  data: {
    token: TokenDto;
    user: UserDto;
  };
};

export type AuthDto = ApiResponse<AuthResponseDto>;

// GET - api/auth/{oauthType}
export type RedirectDto = {
  status: string;
  message: string;
  timestamp: string;
  data: {
    url: string;
  };
};
