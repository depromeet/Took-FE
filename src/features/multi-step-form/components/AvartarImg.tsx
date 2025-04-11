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

// 기본 아바타 이미지 경로 (상대 경로)
const AVATAR_IMAGE_PATH = '/icons/avatarIcon.svg';
// 최대 파일 크기 (5MB)

function AvatarImg() {
  const { control, setValue } = useFormContext<CareerFormData>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { isWebView } = useDevice();

  // 미리보기용 state (string | null)
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

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
    if (isWebView) {
      // 네이티브 이미지 선택 다이얼로그 표시
      const actionChoice = window.confirm('이미지 선택 방법을 선택하세요.\n확인: 카메라로 찍기, 취소: 갤러리에서 선택');
      if (actionChoice) {
        sendImagePickerMessage('camera');
      } else {
        sendImagePickerMessage('library');
      }
    } else {
      // 웹에서는 기존 방식으로 파일 선택
      fileInputRef.current?.click();
    }
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
                // 파일 크기 체크
                if (file.size > MAX_FILE_SIZE) {
                  toast.error('이미지 파일 크기는 5MB 이하여야 합니다.');
                  e.target.value = ''; // input 초기화
                  return;
                }

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
