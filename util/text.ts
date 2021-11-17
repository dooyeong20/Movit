export const getText = (text: string | undefined | null, size: number) => {
  if (!text) {
    return '...';
  }

  const slicedText = text.slice(0, size);

  return text.length > size ? slicedText + '...' : slicedText;
};
