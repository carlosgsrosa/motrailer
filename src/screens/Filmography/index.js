import React, {useState, useEffect} from 'react';
import {FlatList, Alert} from 'react-native';
import {useRoute} from '@react-navigation/native';

import api, {API_KEY} from '../../services/api';

import {showError, getCardDimension} from '../../util';

import {
  SafeAreaView,
  AppStatusBar,
  MovieList,
  ItemSeparatorComponent,
  styles,
  Loading,
  EmptyContent,
} from '../../components';

export default function Filmography(props) {
  const route = useRoute();
  const personId = route.params.id;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
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
          api_key: API_KEY,
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
        showError(error.message);
      });
  }

  const onAddWatchList = (movieId) => {
    Alert.alert('movieId: ' + movieId);
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
        ListEmptyComponent={() => (
          <EmptyContent message="Nenhum filme encontrado!" />
        )}
        renderItem={({item}) => (
          <MovieList
            onAddWatchList={onAddWatchList}
            marginRight="15px"
            width={getCardDimension(15, 2)}
            height="270px"
            {...item}
          />
        )}
      />
    </SafeAreaView>
  );
}
