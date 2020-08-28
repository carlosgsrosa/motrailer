import React, {useState, useEffect} from 'react';
import {SafeAreaView, Alert, FlatList} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {
  HorizontalView,
  LoadingModal,
  styles,
  ItemSeparatorComponent,
  TrailerList,
} from '../../components';

import api, {api_key} from '../../services/api';

export default function Trailer() {
  const route = useRoute();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const movieId = route.params;

  async function getTrailer() {
    try {
      setLoading(true);
      const response = await api.get(`/movie/${movieId}/videos`, {api_key});
      setData(response.data.results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Acorreu um erro inesperado!', error.message);
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
          contentContainerStyle={styles.content}
          ItemSeparatorComponent={() => <ItemSeparatorComponent height="3px" />}
          data={data}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item}) => <TrailerList data={item} />}
        />
      </HorizontalView>
    </SafeAreaView>
  );
}
