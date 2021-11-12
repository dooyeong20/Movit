import { makeImgPath } from '../util/utils';
test('Image path test', () => {
  expect(makeImgPath('hello')).toBe('https://image.tmdb.org/t/p/w500/hello');

  expect(makeImgPath(undefined as unknown as string)).toBe(
    'https://image.tmdb.org/t/p/w500/lNyLSOKMMeUPr1RsL4KcRuIXwHt.jpg'
  );
});
