import React, {useLayoutEffect} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import {
  SafeAreaView,
  VerticalView,
  HorizontalView,
  ItemSeparatorComponent,
  Text,
  GlobalStyles,
  Poster,
} from '../../components';

export default function Cast() {
  const route = useRoute();
  const navigation = useNavigation();

  const data = route.params.data.cast;

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarLabel: `Cast (${data.length})`,
    });
  }, []);

  return (
    <SafeAreaView>
      <VerticalView flex={1}>
        <FlatList
          bounces={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={GlobalStyles.content}
          ItemSeparatorComponent={() => (
            <ItemSeparatorComponent height="15px" />
          )}
          data={data}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item}) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('Person', {title: item.name, id: item.id})
              }>
              <VerticalView key={item.id} style={GlobalStyles.shadow}>
                <HorizontalView>
                  <Poster
                    width="100px"
                    height="145px"
                    resizeMode="cover"
                    borderRadius="6px"
                    type="person"
                    source={item.profile_path}
                  />
                  <VerticalView
                    flex={1}
                    paddingLeft="15px"
                    paddingTop="15px"
                    paddingRight="15px"
                    paddingBottom="15px">
                    <Text fontSize="16px" fontWeight="bold">
                      {item.name}
                    </Text>
                    <Text color="#b0b0b0">{item.character}</Text>
                  </VerticalView>
                </HorizontalView>
              </VerticalView>
            </TouchableOpacity>
          )}
        />
      </VerticalView>
    </SafeAreaView>
  );
}
