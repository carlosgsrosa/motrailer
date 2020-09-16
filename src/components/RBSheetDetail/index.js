import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

import {getUri, getWindowsHeight} from '../../util';

import {VerticalView, Image, Text} from '../../components';

export default function RBSheetDetail({tag, image, overview}) {
  return (
    <RBSheet
      ref={tag}
      height={getWindowsHeight() - 100}
      openDuration={250}
      closeOnDragDown
      closeOnPressMask
      closeOnPressBack
      customStyles={{
        draggableIcon: {
          backgroundColor: '#9999',
        },
        container: {borderTopLeftRadius: 12, borderTopRightRadius: 12},
      }}>
      <VerticalView marginLeft="15px" marginRight="15px" marginBottom="15px">
        <Image
          width="100%"
          height="160px"
          marginBottom="15px"
          borderRadius="6px"
          resizeMode="cover"
          source={{uri: getUri(image)}}
        />
        <Text textAlign="justify">{overview}</Text>
      </VerticalView>
    </RBSheet>
  );
}
