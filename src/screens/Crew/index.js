import React, {useLayoutEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import {getCardWidthDimension, getCardHeightDimension} from '../../util';

import {colors} from '../../constants';

import {
  SafeAreaView,
  VerticalView,
  Wrapper,
  ItemSeparatorComponent,
  Text,
  GlobalStyles,
  Poster,
} from '../../components';

export default function Crew() {
  const route = useRoute();
  const navigation = useNavigation();

  const data = route.params.data.crew;

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarLabel: `Crew (${data.length})`,
    });
  }, []);

  return (
    <SafeAreaView backgroundColor={colors.swamp}>
      <VerticalView flex={1}>
        <FlatList
          bounces={false}
          numColumns={4}
          showsVerticalScrollIndicator={false}
          data={data}
          contentContainerStyle={GlobalStyles.content}
          ItemSeparatorComponent={() => <ItemSeparatorComponent width="5px" />}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item}) => (
            <TouchableOpacity
              style={{marginRight: 15}}
              onPress={() =>
                navigation.push('Person', {title: item.name, id: item.id})
              }>
              <Wrapper style={GlobalStyles.shadow}>
                <Poster
                  width={getCardWidthDimension(15, 3)}
                  height={getCardHeightDimension(15, 2)}
                  borderRadius="6px"
                  gender={item.gender}
                  type="person"
                  resizeMode="cover"
                  source={item.profile_path}
                />
              </Wrapper>

              <Text
                style={GlobalStyles.text}
                color={colors.white}
                fontSize="12px"
                marginTop="3px"
                numberOfLines={1}>
                {item.name}
              </Text>

              <Text
                style={GlobalStyles.text}
                fontWeight="300"
                fontSize="11px"
                marginBottom="15px"
                color={colors.dimGray}
                numberOfLines={1}>
                {item.job}
              </Text>
            </TouchableOpacity>
          )}
        />
      </VerticalView>
    </SafeAreaView>
  );
}
