import React from 'react';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Swiper from 'react-native-swiper';
import {useRoute, useNavigation} from '@react-navigation/native';

import {images} from '../../constants';

import {getUri} from '../../util';

import {
  SafeAreaView,
  VerticalView,
  HorizontalView,
  Text,
  Image,
} from '../../components';

export default function Media() {
  const route = useRoute();
  const navigation = useNavigation();

  const {data, indexRef} = route.params;

  const renderPagination = (index, total, context) => {
    return (
      <HorizontalView
        key={`horizontal-view-${index}`}
        justifyContent="center"
        paddingTop="15px"
        paddingBottom="15px">
        <Text
          key={`render-text-${index}`}
          fontSize="18px"
          fontWeight="500"
          color="#FFFFFF">
          {index + 1}/{total}
        </Text>
      </HorizontalView>
    );
  };

  return (
    <SafeAreaView flex={1} backgroundColor="#EE7429">
      <VerticalView paddingLeft="15px" paddingTop="15px" paddingBottom="15px">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={{tintColor: '#FFFFFF'}}
            width="24px"
            height="24px"
            resizeMode="contain"
            source={images.icons.close}
          />
        </TouchableOpacity>
      </VerticalView>
      <Swiper
        loop={false}
        index={indexRef}
        dot={<View />}
        activeDot={<View />}
        renderPagination={renderPagination}>
        {data.map((item, i) => {
          return (
            <VerticalView key={`vertical-view-${i}`}>
              <Image
                resizeMode="contain"
                style={{height: '100%', width: '100%'}}
                key={`Image-${i}`}
                source={{uri: getUri(item.file_path)}}
              />
            </VerticalView>
          );
        })}
      </Swiper>
    </SafeAreaView>
  );
}
