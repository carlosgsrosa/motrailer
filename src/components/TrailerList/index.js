import React from 'react';
import {WebView} from 'react-native-webview';

import {VerticalView, Text} from '../../components';

export default function TrailerList({data}) {
  const getUri = () => {
    return `https://www.youtube.com/embed/${data.key}?rel=0&autoplay=0&showinfo=0&controls=0`;
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
        backgroundColor="#000"
        color="#FFFFFF"
        numberOfLines={1}
        fontSize="16px"
        fontWeight="300">
        {data.name}
      </Text>
      <WebView
        source={{
          uri: getUri(),
        }}
      />
    </VerticalView>
  );
}
