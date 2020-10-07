import React from 'react';
import {TouchableOpacity, Linking} from 'react-native';

import {HorizontalView, Image} from '../';

import {images, colors} from '../../constants';

const openURL = (type, id) => {
  const media = {
    facebook: {
      url: `https://m.facebook.com/${id}`,
      source: images.icons.facebook,
    },
    instagram: {
      url: `https://www.instagram.com/${id}/`,
      source: images.icons.instagram,
    },
    twitter: {
      url: `https://twitter.com/${id}`,
      source: images.icons.twitter,
    },
  };

  return id ? (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(media[type].url);
      }}>
      <HorizontalView marginLeft="15px" marginTop="15px" marginBottom="15px">
        <Image
          height="24px"
          width="24px"
          style={{tintColor: colors.dimGray}}
          source={media[type].source}
        />
      </HorizontalView>
    </TouchableOpacity>
  ) : null;
};

export default function SocialMedia({twitter_id, facebook_id, instagram_id}) {
  return (
    <HorizontalView>
      {openURL('facebook', facebook_id)}
      {openURL('twitter', twitter_id)}
      {openURL('instagram', instagram_id)}
    </HorizontalView>
  );
}
