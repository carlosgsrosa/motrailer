import React from 'react';
import {StyleSheet} from 'react-native';

import {getUri, getStreamingSource} from '../../util';

import {images, FEMALE} from '../../constants';

import {
  VerticalView,
  ImageBackground,
  HorizontalView,
  Image,
} from '../../components';

export default function Poster(props) {
  const {
    width,
    height,
    source,
    resizeMode,
    gender,
    type,
    note,
    borderRadius,
  } = props;

  const getImage = () => {
    if (type === 'person') {
      if (gender !== null) {
        return gender === FEMALE
          ? images.background.female_profile
          : images.background.male_profile;
      }
    }
    return images.background.place_holder;
  };

  const StreamingSource = () => {
    const {horizontalView} = styles;

    if (!getStreamingSource(note)) {
      return null;
    }

    return (
      <HorizontalView
        justifyContent="center"
        alignItems="center"
        style={horizontalView}>
        <Image
          resizeMode="contain"
          width="50px"
          height="27.19px"
          source={getStreamingSource(note)}
        />
      </HorizontalView>
    );
  };

  return (
    <VerticalView borderRadius={borderRadius} style={styles.overflow}>
      <ImageBackground
        resizeMode="cover"
        width={width}
        height={height}
        source={images.background.place_holder}>
        <Image
          borderRadius={borderRadius}
          resizeMode={resizeMode}
          width={width}
          height={height}
          source={source ? {uri: getUri(source)} : getImage()}
        />
      </ImageBackground>
      <StreamingSource />
    </VerticalView>
  );
}

const styles = StyleSheet.create({
  horizontalView: {
    paddingLeft: 3,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 3,
  },
  overflow: {overflow: 'hidden'},
});
