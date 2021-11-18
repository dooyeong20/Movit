import React from 'react';
import styled from 'styled-components/native';

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ActivityIndicator = styled.ActivityIndicator`
  color: ${(props) => props.theme.textColor};
`;

export function Loader() {
  return (
    <LoaderContainer>
      <ActivityIndicator color="" size="large" />
    </LoaderContainer>
  );
}
