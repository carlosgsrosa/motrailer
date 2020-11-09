import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {stringToUpperCase, getYearFromDate} from '../../util';

import {colors} from '../../constants';

import {
  VerticalView,
  VoteAverage,
  GlobalStyles,
  Poster,
  GradientCircle,
  Text,
} from '../../components';

export default function MovieList(props) {
  const {marginRight, showLabels = true} = props;

  const navigation = useNavigation();

  const data = {
    id: props.id,
    title: props.title,
    watchlist: props.watchlist || false,
    vote_average: props.vote_average,
    poster_path: props.poster_path,
    release_date: props.release_date,
    media_type: props.media_type,
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

  const MovieDescription = () => {
    return (
      <VerticalView style={styles.movieDescription}>
        <Text color={colors.dimGray} fontSize="12px">
          {getYearFromDate(data.release_date)}
        </Text>
        <Text
          width={props.width}
          color={colors.white}
          fontSize="12px"
          fontWeight="bold"
          numberOfLines={3}>
          {stringToUpperCase(data.title)}
        </Text>
      </VerticalView>
    );
  };

  return (
    <VerticalView alignItems="center">
      <VerticalView marginRight={marginRight}>
        <VoteAverageCircle />
        <TouchableOpacity
          onPress={() => navigation.push('MovieDetail', {id: data.id})}>
          <Poster {...props} source={data.poster_path} />
        </TouchableOpacity>
        <MovieDescription />
      </VerticalView>
    </VerticalView>
  );
}

const styles = StyleSheet.create({
  watchlist: {
    position: 'absolute',
    top: 0,
    left: 6,
    zIndex: 1,
  },
  movieDescription: {
    marginTop: 5,
  },
});
