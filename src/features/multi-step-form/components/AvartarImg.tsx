import { useRef, useState } from 'react';

import WrappedAvatar from '@/shared/ui/Avatar';
import ImageAdd from '@/shared/ui/Avatar/imageAdd';
import { MAX_FILE_SIZE } from '../config';

function AvatarImg() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; // 이미지 파일은 하나기 때문에 배열의 첫 번째 요소만 사용
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        // reader.result는 string | ArrayBuffer 이므로 string으로 형변환
        setAvatarSrc(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative inline-block cursor-pointer" onClick={handleClick}>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
      <WrappedAvatar
        src={avatarSrc || ''} // 이미지 src 전달. src가 없으면 빈 문자열
        alt="이미지 추가"
        size="large"
      />
      <div className="absolute bottom-0 right-0">
        <ImageAdd />
      </div>
    </div>
  );
}

export default AvatarImg;
