import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {images} from '../../constants';

import {HorizontalView, Image, Avatar} from '../../components';

export default function Header(props) {
  const {title, backgroundColor, borderColor} = props;

  const navigation = useNavigation();

  const handleNavigation = () => {
    switch (title) {
      case 'MOVIES':
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
      case 'MOVIES':
      case 'TV':
        return images.icons.search;
      case 'PROFILE':
        return images.icons.settings;
    }
  };

  const SearchBar = () => {
    return (
      <TouchableOpacity
        style={[
          styles.button,
          {backgroundColor: title === 'PROFILE' ? '#FFFFFF' : '#EE7429'},
        ]}
        onPress={() => handleNavigation()}>
        <Image
          style={{tintColor: title === 'PROFILE' ? '#EE7429' : '#FFFFFF'}}
          width={24}
          height={24}
          resizeMode="contain"
          source={getImageSource()}
        />
      </TouchableOpacity>
    );
  };

  return (
    <HorizontalView
      {...props}
      alignItems="center"
      paddingLeft={15}
      paddingTop={15}
      paddingRight={15}
      paddingBottom={5}
      backgroundColor={backgroundColor}
      justifyContent="flex-end">
      <HorizontalView>
        <TouchableOpacity
          style={{marginRight: 5}}
          onPress={() => navigation.navigate('Profile')}>
          <Avatar
            width={40}
            height={40}
            borderRadius={20}
            resizeMode="cover"
            borderColor={borderColor}
          />
        </TouchableOpacity>
        <SearchBar />
      </HorizontalView>
    </HorizontalView>
  );
}

const styles = StyleSheet.create({
  button: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: '#EE7429',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
