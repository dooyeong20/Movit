import React from 'react';
import styled from 'styled-components/native';

interface IProps {
  rating: number;
  total: string;
}

const Votes = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-bottom: 2px;
`;

export function Vote({ rating, total }: IProps) {
  return <Votes>{`⭐️ ${rating} / ${total}`}</Votes>;
}
