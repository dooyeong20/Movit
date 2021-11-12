const DEFAULT_IMG_PATH =
  'https://image.tmdb.org/t/p/w500/lNyLSOKMMeUPr1RsL4KcRuIXwHt.jpg';

export const makeImgPath = (img: string, width = 'w500') =>
  img ? `https://image.tmdb.org/t/p/${width}/${img}` : DEFAULT_IMG_PATH;

export const getFormatDate = (date: string) => {
  const [year, month, day] = date.split('-');

  return `${year}년 ${+month}월 ${+day}일`;
};
