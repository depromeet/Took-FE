/**  공통 컴포넌트 - footer
  사용 방법 : 
  <Footer current={"mycard" || "collection" || "setting"}
    onClick={(tab) => {
      if (tab === 'mycard') router.push('/mycard');
      if (tab === 'collection') router.push('/collection');
      if (tab === 'setting') router.push('/setting');
    }} 
  />
  "mycard" - 내 명함 / "collection" - 받은 명함 / "setting" - 설정
*/

'use client';
import Image from 'next/image';
import React from 'react';

import creditCard from './icon/credit-card.svg';
import frame from './icon/Frame.svg';
import user from './icon/user.svg';

type CommonCurrentType = 'mycard' | 'collection' | 'setting';

type FooterProps = {
  current: CommonCurrentType;
  onClick?: (tab: CommonCurrentType) => void;
};

function Footer({ current, onClick }: FooterProps) {
  const commonClasses =
    'flex flex-col items-center justify-center gap-0.5 self-stretch p-[12px_8px_20px_8px] text-white cursor-pointer';

  return (
    <footer className="flex h-[79px] w-full items-center justify-center gap-10 border border-white bg-gray-black px-5 text-[13px]">
      <div className={`${commonClasses} ${current !== 'mycard' && 'opacity-30'}`} onClick={() => onClick?.('mycard')}>
        <Image src={creditCard} alt="credit-card" className="h-6 w-6" />
        <p className="text-gray-75">내 명함</p>
      </div>
      <div
        className={`${commonClasses} ${current !== 'collection' && 'opacity-30'}`}
        onClick={() => onClick?.('collection')}
      >
        <Image src={frame} alt="frame" className="h-6 w-6" />
        <p className="text-gray-75">받은 명함</p>
      </div>
      <div className={`${commonClasses} ${current !== 'setting' && 'opacity-30'}`} onClick={() => onClick?.('setting')}>
        <Image src={user} alt="user" className="h-6 w-6" />
        <p className="text-gray-75">설정</p>
      </div>
    </footer>
  );
}

//  opacity-30

export default Footer;
