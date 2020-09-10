import React, {useState, useEffect} from 'react';
import {SafeAreaView, Alert, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';

import api, {API_KEY} from '../../services/api';

import {showError} from '../../util';

import {
  HorizontalView,
  LoadingModal,
  GlobalStyles,
  ItemSeparatorComponent,
  TrailerList,
} from '../../components';

export default function Trailer() {
  const route = useRoute();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const movieId = route.params;

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
          data={data}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item}) => <TrailerList data={item} />}
        />
      </HorizontalView>
    </SafeAreaView>
  );
}
