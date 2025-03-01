export const isTextArray = (content: string | string[]) => {
  if (Array.isArray(content)) {
    return true;
  }

  return false;
};
