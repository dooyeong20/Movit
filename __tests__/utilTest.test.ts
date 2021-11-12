import { makeImgPath, getFormatDate } from '../util/utils';

describe('Test for util functions', () => {
  test('Image path test', () => {
    expect(makeImgPath('hello')).toBe('https://image.tmdb.org/t/p/w500/hello');

    expect(makeImgPath(undefined as unknown as string)).toBe(
      'https://image.tmdb.org/t/p/w500/lNyLSOKMMeUPr1RsL4KcRuIXwHt.jpg'
    );
  });

  test('Format date test', () => {
    expect(getFormatDate('2021-11-12')).toBe('2021년 11월 12일');

    expect(getFormatDate('2021-01-02')).toBe('2021년 1월 2일');

    expect(getFormatDate('2021-12-31')).toBe('2021년 12월 31일');
  });
});
