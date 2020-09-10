import React, {useContext} from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {THUMBNAIL_PATH} from '../../services/api';

import AuthContext from '../../contexts/auth';

import {images} from '../../constants';

import {HorizontalView, Text, Image} from '../../components';

export default function Header(props) {
  const {title} = props;

  const {user} = useContext(AuthContext);

  const navigation = useNavigation();

  const handleNavigation = () => {
    switch (title) {
      case 'FILMES':
      case 'TV':
        navigation.navigate('Search');
        break;
      case 'PROFILE':
        navigation.navigate('Settings');
        break;
    }
  };

  const getImageSource = () => {
    switch (title) {
      case 'FILMES':
      case 'TV':
        return images.icons.search;
      case 'PROFILE':
        return images.icons.settings;
    }
  };

  const Avatar = () => {
    if (user && title !== 'PROFILE') {
      const avatar = user ? user.avatar.gravatar.hash : null;
      return (
        <TouchableOpacity
          style={[styles.button, {marginRight: 5}]}
          onPress={() => navigation.navigate('Profile')}>
          <Image
            width="39px"
            height="39px"
            borderRadius="19.5px"
            resizeMode="contain"
            source={{uri: THUMBNAIL_PATH + avatar}}
          />
        </TouchableOpacity>
      );
    } else {
      return null;
    }
  };

  return (
    <HorizontalView
      alignItems="center"
      paddingLeft="15px"
      paddingTop="15px"
      paddingRight="15px"
      paddingBottom="5px"
      backgroundColor="#EE7429"
      justifyContent="space-between">
      <Text color="#fff" fontSize="24px" fontFamily="SFProDisplay-Bold">
        {title}
      </Text>
      <HorizontalView>
        <Avatar />
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleNavigation()}>
          <Image
            style={{tintColor: '#EE7429'}}
            width="24px"
            height="24px"
            resizeMode="contain"
            source={getImageSource()}
          />
        </TouchableOpacity>
      </HorizontalView>
    </HorizontalView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 40,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
