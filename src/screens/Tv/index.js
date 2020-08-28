import React, {useState, useEffect} from 'react';
import {FlatList, Alert, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {getCardDimension} from '../../util';

import api, {api_key} from '../../services/api';

import {
  ScrollView,
  SafeAreaView,
  AppStatusBar,
  VerticalView,
  HorizontalView,
  Header,
  ItemSeparatorComponent,
  MovieList,
  Text,
  styles,
  LoadingModal,
  TrailerList,
  ShowMore,
} from '../../components';

const params = {
  params: {
    api_key: api_key,
    page: 1,
    include_adult: false,
    include_video: false,
    primary_release_year: 2020,
    year: 2020,
    append_to_response: 'trailers',
    sort_by: 'popularity.desc',
  },
};

export default function Movies() {
  const [movie, setMovie] = useState([]);
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  async function getDiscover() {
    try {
      setLoading(true);
      const response = await api.get('/discover/tv', params);
      setMovie(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Acorreu um erro inesperado!', error.message);
    }
  }

  async function getPopular() {
    try {
      setLoading(true);
      const response = await api.get('/trending/tv/day', params);
      setTrendingMovie(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Acorreu um erro inesperado!', error.message);
    }
  }

  function onNavigateMore() {
    navigation.navigate('TvAll');
  }

  useEffect(() => {
    getDiscover();
    getPopular();
  }, []);

  return (
    <SafeAreaView backgroundColor="#EE7429">
      <AppStatusBar style="light-content" />
      <LoadingModal visible={loading} />
      <VerticalView flex={1} backgroundColor="#fff">
        <Header title="TV" />
        <ScrollView
          bounces={false}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          <HorizontalView
            marginTop="15px"
            marginLeft="15px"
            marginRight="15px"
            justifyContent="space-between"
            alignItems="center">
            <Text fontSize="18px" fontWeight="bold" color="#666666">
              Now
            </Text>
            <TouchableOpacity onPress={() => alert('Soon')}>
              <Text fontSize="18px" fontWeight="bold" color="#666666">
                ...
              </Text>
            </TouchableOpacity>
          </HorizontalView>

          <FlatList
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            contentContainerStyle={styles.content}
            ItemSeparatorComponent={() => (
              <ItemSeparatorComponent width="5px" />
            )}
            ListFooterComponent={() => (
              <ShowMore width={140} height={210} onPress={onNavigateMore} />
            )}
            data={movie}
            keyExtractor={(_, index) => String(index)}
            renderItem={({item}) => (
              <MovieList width="140px" height="210px" data={item} />
            )}
          />

          <HorizontalView
            marginLeft="15px"
            marginRight="15px"
            justifyContent="space-between"
            alignItems="center">
            <Text fontSize="18px" fontWeight="bold" color="#666666">
              Trending
            </Text>
            <TouchableOpacity onPress={() => alert('Soon')}>
              <Text fontSize="18px" fontWeight="bold" color="#666666">
                ...
              </Text>
            </TouchableOpacity>
          </HorizontalView>

          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.content}
            numColumns={2}
            ItemSeparatorComponent={() => (
              <ItemSeparatorComponent height="15px" />
            )}
            data={trendingMovie}
            keyExtractor={(_, index) => String(index)}
            renderItem={({item}) => (
              <MovieList
                marginRight="15px"
                width={getCardDimension(15, 2)}
                height="270px"
                data={item}
              />
            )}
          />
        </ScrollView>
      </VerticalView>
    </SafeAreaView>
  );
}
