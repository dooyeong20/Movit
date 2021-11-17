import React from 'react';
import styled from 'styled-components/native';
import { makeImgPath } from '../util';

interface IProps {
  path: string | null;
}

const PosterImage = styled.Image`
  width: 100px;
  height: 165px;
  border-radius: 5px;
`;

export function Poster({ path }: IProps) {
  return <PosterImage source={{ uri: makeImgPath(path) }} />;
}
