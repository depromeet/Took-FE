import Tag from '@/shared/ui/tag/tag';
import React from 'react';
import { tagConfig } from '../config/config';

/**
 * TagBox : 태그 박스
 *
 */
function TagBox() {
  return (
    <>
      {tagConfig.map((tag, index) => {
        return <Tag message={tag.message} size="lg" className={tag.className} />;
      })}
    </>
  );
}
export default TagBox;
