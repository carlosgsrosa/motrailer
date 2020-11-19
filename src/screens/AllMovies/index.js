import React, {useState, useEffect, useLayoutEffect} from 'react';
import {FlatList} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import {api, API_KEY} from '../../services/api';

import {
  showError,
  getCardWidthDimension,
  getCardHeightDimension,
} from '../../util';

import {colors} from '../../constants';

import {
  SafeAreaView,
  MovieList,
  TvList,
  ItemSeparatorComponent,
  GlobalStyles,
  Loading,
  EmptyContent,
} from '../../components';

export default function AllMovies() {
  const route = useRoute();
  const navigation = useNavigation();

  const endpoint = route.params.endpoint;
  const title = route.params.title;
  const type = route.params.type;

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const params = {
    params: {
      api_key: API_KEY,
      page: page,
      sort_by: 'popularity.desc',
    },
  };

  const getMovies = async () => {
    setLoading(true);

    if (totalPages && page > totalPages) {
      setLoading(false);
      return;
    }

    await api
      .get(endpoint, params)
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
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title,
    });
  }, []);

  // const Genre = () => {
  //   return (
  //     <HorizontalView>
  //       <FlatList
  //         showsHorizontalScrollIndicator={false}
  //         showsVerticalScrollIndicator={false}
  //         horizontal
  //         contentContainerStyle={styles.flatListContainer}
  //         ItemSeparatorComponent={() => <ItemSeparatorComponent width={3} />}
  //         data={movieGenre}
  //         keyExtractor={(_, index) => String(index)}
  //         renderItem={({item}) => <StringList data={item} />}
  //       />
  //     </HorizontalView>
  //   );
  // };

  // const getGenre = async () => {
  //   setLoading(true);
  //   await api
  //     .get('/genre/movie/list')
  //     .then((response) => {
  //       response.data.genres.push({id: 0, name: 'All'});
  //       setMovieGenre(response.data.genres.sort((a, b) => a.id - b.id));
  //       setLoading(false);
  //     })
  //     .catch((e) => {
  //       setLoading(false);
  //       showError('getGenre', e.message);
  //     });
  // };

  // const StringList = ({data}) => {
  //   return (
  //     <TouchableOpacity>
  //       <HorizontalView
  //         alignItems="center"
  //         justifyContent="center"
  //         borderRadius={40}
  //         paddingTop={3}
  //         paddingLeft={10}
  //         paddingBottom={3}
  //         paddingRight={10}
  //         backgroundColor="#CCCCCC">
  //         <Text fontWeight="300" fontSize={15}>
  //           {data.name}
  //         </Text>
  //       </HorizontalView>
  //     </TouchableOpacity>
  //   );
  // };

  useEffect(() => {
    // getGenre();
    getMovies();
  }, []);

  const Item = (item) => {
    if (type === 'tv') {
      return (
        <TvList
          // onAddWatchList={onAddWatchList}
          borderRadius={6}
          showLabels={false}
          marginRight={15}
          width={getCardWidthDimension(15, 2)}
          height={getCardHeightDimension(15, 2)}
          {...item}
        />
      );
    }

    return (
      <MovieList
        // onAddWatchList={onAddWatchList}
        borderRadius={6}
        resizeMode="contain"
        showLabels={false}
        marginRight={15}
        width={getCardWidthDimension(15, 3)}
        height={getCardHeightDimension(15, 2)}
        {...item}
      />
    );
  };

  return (
    <SafeAreaView backgroundColor={colors.black}>
      <FlatList
        bounces={false}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        numColumns={3}
        contentContainerStyle={GlobalStyles.content}
        ItemSeparatorComponent={() => <ItemSeparatorComponent height={15} />}
        ListFooterComponent={loading && <Loading />}
        onEndReached={getMovies}
        onEndReachedThreshold={0.8}
        data={data}
        keyExtractor={(_, index) => String(index)}
        ListEmptyComponent={() =>
          !loading && <EmptyContent message="No content was found!" />
        }
        renderItem={({item}) => <Item {...item} />}
      />
    </SafeAreaView>
  );
}
