import { StackScreenProps } from '@react-navigation/stack';
import { Result } from '.';

export type StackParamList = {
  Detail: Partial<Result>;
};

export type DetailProps = StackScreenProps<StackParamList, 'Detail'>;
