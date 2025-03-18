import { useEffect, useState } from 'react';
import { FieldArrayWithId } from 'react-hook-form';

/**
 * useEditingStates 훅은 주어진 필드 배열에 대한 편집 상태를 관리합니다.
 *
 * @param {FieldArrayWithId[]} fields - 편집 상태를 관리할 필드 배열입니다.
 * @returns {{
 *   editingStates: boolean[];
 *   setEditingState: (index: number, isEditing: boolean) => void;
 * }} - 현재 편집 상태 배열과 특정 인덱스의 편집 상태를 설정하는 함수입니다.
 *
 * @example
 * const { editingStates, setEditingState } = useEditingStates(fields);
 *
 * // 특정 인덱스의 편집 상태를 변경
 * setEditingState(0, false);
 */

export const useEditingStates = (fields: FieldArrayWithId[]) => {
  const [editingStates, setEditingStates] = useState<boolean[]>(fields.map(() => true));

  useEffect(() => {
    setEditingStates((prev) => {
      const newLength = fields.length;
      if (newLength === prev.length) return prev;
      if (newLength > prev.length) {
        return [...prev, ...Array(newLength - prev.length).fill(true)];
      }
      return prev.slice(0, newLength);
    });
  }, [fields]);

  // 특정 인덱스의 편집 상태를 설정하는 함수
  const setEditingState = (index: number, isEditing: boolean) => {
    setEditingStates((prev) => {
      const newEditingStates = [...prev];
      newEditingStates[index] = isEditing;
      return newEditingStates;
    });
  };

  // 필드 제거 시 해당 인덱스 상태 제거를 위한 함수
  const removeEditingState = (index: number) => {
    setEditingStates((prev) => prev.filter((_, i) => i !== index));
  };

  // 필드 추가 시 새로운 상태(true)를 추가하는 함수
  const addEditingState = () => {
    setEditingStates((prev) => [...prev, true]);
  };

  return { editingStates, setEditingState, removeEditingState, addEditingState };
};
