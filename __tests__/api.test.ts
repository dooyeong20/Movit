import fetchMock from 'jest-fetch-mock';
import { movieAPI, tvAPI } from '../Api';

describe('Test for APIs', () => {
  beforeEach(() => {
    fetchMock.doMock();
  });

  test('Movie Trending API Test', async () => {
    const data = await movieAPI.trending();

    expect(data).toHaveProperty('results');
    expect(data.results).not.toHaveLength(0);
  });

  test('Movie Now Playing API Test', async () => {
    const data = await movieAPI.nowPlaying();

    expect(data).toHaveProperty('results');
    expect(data.results).not.toHaveLength(0);
  });

  test('Movie Up Coming API Test', async () => {
    const data = await movieAPI.upcoming();

    expect(data).toHaveProperty('results');
    expect(data.results).not.toHaveLength(0);
  });

  test('TV Airing Today API Test', async () => {
    const data = await tvAPI.airingToday();

    expect(data).toHaveProperty('results');
    expect(data.results).not.toHaveLength(0);
  });

  test('TV On Air API Test', async () => {
    const data = await tvAPI.onTheAir();

    expect(data).toHaveProperty('results');
    expect(data.results).not.toHaveLength(0);
  });

  test('TV Popular API Test', async () => {
    const data = await tvAPI.popular();

    expect(data).toHaveProperty('results');
    expect(data.results).not.toHaveLength(0);
  });

  test('TV Top Rated API Test', async () => {
    const data = await tvAPI.topRated();

    expect(data).toHaveProperty('results');
    expect(data.results).not.toHaveLength(0);
  });

  test('TV Trending API Test', async () => {
    const data = await tvAPI.trending();

    expect(data).toHaveProperty('results');
    expect(data.results).not.toHaveLength(0);
  });
});
