import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../constants';

import {Wrapper, Text, GlobalStyles, Poster} from '../../components';

export default function CastList(props) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.push('Person', {
          title: props.name,
          id: props.id,
        })
      }>
      <Wrapper>
        <Poster {...props} source={props.profile_path} />
      </Wrapper>

      <Text
        style={GlobalStyles.text}
        fontSize={12}
        marginTop={3}
        numberOfLines={1}
        color={colors.white}>
        {props.name}
      </Text>

      <Text
        style={GlobalStyles.text}
        fontWeight="300"
        fontSize={10}
        marginBottom={15}
        color={colors.dimGray}
        numberOfLines={1}>
        {props.character}
      </Text>
    </TouchableOpacity>
  );
}
