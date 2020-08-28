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

const Media = () => {
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
          color="#fff">
          {index + 1}/{total}
        </Text>
      </HorizontalView>
    );
  };

  return (
    <SafeAreaView flex={1} backgroundColor="#EE7429">
      <VerticalView
        alignItems="flex-end"
        paddingRight="15px"
        paddingTop="15px"
        paddingBottom="15px">
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Image
            style={{tintColor: '#EE7429'}}
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
};

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Media;
