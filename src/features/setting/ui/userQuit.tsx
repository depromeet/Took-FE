'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useController, useForm } from 'react-hook-form';

import useHistoryBack from '@/shared/hooks/useHistoryBack';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import Appbar from '@/shared/ui/appbar';
import FixedButton from '@/shared/ui/button/fixedButton';
import { Checkbox } from '@/shared/ui/checkbox';
import { List } from '@/shared/ui/list';
import { Textarea } from '@/shared/ui/textArea';
import { Typography } from '@/shared/ui/typography';

import { QUIT_REASONS } from '../config';
import { UserQuitSchema, userQuitSchema } from '../schema';

const TEXT_AREA_MAX_LENGTH = 40;

const UserQuitView = () => {
  const router = useRouter();
  const handleBack = useHistoryBack();
  const [customText, setCustomText] = useState(''); // 직접입력 텍스트
  const [isCustomReasonChecked, setIsCustomReasonChecked] = useState(false); // 직접입력 체크박스 상태

  const { control, handleSubmit, watch, setValue } = useForm<UserQuitSchema>({
    defaultValues: {
      reasons: [],
    },
    resolver: zodResolver<UserQuitSchema>(userQuitSchema),
  });

  const { field } = useController({
    control,
    name: 'reasons',
  });

  const reasons = watch('reasons');

  // 직접입력 텍스트를 reasons 배열에 업데이트하는 함수
  const updateReasonsWithCustomText = () => {
    if (!isCustomReasonChecked) return;

    // 표준 이유만 필터링 (QUIT_REASONS에 포함된 항목)
    const standardReasons = reasons.filter((reason) => QUIT_REASONS.includes(reason));

    if (customText) {
      // 커스텀 텍스트가 있으면 표준 이유와 함께 설정
      setValue('reasons', [...standardReasons, customText]);
    } else {
      // 커스텀 텍스트가 없으면 표준 이유만 설정
      setValue('reasons', standardReasons);
    }
  };

  // 직접입력 체크박스 상태 변경 시 처리
  const handleCustomReasonCheck = (checked: boolean) => {
    setIsCustomReasonChecked(checked);

    // 체크 해제 시 관련 텍스트 제거
    if (!checked) {
      setCustomText('');

      // reasons 배열에서 QUIT_REASONS에 포함되지 않은 모든 항목 제거 (직접입력 텍스트)
      const filteredReasons = reasons.filter((reason) => QUIT_REASONS.includes(reason));
      setValue('reasons', filteredReasons);
    }
  };

  // customText 또는 isCustomReasonChecked가 변경될 때 reasons 업데이트
  useEffect(() => {
    updateReasonsWithCustomText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customText, isCustomReasonChecked]);

  // 체크박스 상태 변경 핸들러 (일반 항목용)
  const handleReasonChange = (reason: string, checked: boolean) => {
    const currentReasons = [...field.value];

    if (checked) {
      // 체크된 경우 reasons 배열에 추가
      if (!currentReasons.includes(reason)) {
        field.onChange([...currentReasons, reason]);
      }
    } else {
      // 체크 해제된 경우 reasons 배열에서 제거
      const newReasons = currentReasons.filter((item) => item !== reason);
      field.onChange(newReasons);
    }
  };

  const onSubmit = (data: UserQuitSchema) => {
    console.log('제출 데이터:', data);
    // 제출 시 로그인 페이지로 이동
    router.replace('/login');
  };

  return (
    <>
      <div className="relative mx-auto h-dvh w-full max-w-[600px] justify-center">
        <Appbar page="mypage" title="회원 탈퇴" onLeftClick={handleBack} />
        <main className={cn(spacingStyles({ paddingY: 'lg', paddingX: 'ml' }))}>
          <header className={cn(spacingStyles({ paddingTop: 'lg' }), 'flex w-full flex-col gap-3')}>
            <Typography as="h1" variant="title-1">
              탈퇴하는 이유를 선택해주세요
            </Typography>
            <Typography as="p" variant="body-3" className="text-gray-400">
              최소 1개 이상 선택해 주세요
            </Typography>
          </header>
          <section className={cn(spacingStyles({ paddingTop: 'ms', paddingBottom: 'xl' }), 'flex w-full flex-col')}>
            <List variant="settingItem">
              {QUIT_REASONS.map((reason) => (
                <UserQuitItem
                  key={reason}
                  title={reason}
                  checked={reasons.includes(reason)}
                  onChange={(checked) => handleReasonChange(reason, checked)}
                />
              ))}
              <UserQuitItem title="직접입력" checked={isCustomReasonChecked} onChange={handleCustomReasonCheck} />
            </List>

            {/* 직접입력이 체크되었을 때만 TextArea 표시 */}
            {isCustomReasonChecked && (
              <div className={cn(spacingStyles({ marginTop: 'sm', paddingX: 'xs' }))}>
                <Textarea
                  placeholder="탈퇴하는 이유를 자세히 입력해주세요"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  size="lg"
                  error={customText.length > TEXT_AREA_MAX_LENGTH || customText.length === 0}
                  errorMsg={customText.length === 0 ? '최소 1자 이상 입력해주세요' : undefined}
                  totalNumber={TEXT_AREA_MAX_LENGTH}
                />
              </div>
            )}
          </section>

          {/* 고정된 하단 버튼 */}
          <FixedButton
            onClick={handleSubmit(onSubmit)}
            disabled={reasons.length === 0} // 선택된 이유가 없으면 버튼 비활성화
            title="탈퇴하기"
          />
        </main>
      </div>
    </>
  );
};

type UserQuitItemProps = {
  title: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
};

const UserQuitItem = ({ title, checked, onChange }: UserQuitItemProps) => {
  return (
    <div
      className={cn(spacingStyles({ paddingY: 'ms' }), 'flex cursor-pointer items-center')}
      onClick={() => onChange(!checked)} // div 전체 클릭 시 체크박스 토글
    >
      <div className="flex items-center gap-[10px]">
        <div className="flex items-center">
          <Checkbox
            checked={checked}
            onChange={(newChecked) => {
              onChange(newChecked);
            }}
          />
        </div>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default UserQuitView;
