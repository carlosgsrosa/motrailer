import React from 'react';

import {splitString} from '../../util';

import {HorizontalView, Text} from '../../components';

export default function VoteAverage(props) {
  const {fontColor, voteAverage, marginRight} = props;
  return (
    <HorizontalView
      justifyContent="center"
      alignItems="center"
      marginRight={marginRight}>
      <Text fontFamily="SFProDisplay-Medium" color={fontColor} fontSize={20}>
        {splitString('.', 0, String(voteAverage))}
      </Text>
      <Text color={fontColor}>.</Text>
      <Text color={fontColor} fontFamily="SFProDisplay-Regular" fontSize={12}>
        {splitString('.', 1, String(voteAverage))}
      </Text>
    </HorizontalView>
  );
}
