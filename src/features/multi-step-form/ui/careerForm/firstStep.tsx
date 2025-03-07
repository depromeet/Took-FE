import { cn } from '@/shared/lib/utils';
import { spacingStyles } from '@/shared/spacing';
import WrappedInput from '@/shared/ui/Input';

import AvatarImg from '../../components/AvartaImg';
import { CAREER_FORM } from '../../config';

function FirstStep() {
  return (
    <>
      <header className='flex flex-col gap-3'>
        <h1 className='text-title-1 text-gray-white'>{CAREER_FORM.firstStep.title}</h1>
        <h3 className='text-body-3 text-gray-400'>{CAREER_FORM.firstStep.description}</h3>
      </header>
      <section className={cn(spacingStyles({ marginTop: 'xl' }))}>
        <div className='flex flex-col gap-4'>
          <div className='flex justify-center'>
            <AvatarImg />
          </div>
          <WrappedInput title='이름' placeholder='이름을 입력해주세요.' />
          <WrappedInput title='세부직군' placeholder='세부직군' />
          <WrappedInput title='관심 도메인' placeholder='관심도메인' />
          <WrappedInput title='한 줄 소개' placeholder='본인을 잘 드러낼 수 있는 문장을 작성해 주세요.' />
        </div>
      </section>
    </>
  )
}

export default FirstStep;