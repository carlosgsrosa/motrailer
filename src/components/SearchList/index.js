import React, {useState, useEffect} from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  VerticalView,
  HorizontalView,
  Text,
  styles,
  Poster,
} from '../../components';

export default function SearchList({data}) {
  const navigation = useNavigation();
  const [title, setTitle] = useState(null);
  const [date, setDate] = useState(null);
  const [image, setImage] = useState(null);

  const params = {
    id: data.id,
    title: data.name,
  };

  function handleNavigation() {
    switch (data.media_type) {
      case 'movie':
        navigation.navigate('Movie', params);
        break;
      case 'tv':
        navigation.navigate('Tv', params);
        break;
      case 'person':
        navigation.navigate('Person', params);
        break;
    }
  }

  function handleInfo() {
    switch (data.media_type) {
      case 'movie':
        setTitle(data.original_title || data.title);
        setDate(data.release_date);
        setImage(data.poster_path);
        break;
      case 'tv':
        setTitle(data.original_name || data.name);
        setDate(data.first_air_date);
        setImage(data.poster_path);
        break;
      case 'person':
        setTitle(data.name);
        setDate(data.release_date);
        setImage(data.profile_path);
        break;
    }
  }

  function Overview() {
    switch (data.media_type) {
      case 'movie':
      case 'tv':
        return <Text numberOfLines={3}>{data.overview}</Text>;
      case 'person':
        const movies = data.known_for.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.6}
            key={String(index)}
            onPress={() => navigation.navigate('Movie', {id: item.id})}>
            <Text numberOfLines={1} color="#999999" paddingTop="3px">
              • {item.original_title || item.original_name}
            </Text>
          </TouchableOpacity>
        ));
        return movies;
    }
  }

  useEffect(() => {
    handleInfo();
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        handleNavigation();
      }}>
      <VerticalView style={styles.shadow}>
        <HorizontalView>
          <Poster
            resizeMode="cover"
            width="90px"
            height="121px"
            borderRadius="6px"
            type={data.media_type}
            source={image}
          />
          <VerticalView
            flex={1}
            paddingLeft="7px"
            paddingRight="7px"
            justifyContent="center"
            paddingTop="7px"
            paddingBottom="7px">
            <Text fontSize="16px" fontWeight="bold" numberOfLines={1}>
              {title}
            </Text>
            <Text
              marginBottom={Platform.OS === 'ios' ? '10px' : '3px'}
              color="#b0b0b0">
              {date}
            </Text>
            <Overview />
          </VerticalView>
        </HorizontalView>
      </VerticalView>
    </TouchableOpacity>
  );
}
