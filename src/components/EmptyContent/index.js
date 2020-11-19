import React from 'react';

import {images} from '../../constants';

import {VerticalView, Image, Text} from '../';

export default function EmptyContent({message}) {
  return (
    <VerticalView
      flex={1}
      justifyContent="center"
      style={{alignItems: 'center', justifyContent: 'center'}}>
      <Image height={150} width={171} source={images.icons.logo} />
      <Text
        marginTop={15}
        fontWeight="200"
        fontSize={18}
        color="#666666"
        textAlign="center">
        {message}
      </Text>
    </VerticalView>
  );
}
