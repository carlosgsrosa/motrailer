import React, {useState, useEffect, useContext} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useAsyncStorage} from '@react-native-community/async-storage';

import AuthContext from '../../contexts/auth';

import {showError, getCardDimension} from '../../util';

import api, {API_KEY} from '../../services/api';

const NOW = 'now';

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
  ShowMore,
} from '../../components';

const params = {
  params: {
    api_key: API_KEY,
    page: 1,
    include_adult: false,
    primary_release_year: 2020,
    year: 2020,
    append_to_response: 'trailers',
    sort_by: 'popularity.desc',
  },
};

export default function Movies() {
  const navigation = useNavigation();
  const {user} = useContext(AuthContext);

  const {getItem, setItem} = useAsyncStorage('@MoTrailer:watchList');

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [watchList, setWatchList] = useState([]);

  const getMoviePlaying = async () => {
    setLoading(true);
    await api
      .get('/movie/now_playing', params)
      .then((response) => {
        setMovie(response.data.results);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError('getMoviePlaying', e.message);
      });
  };

  const getTrendingMovie = async () => {
    setLoading(true);
    await api
      .get('/trending/movie/day', params)
      .then((response) => {
        setTrendingMovie(response.data.results);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError('getTrendingMovie', e.message);
      });
  };

  const onNavigateMore = () => {
    navigation.navigate('AllMovies');
  };

  const toggleWatchList = (data, origin) => {
    const clone = origin === NOW ? [...movie] : [...trendingMovie];
    clone.filter((item) => {
      if (item.id === data.id) {
        item.favorite = !item.favorite;
        if (origin === NOW) {
          setMovie(clone);
        } else {
          setTrendingMovie(clone);
        }
        const allMovieSections = [...movie, ...trendingMovie];
        saveLocalWatchList(allMovieSections.filter((a) => a.favorite));
      }
    });
  };

  const saveLocalWatchList = async (data) => {
    try {
      await setItem(JSON.stringify(data));
      console.log('Salvo com sucesso!');
    } catch (e) {
      setLoading(false);
      showError('saveLocalWatchList', e.message);
    }
  };

  const getLocalWatchList = async () => {
    setLoading(true);
    await getItem()
      .then((value) => {
        setWatchList(JSON.parse(value));
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError(e.message);
      });
  };

  useEffect(() => {
    getLocalWatchList();
    getMoviePlaying();
    getTrendingMovie();
  }, []);

  if (loading) {
    return <LoadingModal visible={loading} />;
  }

  return (
    <SafeAreaView backgroundColor="#EE7429">
      <AppStatusBar style="light-content" />

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
                onPress={toggleWatchList}
                width="140px"
                height="210px"
                origin="now"
                {...item}
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
                onPress={toggleWatchList}
                marginRight="15px"
                width={getCardDimension(15, 2)}
                height="270px"
                origin="trending"
                {...item}
              />
            )}
          />
        </ScrollView>
      </VerticalView>
    </SafeAreaView>
  );
}
