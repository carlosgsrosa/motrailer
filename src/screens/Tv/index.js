import React, {useState, useEffect} from 'react';
import {RefreshControl} from 'react-native';

import userFetch from '../../services/userFetch';

import {showError} from '../../util';

import {
  SafeAreaView,
  AppStatusBar,
  Header,
  ScrollView,
  LoadingModal,
  MovieTVSections,
} from '../../components';

const CARD_WIDTH = '140px';
const CARD_HEIGHT = '210px';

export default () => {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [popular, setPopular] = useState([]);
  const [airingToday, setAiringToday] = useState([]);
  const [currentlyAiring, setCurrentAiring] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const getTVList = async () => {
    try {
      setLoading(true);
      const response = await userFetch.getTVShows();
      setPopular(response.popular);
      setAiringToday(response.airing_today);
      setCurrentAiring(response.currently_airing);
      setTopRated(response.top_rated);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showError(e.message);
    }
  };

  const onRefresh = () => {
    setRefreshing(false);
    getTVList();
  };

  useEffect(() => {
    getTVList();
  }, []);

  if (loading) {
    return <LoadingModal visible={loading} />;
  }

  return (
    <SafeAreaView backgroundColor="#FFF">
      <AppStatusBar barStyle="dark-content" />
      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <LoadingModal visible={loading} />
        <Header title="TV" backgroundColor="#FFF" borderColor="#EE7429" />
        <MovieTVSections
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          type="tv"
          {...popular}
        />
        <MovieTVSections
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          type="tv"
          {...airingToday}
        />
        <MovieTVSections
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          type="tv"
          {...currentlyAiring}
        />
        <MovieTVSections
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          type="tv"
          {...topRated}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
