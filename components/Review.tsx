import React from 'react';
import styled, { useTheme } from 'styled-components/native';

interface IProps {
  author: string;
  comment: string;
}

const ReviewContainer = styled.View``;
const ReviewAuthor = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 15px;
  font-weight: 700;
  margin-bottom: 10px;
`;
const ReviewComment = styled.Text`
  font-size: 14px;
  margin-bottom: 15px;
`;

export default function Review({ author, comment }: IProps) {
  const { textColor } = useTheme();
  return (
    <ReviewContainer>
      <ReviewAuthor
        style={{
          color: author === 'Guest' ? '#6ab04c' : textColor,
        }}
      >
        {author === 'Guest' ? '☆' : '★'} {author}
      </ReviewAuthor>
      <ReviewComment
        style={{
          color: author === 'Guest' ? '#6ab04c' : textColor,
        }}
      >
        {comment}
      </ReviewComment>
    </ReviewContainer>
  );
}
