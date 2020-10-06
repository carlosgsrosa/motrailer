import React from 'react';
import {TouchableOpacity} from 'react-native';

import {VerticalView, Text, GlobalStyles} from '../../components';

export default function ShowMore(props) {
  const {onPress, width, height} = props;

  return (
    <TouchableOpacity
      style={[{marginLeft: 5}, GlobalStyles.shadow]}
      onPress={onPress}
      activeOpacity={0.8}>
      <VerticalView
        backgroundColor="#F5D547"
        borderRadius="6px"
        justifyContent="center"
        alignItems="center"
        style={{height: height, width: width}}>
        <Text color="#FFFFFF" fontWeight="700" fontSize="20px">
          MORE
        </Text>
      </VerticalView>
    </TouchableOpacity>
  );
}
