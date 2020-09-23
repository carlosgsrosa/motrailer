import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {images} from '../../constants';

import {HorizontalView, Text, Image, Avatar} from '../../components';

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
          {backgroundColor: title === 'PROFILE' ? '#ffffff' : '#EE7429'},
        ]}
        onPress={() => handleNavigation()}>
        <Image
          style={{tintColor: title === 'PROFILE' ? '#EE7429' : '#ffffff'}}
          width="24px"
          height="24px"
          resizeMode="contain"
          source={getImageSource()}
        />
      </TouchableOpacity>
    );
  };

  return (
    <HorizontalView
      alignItems="center"
      paddingLeft="15px"
      paddingTop="15px"
      paddingRight="15px"
      paddingBottom="5px"
      backgroundColor={backgroundColor}
      justifyContent="space-between">
      <Text color={props.color} fontSize="24px" fontFamily="SFProDisplay-Bold">
        {title}
      </Text>
      <HorizontalView>
        <TouchableOpacity
          style={{marginRight: 5}}
          onPress={() => navigation.navigate('Profile')}>
          <Avatar
            width="40px"
            height="40px"
            borderRadius="20px"
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
