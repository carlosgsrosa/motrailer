import React from 'react';

import {getUri} from '../../util';

import {images, FEMALE_GENDER} from '../../constants';

import {Image} from '../../components';

export default function Poster({
  resizeMode,
  width,
  height,
  borderRadius,
  source,
  gender,
  type,
}) {
  function getImage() {
    if (type === 'person') {
      if (gender !== null) {
        return gender === FEMALE_GENDER
          ? images.background.female_profile
          : images.background.male_profile;
      }
    }
    return images.background.place_holder;
  }

  return (
    <Image
      resizeMode={resizeMode}
      width={width}
      height={height}
      borderRadius={borderRadius}
      source={source ? {uri: getUri(source)} : getImage()}
    />
  );
}
