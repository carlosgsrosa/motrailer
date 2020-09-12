import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {getYearFromDate, stringToUpperCase} from '../../util';

import {images} from '../../constants';

import {
  VerticalView,
  VoteAverage,
  Text,
  GlobalStyles,
  Poster,
  GradientCircle,
  Image,
} from '../../components';

export default function MovieList(props) {
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

  return (
    <VerticalView marginRight={marginRight} style={GlobalStyles.shadow}>
      {showLabels ? (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => onPress(data, origin)}
            style={{
              position: 'absolute',
              top: 0,
              left: 6,
              zIndex: 1,
            }}>
            <Image
              resizeMode="contain"
              height="46px"
              width="32px"
              source={
                data.watchlist
                  ? images.icons.bookmark_checked
                  : images.icons.bookmark
              }
            />
          </TouchableOpacity>

          <GradientCircle colors={['#F99F00', '#DC3563', '#E75D3E']}>
            <VoteAverage fontColor="#fff" voteAverage={data.vote_average} />
          </GradientCircle>
        </>
      ) : null}
      <TouchableOpacity onPress={() => navigation.push('Movie', {id: data.id})}>
        <Poster
          resizeMode="cover"
          width={width}
          height={height}
          borderRadius="6px"
          type="movie"
          source={data.poster_path}
        />
      </TouchableOpacity>
      {showLabels ? (
        <VerticalView style={GlobalStyles.roundedAbsoluteView}>
          <Text
            fontSize="13px"
            fontFamily="SFProDisplay-Bold"
            marginTop="5px"
            color="#fff"
            marginLeft="5px">
            {getYearFromDate(data.release_date || props.first_air_date)}
          </Text>
          <Text
            color="#fff"
            fontSize="15px"
            fontFamily="SFProDisplay-Bold"
            marginLeft="5px"
            marginBottom="5px"
            numberOfLines={2}>
            {stringToUpperCase(data.original_title || props.name)}
          </Text>
        </VerticalView>
      ) : null}
    </VerticalView>
  );
}
