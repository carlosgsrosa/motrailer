import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {images} from '../../constants';

import {HorizontalView, Text, Image} from '../../components';

export default function Header(props) {
  const {title} = props;
  const navigation = useNavigation();

  function handleNavigation() {
    switch (title) {
      case 'MOVIE':
      case 'TV':
        navigation.navigate('Search');
        break;
      case 'PROFILE':
        navigation.navigate('Settings');
        break;
    }
  }

  function getImageSource() {
    switch (title) {
      case 'MOVIE':
      case 'TV':
        return images.icons.search;
      case 'PROFILE':
        return images.icons.settings;
    }
  }

  return (
    <HorizontalView
      alignItems="center"
      paddingLeft="15px"
      paddingTop="15px"
      paddingRight="15px"
      paddingBottom="15px"
      backgroundColor="#EE7429"
      justifyContent="space-between">
      <Text color="#fff" fontSize="24px" fontFamily="SFProDisplay-Bold">
        {title}
      </Text>
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
  );
}

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
