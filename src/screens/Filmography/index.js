import React, {useState, useEffect, useLayoutEffect} from 'react';
import {FlatList, Alert} from 'react-native';
import {useRoute} from '@react-navigation/native';

import api, {api_key} from '../../services/api';

import {getCardDimension} from '../../util';

import {
  SafeAreaView,
  AppStatusBar,
  MovieList,
  ItemSeparatorComponent,
  styles,
  Loading,
  Text,
} from '../../components';

export default function Filmography(props) {
  const route = useRoute();
  const personId = route.params.id;

  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  async function getMovies() {
    setLoading(true);

    if (totalPages && page > totalPages) {
      setLoading(false);
      return;
    }

    await api
      .get('/discover/movie', {
        params: {
          page: page,
          api_key: api_key,
          with_cast: personId,
          sort_by: 'release_date.desc',
        },
      })
      .then((response) => {
        setData([...data, ...response.data.results]);
        setPage(response.data.page + 1);
        setTotalPages(response.data.total_pages);
        setTotalResults(response.data.total_results);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Acorreu um erro inesperado!', error.message);
      });
  }

  const onAddWatchList = (movieId) => {
    alert('movieId: ' + movieId);
  };

  useEffect(() => {
    getMovies();
  }, []);
  return (
    <SafeAreaView>
      <AppStatusBar />
      <FlatList
        showsVerticalScrollIndicator={false}
        numColumns={2}
        contentContainerStyle={styles.content}
        ItemSeparatorComponent={() => <ItemSeparatorComponent height="15px" />}
        ListFooterComponent={
          loading && <Loading size="large" color="#ED7329" />
        }
        onEndReached={getMovies}
        onEndReachedThreshold={1}
        data={data}
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
    </SafeAreaView>
  );
}
