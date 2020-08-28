import React, {useRef} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {images, intro} from '../../constants';

import {getWindowWidth} from '../../util';

import {
  AppStatusBar,
  VerticalView,
  HorizontalView,
  Text,
  Image,
  Button,
} from '../../components';

export default function Intro() {
  const swiperRef = useRef(null);
  const navigation = useNavigation();

  function _renderTexts(index) {
    const screen = intro[index];

    return (
      <>
        <Text
          key={`title-${index}`}
          fontSize="36px"
          alignSelf="center"
          color="#fff"
          fontFamily="SFProDisplay-Bold">
          {screen.title.text}
        </Text>
        <Text
          key={`description-${index}`}
          fontSize="34px"
          alignSelf="center"
          color="#fff"
          fontFamily="SFProDisplay-Ultralight">
          {screen.description.text}
        </Text>
      </>
    );
  }

  function _renderDots(index) {
    const {dots} = intro[index];

    if (dots) {
      return dots.map((opacity, i) => (
        <Image
          key={`dots-${i}`}
          height="16px"
          width="16px"
          marginRight="10px"
          opacity={opacity}
          source={images.icons.bullet}
        />
      ));
    }
  }

  function _renderButtons(index, total) {
    const {button} = intro[index];

    if (button) {
      return (
        <Button
          backgroundColor={button.backgroundColor}
          borderWidth={button.borderWidth}
          onPress={() => {
            goToNext(index, total - 1);
          }}>
          <Text
            key={`text-button-${index}`}
            fontSize="20px"
            fontFamily="SFProDisplay-Regular"
            color="#fff">
            {button.label}
          </Text>
        </Button>
      );
    }
  }

  function goToNext(index, total) {
    if (total > index) {
      if (swiperRef) {
        swiperRef.current.scrollTo(index + 1);
      }
    } else {
      goToHome();
    }
  }

  async function goToHome() {
    try {
      await AsyncStorage.setItem('@MoTrailer:signed', 'false');
      navigation.replace('Home');
    } catch (error) {
      Alert.alert('Acorreu um erro inesperado!', error.message);
    }
  }

  function _renderItem(index, total) {
    return (
      <VerticalView style={styles.absolute}>
        {_renderTexts(index)}
        <HorizontalView marginTop="45px">{_renderDots(index)}</HorizontalView>
        {_renderButtons(index, total)}
      </VerticalView>
    );
  }

  return (
    <>
      <AppStatusBar
        translucent
        barStyle="light-content"
        backgroundColor="#EE7429"
      />
      <Swiper
        ref={swiperRef}
        renderPagination={_renderItem}
        loop={false}
        showsButtons={false}
        dot={<View />}
        activeDot={<View />}>
        {intro.map((item, index) => (
          <Image style={styles.image} key={index} source={item.image} />
        ))}
      </Swiper>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  image: {
    width: getWindowWidth(),
    flex: 1,
  },
  dot: {marginLeft: 5, marginBottom: 120},
  absolute: {
    zIndex: 1,
    bottom: 120,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
