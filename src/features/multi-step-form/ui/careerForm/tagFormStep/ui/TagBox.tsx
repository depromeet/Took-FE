import React from 'react';

import Tag from '@/shared/ui/tag/tag';

import { tagConfig } from '../config/config';

/**
 * TagBox : 태그 박스
 *
 */
function TagBox() {
  return (
    <>
      {tagConfig.map((tag) => {
        return <Tag key={tag.id} message={tag.message} size="lg" className={tag.className} />;
      })}
    </>
  );
}
export default TagBox;
