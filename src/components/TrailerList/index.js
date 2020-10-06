import React from 'react';
import {WebView} from 'react-native-webview';

import {VerticalView, Text} from '../../components';

import {colors} from '../../constants';

export default function TrailerList({data}) {
  const {key, name} = data;

  const getMovieUri = () => {
    return `https://www.youtube.com/embed/${key}?rel=0&autoplay=0&showinfo=0&controls=0`;
  };

  return (
    <VerticalView
      borderRadius="6px"
      marginBottom="15px"
      style={{height: 200, width: '100%', overflow: 'hidden'}}>
      <Text
        paddingLeft="5px"
        paddingTop="5px"
        paddingRight="5px"
        paddingBottom="5px"
        backgroundColor={colors.black}
        color={colors.white}
        numberOfLines={1}
        fontSize="16px"
        fontWeight="300">
        {name}
      </Text>
      <WebView
        source={{
          uri: getMovieUri(),
        }}
      />
    </VerticalView>
  );
}
