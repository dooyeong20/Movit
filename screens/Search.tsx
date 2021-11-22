import React, { useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import _ from 'lodash';
import { useQuery } from 'react-query';
import { searchAPI } from '../Api';
import { HList, Loader } from '../components';
import { BaseResponse } from '../@types';

const Container = styled.ScrollView``;

const SearchBar = styled.TextInput`
  border: 2px solid ${(props) => props.theme.textColor};
  padding: 5px 15px;
  border-radius: 500px;
  width: 90%;
  margin: 20px auto;
  color: ${(props) => props.theme.textColor};
`;

export default function Search() {
  const { textColor } = useTheme();
  const [query, setQuery] = useState('');
  const {
    isLoading: movieLoading,
    data: movieData,
    refetch: searchMovies,
  } = useQuery<BaseResponse>(['searchMovies', query], searchAPI.movies, {
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTvs,
  } = useQuery<BaseResponse>(['searchTvs', query], searchAPI.tvShows, {
    enabled: false,
  });

  useEffect(() => {
    searchMovies();
    searchTvs();
  }, [query, searchMovies, searchTvs]);

  const handleChangeText = (text: string) => {
    setQuery(text);
  };

  const isLoading = movieLoading || tvLoading;

  return (
    <Container>
      <SearchBar
        placeholder="Search Movies or TV Shows"
        placeholderTextColor={textColor}
        returnKeyLabel="search"
        returnKeyType="search"
        onChangeText={_.debounce(handleChangeText, 500)}
      />
      {isLoading && <Loader />}
      {movieData?.total_results ? (
        <HList title="Movie" data={movieData} />
      ) : null}
      {tvData?.total_results ? <HList title="TV Shows" data={tvData} /> : null}
    </Container>
  );
}
