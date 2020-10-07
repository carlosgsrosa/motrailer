import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../constants';

import {Wrapper, Text, GlobalStyles, Poster} from '../../components';

export default function CastList(props) {
  const navigation = useNavigation();

  const params = {
    title: props.name,
    id: props.id,
  };

  return (
    <TouchableOpacity onPress={() => navigation.push('Person', params)}>
      <Wrapper style={GlobalStyles.shadow}>
        <Poster {...props} gender={props.gender} source={props.profile_path} />
      </Wrapper>

      <Text
        style={GlobalStyles.text}
        fontSize="12px"
        marginTop="3px"
        numberOfLines={1}
        color={colors.white}>
        {props.name}
      </Text>

      <Text
        style={GlobalStyles.text}
        fontWeight="300"
        fontSize="10px"
        marginBottom="15px"
        color={colors.dimGray}
        numberOfLines={1}>
        {props.character}
      </Text>
    </TouchableOpacity>
  );
}
