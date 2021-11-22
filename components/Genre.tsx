import React from 'react';
import styled from 'styled-components/native';

interface IProps {
  name: string;
}

const Label = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-right: 10px;
  font-size: 13px;
  font-weight: 700;
  border: 1px ${(props) => props.theme.textColor};
  padding: 5px 10px;
  border-radius: 100px;
  text-align: center;
`;

export function Genre({ name }: IProps) {
  return <Label>{name}</Label>;
}
