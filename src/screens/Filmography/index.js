import React, {useState, useEffect, useLayoutEffect} from 'react';
import {FlatList, Alert} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import {api, API_KEY} from '../../services/api';

import {showError, getCardWidthDimension} from '../../util';

import {
  SafeAreaView,
  MovieList,
  ItemSeparatorComponent,
  GlobalStyles,
  Loading,
  EmptyContent,
} from '../../components';

export default function Filmography() {
  const route = useRoute();
  const navigation = useNavigation();

  const personId = route.params.id;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const getMovies = async () => {
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
          with_people: personId,
          sort_by: 'primary_release_date.desc',
        },
      })
      .then((response) => {
        // console.warn('MOVIES', JSON.stringify(response.data));
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
  };

  const onAddWatchList = (movieId) => {
    Alert.alert('movieId: ' + movieId);
  };

  useEffect(() => {
    getMovies();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      tabBarLabel: `Filmography (${totalResults})`,
    });
  }, [totalResults]);

  return (
    <SafeAreaView>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        initialNumToRender={10}
        contentContainerStyle={GlobalStyles.content}
        ItemSeparatorComponent={() => <ItemSeparatorComponent height="15px" />}
        ListFooterComponent={loading && <Loading />}
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
            width={getCardWidthDimension(15, 2)}
            height="270px"
            {...item}
          />
        )}
      />
    </SafeAreaView>
  );
}
