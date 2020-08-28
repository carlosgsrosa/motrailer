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
      closeOnDragDown={true}
      closeOnPressMask={true}
      closeOnPressBack={true}
      customStyles={{
        draggableIcon: {
          backgroundColor: '#9999',
        },
        container: {borderTopLeftRadius: 12, borderTopRightRadius: 12},
      }}>
      <VerticalView marginLeft="15px" marginRight="15px" margiBottom="15px">
        <Image
          width="100%"
          height="160px"
          marginBottom="15px"
          borderRadius="6px"
          resizeMode="cover"
          source={{uri: getUri(image)}}
        />
        <Text
          textAlign="justify"
          marginLeft="15px"
          marginRight="15px"
          fontSize="20px">
          {overview}
        </Text>
      </VerticalView>
    </RBSheet>
  );
}
