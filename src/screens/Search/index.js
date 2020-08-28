import React, {useState} from 'react';
import {Alert, TextInput, TouchableOpacity, FlatList} from 'react-native';

import {images} from '../../constants';

import api, {api_key} from '../../services/api';

import {
  SafeAreaView,
  AppStatusBar,
  HorizontalView,
  Image,
  SearchList,
  ItemSeparatorComponent,
  styles,
  Loading,
} from '../../components';

export default function Search() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState(null);

  async function getSearchMulti(pageNumber = page) {
    if (totalPages && pageNumber > totalPages) {
      return;
    }

    setLoading(true);
    await api
      .get('/search/multi', {
        params: {
          api_key: api_key,
          query: query,
          page: page,
          include_adult: false,
        },
      })
      .then((response) => {
        setData([...data, ...response.data.results]);
        setPage(pageNumber + 1);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        Alert.alert('Acorreu um erro inesperado!', error.message);
      });
  }

  return (
    <SafeAreaView>
      <AppStatusBar style="light-content" />
      <HorizontalView
        paddingLeft="15px"
        paddingTop="15px"
        paddingRight="15px"
        paddingBottom="15px"
        alignItems="center"
        justifyContent="space-between"
        backgroundColor="#EE7429">
        <TextInput
          autoFocus
          style={[
            {
              height: 40,
              width: '100%',
              paddingLeft: 10,
              borderColor: '#fff',
              borderRadius: 18,
              borderWidth: 1,
              backgroundColor: '#fff',
            },
          ]}
          autoCorrect={false}
          onChangeText={(value) => setQuery(value)}
          value={query}
        />
        <TouchableOpacity
          onPress={() => getSearchMulti()}
          style={{position: 'absolute', zIndex: 1, right: 28}}>
          <Image
            width="21px"
            height="21px"
            resizeMode="contain"
            source={images.icons.search}
          />
        </TouchableOpacity>
      </HorizontalView>

      <FlatList
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        initialNumToRender={7}
        ItemSeparatorComponent={() => <ItemSeparatorComponent height="15px" />}
        ListFooterComponent={
          loading && <Loading size="small" color="#ED7329" />
        }
        onEndReached={() => getSearchMulti()}
        onEndReachedThreshold={1}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 20}}
        keyExtractor={(_, index) => String(index)}
        data={data}
        renderItem={({item}) => <SearchList data={item} />}
      />
    </SafeAreaView>
  );
}
