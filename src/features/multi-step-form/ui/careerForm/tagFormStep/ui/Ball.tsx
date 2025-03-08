import Image from 'next/image';
import React from 'react';

/**
 * Ball : 태그 구슬
 */
function Ball() {
  const circleStyle =
    'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-[calc(50%+2rem)] overflow-hidden rounded-full bg-[rgba(108,75,255,0.04)] opacity-40';
  const circleShadowStyle = (bgOpacity: number, shadowOpacity: number) =>
    `bg-[rgba(108,75,255,${bgOpacity})] opacity-40 shadow-[0px_0px_11.9px_rgba(103,68,255,${shadowOpacity}),_inset_0px_0px_54.5px_rgba(208,195,255,${shadowOpacity})]`;

  return (
    <>
      <circle className={`z-10 h-[494px] w-[494px] opacity-40 ${circleStyle} ${circleShadowStyle(0.04, 0.2)}`} />
      <circle className={`z-20 h-72 w-72 opacity-50 ${circleStyle} ${circleShadowStyle(0.08, 0.3)}`} />
      <div className="absolute left-1/2 top-1/2 z-30 flex h-44 w-44 -translate-x-1/2 -translate-y-[calc(50%+2rem)] items-center justify-center rounded-full bg-[url(/images/tag/ball.png)] bg-cover bg-center">
        <Image src="/icons/icon_graphic_large.png" alt="그래픽 아이콘" width={46} height={46} />
      </div>
    </>
  );
}

export default Ball;
