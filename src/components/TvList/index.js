import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {getYearFromDate, stringToUpperCase} from '../../util';

import {
  VerticalView,
  VoteAverage,
  Text,
  GlobalStyles,
  Poster,
  GradientCircle,
} from '../../components';

export default function MovieList({marginRight, width, height, data}) {
  const navigation = useNavigation();

  const params = {
    id: data.id,
  };

  return (
    <>
      <VerticalView marginRight={marginRight} style={GlobalStyles.shadow}>
        <GradientCircle colors={['#F99F00', '#DC3563', '#E75D3E']}>
          <VoteAverage fontColor="#fff" voteAverage={data.vote_average} />
        </GradientCircle>
        <TouchableOpacity onPress={() => navigation.push('TvDetail', params)}>
          <Poster
            resizeMode="cover"
            width={width}
            height={height}
            borderRadius="6px"
            type="movie"
            source={data.poster_path}
          />
          <VerticalView style={GlobalStyles.roundedAbsoluteView}>
            <Text fontSize="12px" marginTop="5px" color="#fff" marginLeft="5px">
              {getYearFromDate(data.first_air_date)}
            </Text>
            <Text
              color="#fff"
              fontSize="15px"
              fontWeight="bold"
              marginLeft="5px"
              marginBottom="5px"
              numberOfLines={2}>
              {stringToUpperCase(data.name)}
            </Text>
          </VerticalView>
        </TouchableOpacity>
      </VerticalView>
    </>
  );
}
