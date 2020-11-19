import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';

import {getUri, getWindowsHeight} from '../../util';

import {VerticalView, Image, Text} from '../../components';

import {colors} from '../../constants';

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
          backgroundColor: colors.nobel,
        },
        container: {borderTopLeftRadius: 12, borderTopRightRadius: 12},
      }}>
      <VerticalView marginLeft={15} marginRight={15} marginBottom={15}>
        <Image
          width="100%"
          height={160}
          marginBottom={15}
          borderRadius={6}
          resizeMode="cover"
          source={{uri: getUri(image)}}
        />
        <Text textAlign="justify">{overview}</Text>
      </VerticalView>
    </RBSheet>
  );
}
