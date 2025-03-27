'use client';

import { useRef, useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import WrappedAvatar from '@/shared/ui/Avatar';
import ImageAdd from '@/shared/ui/Avatar/imageAdd';

import { CareerFormData } from '../schema';

// 기본 아바타 이미지 경로 (상대 경로)
const AVATAR_IMAGE_PATH = '/icons/avatarIcon.svg';

function AvatarImg() {
  const { control, setValue } = useFormContext<CareerFormData>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 미리보기용 state (string | null)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  // 컴포넌트 마운트 시 기본 이미지 URL을 폼에 설정
  useEffect(() => {
    // 이미지가 선택되지 않았다면 기본 이미지 URL을 설정
    if (!avatarSrc) {
      // 클라이언트 측에서만 실행되도록 (SSR에서는 window가 없음)
      if (typeof window !== 'undefined') {
        // 기본 이미지를 File 객체로 변환
        fetch(`${window.location.origin}${AVATAR_IMAGE_PATH}`)
          .then((response) => response.blob())
          .then((blob) => {
            const defaultFile = new File([blob], 'default-avatar.png', { type: 'image/png' });
            setValue('profileImage', defaultFile);
          })
          .catch((error) => {
            console.error('기본 이미지 로드 실패:', error);
          });
      }
    }
  }, [setValue, avatarSrc]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Controller
      control={control}
      name="profileImage"
      render={({ field: { onChange } }) => (
        <div className="relative inline-block cursor-pointer" onClick={handleClick}>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // 폼에는 File 객체를 onChange로 저장
                onChange(file);

                // 미리보기용 Data URL 생성
                const reader = new FileReader();
                reader.onloadend = () => {
                  const result = reader.result as string;
                  setAvatarSrc(result);
                };
                reader.readAsDataURL(file);
              }
            }}
          />
          {/* 이미지가 있는 경우에만 src 속성을 전달하고, 없는 경우 기본 이미지를 사용합니다 */}
          <WrappedAvatar src={avatarSrc ?? undefined} alt="프로필 이미지" size="large" />
          <div className="absolute bottom-0 right-0">
            <ImageAdd />
          </div>
        </div>
      )}
    />
  );
}

export default AvatarImg;
