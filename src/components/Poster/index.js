import React from 'react';
import {StyleSheet} from 'react-native';

import {getUri, getStreamingSource} from '../../util';

import {images, FEMALE_GENDER} from '../../constants';

import {ImageBackground, HorizontalView, Image} from '../../components';

export default function Poster({
  resizeMode,
  width,
  height,
  borderRadius,
  source,
  gender,
  type,
  note,
}) {
  const getImage = () => {
    if (type === 'person') {
      if (gender !== null) {
        return gender === FEMALE_GENDER
          ? images.background.female_profile
          : images.background.male_profile;
      }
    }
    return images.background.place_holder;
  };

  const StreamingSource = () => {
    if (!note) {
      return null;
    }

    return (
      <HorizontalView
        justifyContent="center"
        alignItems="center"
        style={styles.horizontalView}>
        <Image
          borderRadius="3px"
          resizeMode="contain"
          width="50px"
          height="27.19px"
          source={getStreamingSource(note)}
        />
      </HorizontalView>
    );
  };

  return (
    <ImageBackground
      style={{overflow: 'hidden', borderRadius: 6}}
      width={width}
      height={height}
      resizeMode="cover"
      source={images.background.place_holder}>
      <Image
        resizeMode={resizeMode}
        width={width}
        height={height}
        source={source ? {uri: getUri(source)} : getImage()}
      />
      <StreamingSource />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  horizontalView: {
    paddingLeft: 3,
    paddingTop: 3,
    paddingRight: 3,
    paddingBottom: 3,
  },
});
