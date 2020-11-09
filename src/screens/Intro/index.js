import React, {useRef} from 'react';
import {StyleSheet, Platform, View} from 'react-native';
import Swiper from 'react-native-swiper';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

import {images, intro, colors} from '../../constants';

import {showError, getWindowWidth} from '../../util';

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
          color={colors.white}
          fontFamily="SFProDisplay-Bold">
          {screen.title.text}
        </Text>
        <Text
          key={`description-${index}`}
          fontSize="34px"
          alignSelf="center"
          color={colors.white}
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
            color={colors.white}>
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
    await AsyncStorage.setItem('@MoTrailer:firstTime', 'false')
      .then(() => navigation.replace('Home'))
      .catch((e) => showError(e.message));
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
      <AppStatusBar translucent barStyle="light-content" />
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
    backgroundColor: colors.black,
  },
  image: {
    width: getWindowWidth(),
    flex: 1,
  },
  dot: {marginLeft: 5, marginBottom: 120},
  absolute: {
    zIndex: 1,
    bottom: Platform.OS === 'ios' ? 30 : 15,
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
