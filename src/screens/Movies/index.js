import React, {useState, useEffect, useContext} from 'react';
import {FlatList, TouchableOpacity, Alert} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import AuthContext from '../../contexts/auth';

import {showError, getCardWidthDimension, showNotifyMessage} from '../../util';

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
  GlobalStyles,
  LoadingModal,
  ShowMore,
} from '../../components';

const params = {
  params: {
    api_key: API_KEY,
    page: 1,
    sort_by: 'popularity.desc',
  },
};

export default function Movies() {
  const navigation = useNavigation();

  const {user} = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState([]);
  const [trendingMovie, setTrendingMovie] = useState([]);

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

  const addWatchList = async (media_type, media_id, watchlist) => {
    await api
      .post(
        `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${API_KEY}&session_id=${user.session_id}`,
        {
          media_type,
          media_id,
          watchlist,
        },
      )
      .then((response) => {
        showNotifyMessage(response.data.status_message);
      })
      .catch((e) => showError('addToWatchList', e.message));
  };

  const toggleWatchList = (data, origin) => {
    if (user) {
      const clone = origin === NOW ? [...movie] : [...trendingMovie];
      clone.filter((item) => {
        if (item.id === data.id) {
          item.watchlist = !item.watchlist;
          if (origin === NOW) {
            setMovie(clone);
          } else {
            setTrendingMovie(clone);
          }
          addWatchList(data.media_type, data.id, item.watchlist);
        }
      });
    } else {
      Alert.alert(
        'Atenção!',
        'Deseja adicionar este item a uma lista? Favor efetue Login!',
        [
          {text: 'CANCEL', onPress: () => {}, style: 'cancel'},
          {text: 'LOGIN', onPress: () => navigation.navigate('Profile')},
        ],
      );
    }
  };

  useEffect(() => {
    getMoviePlaying();
    getTrendingMovie();
  }, []);

  if (loading) {
    return <LoadingModal visible={loading} />;
  }

  return (
    <SafeAreaView backgroundColor="#fff">
      <AppStatusBar barStyle="dark-content" />
      <VerticalView flex={1} backgroundColor="#fff">
        <Header title="MOVIES" backgroundColor="#fff" borderColor="#EE7429" />
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
            <Text fontSize="22px" fontFamily="SFProDisplay-Bold" color="#666">
              Now
            </Text>
            <TouchableOpacity onPress={() => alert('Soon')}>
              <Text fontSize="22px" fontFamily="SFProDisplay-Bold" color="#666">
                ...
              </Text>
            </TouchableOpacity>
          </HorizontalView>

          <FlatList
            bounces={false}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            contentContainerStyle={GlobalStyles.content}
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
                media_type="movie"
                {...item}
              />
            )}
          />

          <HorizontalView
            marginLeft="15px"
            marginRight="15px"
            justifyContent="space-between"
            alignItems="center">
            <Text fontSize="22px" fontFamily="SFProDisplay-Bold" color="#666">
              Trending
            </Text>
            <TouchableOpacity onPress={() => alert('Soon')}>
              <Text fontSize="22px" fontFamily="SFProDisplay-Bold" color="#666">
                ...
              </Text>
            </TouchableOpacity>
          </HorizontalView>

          <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={GlobalStyles.content}
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
                width={getCardWidthDimension(15, 2)}
                height="270px"
                origin="trending"
                media_type="movie"
                {...item}
              />
            )}
          />
        </ScrollView>
      </VerticalView>
    </SafeAreaView>
  );
}
