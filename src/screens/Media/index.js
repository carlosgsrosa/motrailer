import React from 'react';
import {View, TouchableOpacity} from 'react-native';
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
  ImageBackground,
  AppStatusBar,
} from '../../components';

export default function Media() {
  const route = useRoute();
  const navigation = useNavigation();

  const {data, indexRef} = route.params;

  const _renderPagination = (index, total, context) => {
    return (
      <HorizontalView
        key={`horizontal-view-${index}`}
        justifyContent="center"
        paddingTop={15}
        paddingBottom={15}>
        <Text key={`render-text-${index}`} fontSize={18} fontWeight="500">
          {index + 1}/{total}
        </Text>
      </HorizontalView>
    );
  };

  return (
    <SafeAreaView backgroundColor="#FFFFFF">
      <AppStatusBar barStyle="light-content" />
      <ImageBackground
        style={{width: '100%', height: '100%'}}
        source={images.background.place_holder}>
        <VerticalView paddingLeft={15} paddingTop={15} paddingBottom={15}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              width={24}
              height={24}
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
          renderPagination={_renderPagination}>
          {data.map((item, i) => {
            return (
              <VerticalView key={`vertical-view-${i}`}>
                <Image
                  key={`media-image-${i}`}
                  resizeMode="contain"
                  style={{height: '100%', width: '100%'}}
                  source={{uri: getUri(item.file_path)}}
                />
              </VerticalView>
            );
          })}
        </Swiper>
      </ImageBackground>
    </SafeAreaView>
  );
}
