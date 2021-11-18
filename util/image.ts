const DEFAULT_IMG_PATH =
  'https://image.tmdb.org/t/p/w500/lNyLSOKMMeUPr1RsL4KcRuIXwHt.jpg';

export const makeImgPath = (img: string | null | undefined, width = 'w500') =>
  img ? `https://image.tmdb.org/t/p/${width}/${img}` : DEFAULT_IMG_PATH;
