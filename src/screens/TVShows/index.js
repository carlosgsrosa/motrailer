import React, {useState, useEffect, useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import {api, API_KEY} from '../../services/api';

import {showError, getCardWidthDimension} from '../../util';

import {colors} from '../../constants';

import {
  SafeAreaView,
  MovieList,
  ItemSeparatorComponent,
  GlobalStyles,
  Loading,
  EmptyContent,
} from '../../components';

export default function TVShows() {
  const route = useRoute();
  const navigation = useNavigation();

  const personId = route.params.id;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const getMovies = () => {
    setLoading(true);

    if (totalPages && page > totalPages) {
      setLoading(false);
      return;
    }

    // https://www.themoviedb.org/person/6885-charlize-theron/remote/credits?credit_media_type=tv

    api
      .get('/discover/tv', {
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

  useEffect(() => getMovies(), []);

  useLayoutEffect(() => {
    navigation.setOptions({tabBarLabel: `TV Shows (${totalResults})`});
  }, [totalResults]);

  return (
    <SafeAreaView backgroundColor={colors.swamp}>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        initialNumToRender={10}
        contentContainerStyle={GlobalStyles.content}
        ItemSeparatorComponent={() => <ItemSeparatorComponent height="15px" />}
        ListFooterComponent={loading && <Loading />}
        onEndReached={getMovies}
        onEndReachedThreshold={0.8}
        data={data}
        keyExtractor={(_, index) => String(index)}
        ListEmptyComponent={() => (
          <EmptyContent message="Nenhum filme encontrado!" />
        )}
        renderItem={({item}) => (
          <MovieList
            borderRadius="6px"
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
