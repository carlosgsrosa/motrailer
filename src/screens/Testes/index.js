import React from 'react';
import {View, Text, Platform, StatusBar} from 'react-native';
import Animated from 'react-native-reanimated';

const images = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
  {
    id: 6,
  },
  {
    id: 7,
  },
];

function getRandomColor() {
  return (
    'rgb(' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ',' +
    Math.floor(Math.random() * 256) +
    ')'
  );
}

const HEADER_HEIGHT =
  Platform.OS === 'ios' ? 115 : 70 + StatusBar.currentHeight;

// import Toggle from './Toggle';
import WebViewInjection from './WebViewInjection';

export default function Testes() {
  const scrollY = new Animated.Value(0);
  const diffClampScrollY = Animated.diffClamp(scrollY, 0, HEADER_HEIGHT);
  const headerY = Animated.interpolate(diffClampScrollY, {
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
  });

  return (
    <WebViewInjection />
    // <Toggle />
    // <View style={{flex: 1}}>
    //   <Animated.View
    //     style={{
    //       position: 'absolute',
    //       left: 0,
    //       top: 0,
    //       right: 0,
    //       height: HEADER_HEIGHT,
    //       backgroundColor: 'grey',
    //       zIndex: 1,
    //       elevation: 1,
    //       transform: [{translateY: headerY}],
    //     }}
    //   />
    //   <Animated.ScrollView
    //     bounces={false}
    //     style={{paddingTop: HEADER_HEIGHT}}
    //     scrollEventThrottle={16}
    //     onScroll={Animated.event([
    //       {
    //         nativeEvent: {contentOffset: {y: scrollY}},
    //       },
    //       {useNativeDriver: false},
    //     ])}>
    //     {images.map((image) => (
    //       <View
    //         key={image.id}
    //         style={{
    //           flex: 1,
    //           alignItems: 'center',
    //           justifyContent: 'center',
    //           height: 400,
    //           margin: 20,
    //           borderRadius: 10,
    //           backgroundColor: getRandomColor(),
    //         }}>
    //         <Text style={{fontSize: 50, color: getRandomColor()}}>
    //           {image.id}
    //         </Text>
    //       </View>
    //     ))}
    //   </Animated.ScrollView>
    // </View>
  );
}
