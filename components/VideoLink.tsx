import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import styled from 'styled-components/native';
import { getDetailTitle } from '../util';

interface IProps {
  onPressLink: (key: string) => () => void;
  videoId: string;
  title: string;
}

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
`;
const BtnText = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 24px;
  margin-left: 10px;
`;

export function VideoLink({ onPressLink, videoId, title }: IProps) {
  return (
    <VideoBtn activeOpacity={0.5} onPress={onPressLink(videoId)}>
      <Ionicons name="logo-youtube" color="#e84118" size={24} />
      <BtnText>{getDetailTitle(title)}</BtnText>
    </VideoBtn>
  );
}
