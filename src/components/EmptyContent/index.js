import React from 'react';

import {VerticalView, Text} from '../';

export default function EmptyContent({image, message}) {
  return (
    <VerticalView flex={1}>
      {/* <Image /> */}
      <Text>{message}</Text>
    </VerticalView>
  );
}
