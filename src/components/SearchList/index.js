import React, {useState, useEffect} from 'react';
import {Platform, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {
  VerticalView,
  HorizontalView,
  Text,
  GlobalStyles,
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
        navigation.navigate('MovieDetail', params);
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
        return <Text numberOfLines={4}>{data.overview}</Text>;
      case 'person':
        const movies = data.known_for.map((item, index) => (
          <TouchableOpacity
            activeOpacity={0.8}
            key={String(index)}
            onPress={() => navigation.navigate('MovieDetail', {id: item.id})}>
            <Text numberOfLines={1} color="#999999" paddingTop={3}>
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
      <VerticalView style={GlobalStyles.shadow}>
        <HorizontalView>
          <Poster
            width={100}
            height={145}
            resizeMode="cover"
            borderRadius={6}
            type={data.media_type}
            source={image}
          />
          <VerticalView
            flex={1}
            paddingLeft={7}
            paddingRight={7}
            justifyContent="center"
            paddingTop={7}
            paddingBottom={7}>
            <Text fontSize={16} fontWeight="bold" numberOfLines={1}>
              {title}
            </Text>
            <Text marginBottom={Platform.OS === 'ios' ? 10 : 3} color="#b0b0b0">
              {date}
            </Text>
            <Overview />
          </VerticalView>
        </HorizontalView>
      </VerticalView>
    </TouchableOpacity>
  );
}
