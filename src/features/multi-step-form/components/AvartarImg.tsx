'use client';

import { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';

import WrappedAvatar from '@/shared/ui/Avatar';
import ImageAdd from '@/shared/ui/Avatar/imageAdd';

import { CareerFormData } from '../schema';

function AvatarImg() {
  const { control } = useFormContext<CareerFormData>();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 미리보기용 state (string | null)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

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
          {/* WrappedAvatar에는 파일 객체 대신, 미리보기용 Data URL을 넘겨줍니다. */}
          <WrappedAvatar src={avatarSrc || ''} alt="이미지 추가" size="large" />
          <div className="absolute bottom-0 right-0">
            <ImageAdd />
          </div>
        </div>
      )}
    />
  );
}

export default AvatarImg;
