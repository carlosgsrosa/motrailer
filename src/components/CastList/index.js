import React from 'react';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {Wrapper, Text, styles, Poster} from '../../components';

export default function CastList({data}) {
  const navigation = useNavigation();

  const params = {
    title: data.name,
    id: data.id,
    screen: 'Person',
  };

  return (
    <TouchableOpacity onPress={() => navigation.push('Person', params)}>
      <Wrapper style={styles.shadow}>
        <Poster
          resizeMode="cover"
          width="90px"
          height="131px"
          borderRadius="6px"
          gender={data.gender}
          type="person"
          source={data.profile_path}
        />
      </Wrapper>

      <Text
        style={styles.text}
        fontSize="12px"
        marginTop="3px"
        numberOfLines={1}>
        {data.name}
      </Text>

      <Text
        style={styles.text}
        fontWeight="300"
        fontSize="11px"
        marginBottom="15px"
        color="#656565"
        numberOfLines={1}>
        {data.character}
      </Text>
    </TouchableOpacity>
  );
}
