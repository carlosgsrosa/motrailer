import React, {useState, useEffect} from 'react';
import {SafeAreaView, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';

import api, {API_KEY} from '../../services/api';

import {showError} from '../../util';

import {
  HorizontalView,
  LoadingModal,
  GlobalStyles,
  ItemSeparatorComponent,
  TrailerList,
  EmptyContent,
} from '../../components';

export default function Trailer() {
  const route = useRoute();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const {movieId, movieName} = route.params;

  async function getTrailer() {
    try {
      setLoading(true);
      const response = await api.get(`/movie/${movieId}/videos`, {
        API_KEY,
      });
      setData(response.data.results);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showError(e.message);
    }
  }

  useEffect(() => {
    getTrailer();
  }, []);

  return (
    <SafeAreaView>
      <HorizontalView>
        <LoadingModal visible={loading} />
        <FlatList
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={GlobalStyles.content}
          ItemSeparatorComponent={() => <ItemSeparatorComponent height="3px" />}
          ListEmptyComponent={() => (
            <EmptyContent
              message={`There are no English trailers added to ${movieName}.`}
            />
          )}
          data={data}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item}) => <TrailerList data={item} />}
        />
      </HorizontalView>
    </SafeAreaView>
  );
}
