import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, FlatList} from 'react-native';

import {images} from '../../constants';

import {showError} from '../../util';

import api, {API_KEY} from '../../services/api';

import {
  SafeAreaView,
  AppStatusBar,
  HorizontalView,
  Image,
  SearchList,
  ItemSeparatorComponent,
  GlobalStyles,
  Loading,
} from '../../components';

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState(null);

  async function getSearchMulti(pageNumber = page, research = false) {
    if (totalPages && pageNumber > totalPages) {
      return;
    }

    setLoading(true);
    await api
      .get('/search/multi', {
        params: {
          api_key: API_KEY,
          query: query,
          page: pageNumber,
        },
      })
      .then((response) => {
        setData(
          research
            ? response.data.results
            : [...data, ...response.data.results],
        );

        setPage(pageNumber + 1);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError(e.message);
      });
  }

  return (
    <SafeAreaView>
      <AppStatusBar barStyle="light-content" />
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
          style={styles.input}
          autoCorrect={false}
          onChangeText={(value) => setQuery(value)}
          onSubmitEditing={() => getSearchMulti(1, true)}
          value={query}
        />
        <TouchableOpacity
          onPress={() => getSearchMulti(1, true)}
          style={{position: 'absolute', zIndex: 1, right: 28}}>
          <Image
            style={{tintColor: '#EE7429'}}
            width="21px"
            height="21px"
            resizeMode="contain"
            source={images.icons.search}
          />
        </TouchableOpacity>
      </HorizontalView>

      <FlatList
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.content}
        ItemSeparatorComponent={() => <ItemSeparatorComponent height="15px" />}
        initialNumToRender={7}
        ListFooterComponent={loading && <Loading />}
        onEndReached={() => getSearchMulti()}
        onEndReachedThreshold={1}
        viewabilityConfig={{viewAreaCoveragePercentThreshold: 20}}
        keyExtractor={(_, index) => String(index)}
        data={data}
        renderItem={({item, index}) => <SearchList key={index} data={item} />}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    width: '100%',
    paddingLeft: 10,
    borderColor: '#fff',
    borderRadius: 18,
    borderWidth: 1,
    backgroundColor: '#fff',
  },
});
