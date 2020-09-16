import React, {useState} from 'react';
import {Platform} from 'react-native';

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
          paddingLeft="7px"
          paddingRight="7px"
          justifyContent="center"
          paddingTop="7px"
          paddingBottom="7px">
          <Text
            color="#666"
            fontSize="16px"
            fontWeight="bold"
            numberOfLines={1}>
            A review by {author}
          </Text>
          <Text
            onPress={toggleNumberOfLines}
            numberOfLines={numberOfLines}
            marginBottom={Platform.OS === 'ios' ? '10px' : '3px'}
            color="#999">
            {content}
          </Text>
        </VerticalView>
      </HorizontalView>
    </VerticalView>
  );
}
