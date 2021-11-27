import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Linking, Share } from 'react-native';
import { useQuery } from 'react-query';
import styled, { useTheme } from 'styled-components/native';
import { AntDesign } from '@expo/vector-icons';
import { DetailProps } from '../@types';
import { movieAPI, tvAPI } from '../Api';
import { Genre, Loader, Poster, VideoLink } from '../components';
import { makeImgPath } from '../util';
import reviewList from '../DB/reviews.json';
import Review from '../components/Review';
import _ from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Theater } from '../components/Theater';
import {
  createLikeItemAction,
  createRemoveItemAction,
  useLikeContext,
} from '../provider/LikeProvider';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.bgColor};
`;
const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: center;
  padding: 0 20px;
`;
const Background = styled.ImageBackground``;
const Column = styled.View`
  flex-direction: row;
  width: 65%;
`;
const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
  font-weight: bold;
  margin-left: 20px;
  align-self: flex-end;
`;
const IconButtonWrapper = styled.View`
  flex-direction: row;
`;
const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 15px;
  margin: 20px 0;
  margin-top: 10px;
`;
const Data = styled.View`
  padding: 0 20px;
`;
const ReviewTitle = styled.Text`
  color: ${(props) => props.theme.textColor};
  font-size: 20px;
  font-weight: bold;
  margin-top: 20px;
  margin-bottom: 20px;
`;
const ReviewInput = styled.TextInput`
  border: 1px ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 500px;
  padding: 2px 12px;
  margin-top: 10px;
`;
const GenreContainer = styled.View`
  flex-direction: row;
  margin-top: 10px;
`;

export function Detail({
  route: { params },
  navigation: { setOptions },
}: DetailProps) {
  const isMovie = 'original_title' in params;
  const { isLoading, data } = useQuery(
    [isMovie ? 'movie' : 'tv', params.id],
    isMovie ? movieAPI.detail : tvAPI.detail
  );
  const [reviews, setReviews] = useState(_.shuffle(reviewList).slice(0, 2));
  const [text, setText] = useState('');
  const { textColor } = useTheme();
  const { state, dispatch } = useLikeContext();
  const detailTitle =
    params.title ||
    params.original_title ||
    params.name ||
    params.original_name;
  const handleShare = useCallback(() => {
    Share.share({
      message: `https://m.search.naver.com/search.naver?sm=mtp_hty.top&where=m&query=${detailTitle}`,
      title: detailTitle,
    });
  }, [detailTitle]);
  const handleLike = useCallback(() => {
    dispatch(
      state.likes.includes(params.id + '')
        ? createRemoveItemAction(params.id + '')
        : createLikeItemAction(params.id + '')
    );
  }, [dispatch, params.id, state.likes]);

  useEffect(() => {
    setOptions({
      title:
        'original_title' in params || 'title' in params ? 'Movie' : 'TV Show',
      headerRight: () => (
        <IconButtonWrapper>
          <TouchableOpacity onPress={handleLike}>
            <AntDesign
              name={state.likes.includes(params.id + '') ? 'heart' : 'hearto'}
              size={22}
              color={textColor}
              style={{ marginRight: 10 }}
            ></AntDesign>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <AntDesign name="sharealt" size={22} color={textColor}></AntDesign>
          </TouchableOpacity>
        </IconButtonWrapper>
      ),
    });
  }, [
    detailTitle,
    handleLike,
    handleShare,
    params,
    setOptions,
    state.likes,
    textColor,
  ]);

  const handleClickLink = (videoId: string) => async () => {
    const url = `https://m.youtube.com/watch?v=${videoId}`;
    await Linking.openURL(url);
  };
  const handleChangeText = (text: string) => {
    setText(text);
  };
  const handleSubmit = () => {
    setReviews([
      ...reviews,
      { id: _.uniqueId('id'), author: 'Guest', comment: text },
    ]);
    setText('');
  };

  return (
    <Container
      contentContainerStyle={{
        paddingBottom: 30,
      }}
    >
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path) }}
          blurRadius={5}
        />
        <LinearGradient
          colors={['transparent', '#1e272e']}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path} />
          <Title>{detailTitle}</Title>
        </Column>
      </Header>
      <Data>
        <GenreContainer>
          {data?.genres?.map(({ id, name }: { name: string; id: number }) => (
            <Genre key={id} name={name} />
          ))}
        </GenreContainer>
        <Overview>
          {params.overview || 'Sorry. No overview for this content right now.'}
        </Overview>
        <Theater />
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map(
          (video: { id: string; name: string; key: string }) => (
            <VideoLink
              key={video.id}
              onPressLink={handleClickLink}
              title={video.name}
              videoId={video.key}
            />
          )
        )}
        <ReviewTitle>Reviews</ReviewTitle>
        {reviews.map((review) => (
          <Review
            key={review.id}
            author={review.author}
            comment={review.comment}
          />
        ))}
        {
          <ReviewInput
            placeholder="리뷰를 써보세요!"
            placeholderTextColor={textColor}
            onChangeText={handleChangeText}
            onSubmitEditing={handleSubmit}
          >
            {text}
          </ReviewInput>
        }
      </Data>
    </Container>
  );
}
