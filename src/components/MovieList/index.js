import React, {useState} from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {getYearFromDate, stringToUpperCase} from '../../util';

import {images} from '../../constants';

import {
  VerticalView,
  VoteAverage,
  Text,
  styles,
  Poster,
  GradientCircle,
  Image,
} from '../../components';

export default function MovieList(props) {
  const navigation = useNavigation();
  const {marginRight, width, height, data, showLabels = true} = props;

  // console.warn(props);

  return (
    <VerticalView marginRight={marginRight} style={styles.shadow}>
      {showLabels ? (
        <>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => props.onAddWatchList(data)}
            style={{
              position: 'absolute',
              top: 0,
              left: 6,
              zIndex: 1,
            }}>
            <Image
              resizeMode="cover"
              height="46px"
              width="32px"
              source={images.icons.bookmark}
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
        {showLabels ? (
          <VerticalView style={styles.roundedAbsoluteView}>
            <Text
              fontSize="12px"
              fontFamily="SFProDisplay-Bold"
              marginTop="5px"
              color="#fff"
              marginLeft="5px">
              {getYearFromDate(
                data.first_air_date ? data.first_air_date : data.release_date,
              )}
            </Text>
            <Text
              color="#fff"
              fontSize="15px"
              fontFamily="SFProDisplay-Bold"
              marginLeft="5px"
              marginBottom="5px"
              numberOfLines={2}>
              {stringToUpperCase(data.name ? data.name : data.original_title)}
            </Text>
          </VerticalView>
        ) : null}
      </TouchableOpacity>
    </VerticalView>
  );
}
