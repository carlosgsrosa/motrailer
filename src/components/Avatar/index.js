import React, {useContext} from 'react';

import AuthContext from '../../contexts/auth';

import {images} from '../../constants';

import {Image} from '../../components';

import {AVATAR_PATH} from '../../services/api';

export default function Avatar({
  resizeMode,
  width,
  height,
  borderRadius,
  borderColor,
}) {
  const {user} = useContext(AuthContext);

  const avatar = user ? user.avatar.gravatar.hash : null;

  return (
    <Image
      style={{borderWidth: 1, borderColor: borderColor}}
      resizeMode={resizeMode}
      width={width}
      height={height}
      borderRadius={borderRadius}
      source={
        user ? {uri: AVATAR_PATH + avatar} : images.background.male_profile
      }
    />
  );
}
