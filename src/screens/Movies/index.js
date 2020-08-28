import React, {useState, useEffect} from 'react';
import {FlatList, Alert, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-community/async-storage';

import {getCardDimension} from '../../util';

import api, {api_key} from '../../services/api';

import {fonts} from '../../constants';

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
  const navigation = useNavigation();
  const {getItem, setItem} = useAsyncStorage('@MoTrailer:watchList');

  const [movie, setMovie] = useState([]);
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [watchList, setWatchList] = useState([]);

  const getMoviePlaying = async () => {
    try {
      setLoading(true);
      const response = await api.get('/movie/now_playing', params);
      setMovie(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Acorreu um erro inesperado!', error.message);
    }
  };

  const getTredingMovie = async () => {
    try {
      setLoading(true);
      const response = await api.get('/trending/movie/day', params);
      setTrendingMovie(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Acorreu um erro inesperado!', error.message);
    }
  };

  const onNavigateMore = () => {
    navigation.navigate('AllMovies');
  };

  const onAddWatchList = async (data) => {
    await getItem()
      .then((value) => {
        const isMoviePrevAdded =
          watchList.filter((m) => m.id === data.id).length > 0 ? true : false;

        if (isMoviePrevAdded) {
          Alert.alert(
            'Whatchlist',
            `Filme ${data.original_title} ja se encontra na sua lista!`,
          );
          return;
        }

        watchList.push(data);
        saveLocalWatchList();
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Ocorreu um erro ao recuperar dados!', error.message);
      });
  };

  const getLocalWatchList = async () => {
    const value = await getItem();
    console.log(value);
    if (value !== null) {
      setWatchList(JSON.parse(value));
    }
  };

  const saveLocalWatchList = async () => {
    await setItem(JSON.stringify(watchList)).then(
      () => console.warn('Movie adicionado a sua Whatchlist!'),
      setLoading(false),
    );
  };

  useEffect(() => {
    getLocalWatchList();
    getMoviePlaying();
    getTredingMovie();
  }, []);

  return (
    <SafeAreaView backgroundColor="#EE7429">
      <AppStatusBar style="light-content" />
      <LoadingModal visible={loading} />
      <VerticalView flex={1} backgroundColor="#fff">
        <Header title="MOVIE" />
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
            <Text
              fontSize="18px"
              fontFamily="SFProDisplay-Bold"
              color="#666666">
              Now
            </Text>
            <TouchableOpacity onPress={() => alert('Soon')}>
              <Text
                fontSize="18px"
                fontFamily="SFProDisplay-Bold"
                color="#666666">
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
              <MovieList
                onAddWatchList={onAddWatchList}
                width="140px"
                height="210px"
                data={item}
              />
            )}
          />

          <HorizontalView
            marginLeft="15px"
            marginRight="15px"
            justifyContent="space-between"
            alignItems="center">
            <Text
              fontSize="18px"
              fontFamily="SFProDisplay-Bold"
              color="#666666">
              Trending
            </Text>
            <TouchableOpacity onPress={() => alert('Soon')}>
              <Text
                fontSize="18px"
                fontFamily="SFProDisplay-Bold"
                color="#666666">
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
                onAddWatchList={onAddWatchList}
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
