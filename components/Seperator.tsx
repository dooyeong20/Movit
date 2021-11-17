import React from 'react';
import { View } from 'react-native';

interface IProps {
  variant: 'horizontal' | 'vertical';
  space: number;
}

export function Seperator({ variant, space }: IProps) {
  return (
    <View
      style={{
        [variant === 'horizontal' ? 'width' : 'height']: space,
      }}
    />
  );
}
