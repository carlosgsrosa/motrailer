import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {images} from '../../constants';

import {
  VerticalView,
  VoteAverage,
  GlobalStyles,
  Poster,
  GradientCircle,
  Image,
} from '../../components';

export default function TvList(props) {
  const navigation = useNavigation();

  const {
    marginRight,
    width,
    height,
    showLabels = true,
    onPress,
    origin,
    media_type,
  } = props;

  const data = {
    id: props.id,
    original_title: props.original_title,
    watchlist: props.watchlist || false,
    vote_average: props.vote_average,
    poster_path: props.poster_path,
    release_date: props.release_date,
    media_type: media_type,
  };

  const WhatListToggle = () => {
    if (!showLabels) {
      return null;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onPress(data, origin)}
        style={styles.whatlist}>
        <Image
          resizeMode="contain"
          height="46px"
          width="32px"
          source={
            data.watchlist
              ? images.icons.watchlist_checked
              : images.icons.watchlist
          }
        />
      </TouchableOpacity>
    );
  };

  const VoteAverageCircle = () => {
    if (!showLabels) {
      return null;
    }

    return (
      <GradientCircle
        style={(GlobalStyles.shadow, {borderRadius: 16})}
        colors={['#F99F00', '#DC3563', '#E75D3E']}>
        <VoteAverage fontColor="#FFFFFF" voteAverage={data.vote_average} />
      </GradientCircle>
    );
  };

  return (
    <VerticalView marginRight={marginRight} style={[GlobalStyles.shadow]}>
      <WhatListToggle />
      <VoteAverageCircle />
      <TouchableOpacity
        onPress={() => navigation.push('TVDetail', {id: data.id})}>
        <Poster
          resizeMode="cover"
          width={width}
          height={height}
          borderRadius="6px"
          type="movie"
          source={data.poster_path}
        />
      </TouchableOpacity>
    </VerticalView>
  );
}

const styles = StyleSheet.create({
  whatlist: {
    position: 'absolute',
    top: 0,
    left: 6,
    zIndex: 1,
  },
});
