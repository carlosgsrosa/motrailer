import React from 'react';
import {ActivityIndicator} from 'react-native';

import {HorizontalView} from '../';

export default function Loading(props) {
  const {color, size} = props;
  return (
    <HorizontalView
      paddingTop="15px"
      paddingBottom="15px"
      justifyContent="center">
      <ActivityIndicator size={size} color={color} />
    </HorizontalView>
  );
}
