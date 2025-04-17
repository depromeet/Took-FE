'use client';

import { useRef, useState, useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { sendImagePickerMessage } from '@/features/auth/login/utils/nativeBridge';
import useDevice from '@/shared/hooks/useDevice';
import WrappedAvatar from '@/shared/ui/Avatar';
import ImageAdd from '@/shared/ui/Avatar/imageAdd';

import { MAX_FILE_SIZE } from '../config';
import { CareerFormData } from '../schema';
import { CardUpdateDto } from '../types';

// 기본 아바타 이미지 경로 (상대 경로)
const AVATAR_IMAGE_PATH = '/icons/avatarIcon.svg';

type AvatarImgProps = {
  cardData?: CardUpdateDto;
};

function AvatarImg({ cardData }: AvatarImgProps) {
  console.log('iamge : ' + cardData?.data.imagePath);
  const { control, setValue } = useFormContext<CareerFormData>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isWebView } = useDevice();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 미리보기용 state (string | null)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(cardData?.data?.imagePath || null);

  useEffect(() => {
    if (cardData?.data?.imagePath) {
      setAvatarSrc(cardData.data.imagePath);
      setValue('isImageRemoved', false);
    }
  }, [cardData]);

  // 웹뷰로부터 이미지 데이터를 받기 위한 메시지 리스너
  useEffect(() => {
    if (isWebView && typeof window !== 'undefined') {
      const handleMessage = async (event: MessageEvent) => {
        try {
          if (typeof event.data === 'string' && event.data.startsWith('data:image')) {
            // 이미지 데이터 URL을 받아서 처리
            setAvatarSrc(event.data);

            // 데이터 URL에서 파일 객체 생성
            const response = await fetch(event.data);
            const blob = await response.blob();
            const { mime, ext } = getMimeAndExt(event.data);
            const file = new File([blob], `profile.${ext}`, { type: mime });
            setValue('profileImage', file);
          }
        } catch (error) {
          console.error('메시지 처리 중 오류:', error);
        }
      };

      window.addEventListener('message', handleMessage);
      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [isWebView, setValue]);

  // 컴포넌트 마운트 시 기본 이미지 URL을 폼에 설정
  useEffect(() => {
    // 클라이언트 측에서만 실행
    if (typeof window !== 'undefined') {
      if (!avatarSrc) {
        // 이미지가 없는 경우 (기본 이미지 적용)
        fetch(`${window.location.origin}${AVATAR_IMAGE_PATH}`)
          .then((response) => response.blob())
          .then((blob) => {
            const defaultFile = new File([blob], 'default-avatar.png', { type: 'image/png' });
            setValue('profileImage', defaultFile);
            setValue('isImageRemoved', true); // 기본 이미지는 삭제로 간주
          })
          .catch((error) => {
            console.error('기본 이미지 로드 실패:', error);
          });
      }
    }
  }, [setValue, avatarSrc]);

  const handleImageSelection = (type: 'camera' | 'library') => {
    if (isWebView) {
      sendImagePickerMessage(type);
    } else {
      fileInputRef.current?.click();
    }
    setIsDropdownOpen(false);
  };

  return (
    <Controller
      control={control}
      name="profileImage"
      render={({ field: { onChange } }) => (
        <div className="relative inline-block">
          <div
            className="cursor-pointer"
            onClick={() => {
              if (isWebView) {
                setIsDropdownOpen(!isDropdownOpen);
              } else {
                fileInputRef.current?.click();
              }
            }}
          >
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  if (file.size > MAX_FILE_SIZE) {
                    toast.error('이미지 파일 크기는 10MB 이하여야 합니다.');
                    e.target.value = '';
                    return;
                  }
                  onChange(file);
                  const reader = new FileReader();
                  reader.onloadend = () => {
                    const result = reader.result as string;
                    setAvatarSrc(result);
                  };
                  reader.readAsDataURL(file);
                }
              }}
            />
            <WrappedAvatar src={avatarSrc ?? undefined} alt="프로필 이미지" size="large" />
            <div className="absolute bottom-0 right-0">
              <ImageAdd />
            </div>
          </div>

          {isWebView && isDropdownOpen && (
            <div className="absolute left-0 top-full z-10 mt-2 w-48 rounded-md bg-white shadow-lg">
              <div className="py-1">
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleImageSelection('camera')}
                >
                  카메라로 찍기
                </button>
                <button
                  className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => handleImageSelection('library')}
                >
                  갤러리에서 선택
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    />
  );
}

export default AvatarImg;

// 이렇게 수정하면 다양한 이미지 형식 지원 가능
const getMimeAndExt = (dataUrl: string) => {
  // data:image/png;base64,... 또는 data:image/jpeg;base64,... 등에서 MIME 타입 추출
  const mimeMatch = dataUrl.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);/);
  const mime = mimeMatch ? mimeMatch[1] : 'image/jpeg';

  // MIME 타입에 따른 확장자 결정
  const extMap: { [key: string]: string } = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
    'image/svg+xml': 'svg',
  };

  const ext = extMap[mime] || 'jpg';
  return { mime, ext };
};
