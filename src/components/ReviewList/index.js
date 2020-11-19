import React, {useState} from 'react';
import {Platform} from 'react-native';

import {colors} from '../../constants';

import {
  VerticalView,
  HorizontalView,
  Text,
  GlobalStyles,
} from '../../components';

export default function ReviewList(props) {
  const {author, content} = props;
  const [numberOfLines, setNumberOfLines] = useState(10);

  const toggleNumberOfLines = () =>
    setNumberOfLines(numberOfLines === 10 ? 0 : 10);

  return (
    <VerticalView style={GlobalStyles.shadow}>
      <HorizontalView>
        <VerticalView
          flex={1}
          paddingLeft={7}
          paddingRight={7}
          justifyContent="center"
          paddingTop={7}
          paddingBottom={7}>
          <Text
            color={colors.veryLightGrey}
            fontSize={16}
            fontWeight="bold"
            numberOfLines={1}>
            A review by {author}
          </Text>
          <Text
            onPress={toggleNumberOfLines}
            numberOfLines={numberOfLines}
            marginBottom={Platform.OS === 'ios' ? 10 : 3}
            color={colors.nobel}>
            {content}
          </Text>
        </VerticalView>
      </HorizontalView>
    </VerticalView>
  );
}
