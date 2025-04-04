'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';

import useCookies from '@/shared/hooks/useCookies';
import useHistoryBack from '@/shared/hooks/useHistoryBack';
import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import Appbar from '@/shared/ui/appbar';
import FixedButton from '@/shared/ui/button/fixedButton';
import { Checkbox } from '@/shared/ui/checkbox';
import { List } from '@/shared/ui/list';
import { Textarea } from '@/shared/ui/textArea';
import { Typography } from '@/shared/ui/typography';

import { QUIT_REASONS, TEXT_AREA_MAX_LENGTH } from '../config';
import useWithdraw from '../hooks/useWithdraw';
import { UserQuitSchemaType, userQuitSchema } from '../schema';

import WithdrawDialog from './dialog/withdraw';

const UserQuitView = () => {
  const handleBack = useHistoryBack();
  const [isCustomReasonChecked, setIsCustomReasonChecked] = useState(false); // 직접입력 체크박스 상태

  // 탈퇴 요청
  const { withdraw } = useWithdraw();
  const { getValue } = useCookies();
  const refreshToken = getValue('refreshToken');

  const {
    control,
    handleSubmit,
    watch,
    resetField,
    setValue,
    formState: { errors }, // React Hook Form의 errors 객체 사용
  } = useForm<UserQuitSchemaType>({
    defaultValues: {
      reasons: [],
      directMessage: '',
    },
    resolver: zodResolver<UserQuitSchemaType>(userQuitSchema),
  });

  const { field } = useController({
    control,
    name: 'reasons',
  });

  const reasons = watch('reasons');
  const customText = watch('directMessage') ?? '';
  const isDisabled =
    reasons?.length === 0 && customText.length === 0
      ? true
      : isCustomReasonChecked && customText.length === 0
        ? true
        : false;

  // 직접입력 체크박스 상태 변경 시 처리
  const handleCustomReasonCheck = (checked: boolean) => {
    setIsCustomReasonChecked(checked);

    // 체크 해제 시 관련 텍스트 제거 및 상태 초기화
    if (!checked) {
      // reasons 배열에서 QUIT_REASONS에 포함되지 않은 모든 항목 제거 (직접입력 텍스트)
      const filteredReasons = reasons?.filter((reason) => QUIT_REASONS.includes(reason));
      setValue('reasons', filteredReasons);
      resetField('directMessage');
    }
  };

  // 체크박스 상태 변경 핸들러 (일반 항목용)
  const handleReasonChange = (reason: string, checked: boolean) => {
    const currentReasons = [...(field.value ?? [])];

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

  const onSubmit = (data: UserQuitSchemaType) => {
    const { reasons, directMessage } = data;
    // 탈퇴 요청
    withdraw({ refreshToken: refreshToken as string, reasons: reasons, directMessage: directMessage });
  };

  // 에러 메시지는 React Hook Form의 errors 객체에서 가져옴
  const directMessageError = errors.directMessage?.message;

  return (
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
                checked={reasons?.includes(reason) ?? false}
                onChange={(checked) => handleReasonChange(reason, checked)}
              />
            ))}
            <UserQuitItem title="직접입력" checked={isCustomReasonChecked} onChange={handleCustomReasonCheck} />
          </List>

          {/* 직접입력이 체크되었을 때만 TextArea 표시 */}
          {isCustomReasonChecked && (
            <Controller
              control={control}
              name="directMessage"
              render={({ field }) => (
                <div className={cn(spacingStyles({ marginTop: 'sm', paddingX: 'xs' }))}>
                  <Textarea
                    {...field}
                    placeholder="탈퇴하는 이유를 자세히 입력해주세요"
                    size="lg"
                    error={!!directMessageError}
                    errorMsg={directMessageError}
                    totalNumber={TEXT_AREA_MAX_LENGTH}
                  />
                </div>
              )}
            />
          )}
        </section>

        {/* 고정된 하단 버튼 */}
        <WithdrawDialog
          trigger={<FixedButton disabled={isDisabled} title="탈퇴하기" />}
          onConfirm={handleSubmit(onSubmit)}
        />
      </main>
    </div>
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
