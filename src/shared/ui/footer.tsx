'use client';
import Image from 'next/image';
import React from 'react';

import creditCard from './icon/credit-card.svg';
import frame from './icon/Frame.svg';
import user from './icon/user.svg';

type FooterProps = {
  current: 'mycard' | 'collection' | 'setting';
};

function Footer({ current }: FooterProps) {
  return (
    <footer className="flex h-[79px] w-full items-center justify-center gap-10 border border-white bg-gray-black px-5 text-[13px]">
      <div
        className={`flex flex-col items-center justify-center gap-0.5 self-stretch p-[12px_8px_20px_8px] text-white ${current !== 'mycard' && 'opacity-30'} cursor-pointer`}
      >
        <Image src={creditCard} alt="credit-card" className="h-6 w-6" />
        <p className="text-gray-75">내 명함</p>
      </div>
      <div
        className={`flex flex-col items-center justify-center gap-0.5 self-stretch p-[12px_8px_20px_8px] text-white ${current !== 'collection' && 'opacity-30'} cursor-pointer`}
      >
        <Image src={frame} alt="frame" className="h-6 w-6" />
        <p className="text-gray-75">받은 명함</p>
      </div>
      <div
        className={`flex flex-col items-center justify-center gap-0.5 self-stretch p-[12px_8px_20px_8px] text-white ${current !== 'setting' && 'opacity-30'} cursor-pointer`}
      >
        <Image src={user} alt="credit-card" className="h-6 w-6" />
        <p className="text-gray-75">설정</p>
      </div>
    </footer>
  );
}

//  opacity-30

export default Footer;
