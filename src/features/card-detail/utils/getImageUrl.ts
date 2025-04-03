export const getImageUrl = (imagePath: string | null | undefined) => {
  if (!imagePath) {
    return '/icons/avatarIcon.svg';
  }

  // 이미 전체 URL인 경우 그대로 반환
  if (imagePath.startsWith('htts')) {
    return imagePath;
  }

  // local/profile/... 형식의 경로를 전체 URL로 변환
  return `${process.env.NEXT_PUBLIC_IMAGE_SERVER_URL}/${imagePath}`;
};
