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
      borderRadius={6}
      marginBottom={15}
      style={{height: 200, width: '100%', overflow: 'hidden'}}>
      <Text
        paddingLeft={5}
        paddingTop={5}
        paddingRight={5}
        paddingBottom={5}
        backgroundColor={colors.black}
        color={colors.white}
        numberOfLines={1}
        fontSize={16}
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
