import React from 'react';
import styled from 'styled-components/native';

interface IProps {
  rating: string;
  total: string;
}

const Votes = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

export function Vote({ rating, total }: IProps) {
  return <Votes>{`⭐️ ${rating} / ${total}`}</Votes>;
}
