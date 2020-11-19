import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Platform,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import userFetch from '../../services/userFetch';

import {images, colors} from '../../constants';

import {showError, getUri, getWindowWidth} from '../../util';

import {
  ScrollView,
  AppStatusBar,
  LoadingModal,
  Header,
  VerticalView,
  MovieTVSections,
  ImageBackground,
  Text,
  Image,
} from '../../components';

export default function Movies() {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [featuredMovie, setFeaturedMovie] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);

  const navigation = useNavigation();

  const getMovieList = async () => {
    try {
      setLoading(true);
      await userFetch.getMovies().then((response) => {
        setOriginals(response.originals);
        setTrending(response.trending);
        setUpcoming(response.upcoming);
        setTopRated(response.top_rated);
        const index = Math.floor(
          Math.random() * response.featured_movie.data.length - 1,
        );
        setFeaturedMovie(response.featured_movie.data[index]);
        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      showError(e.message);
    }
  };

  const FeaturedMovie = () => {
    return (
      <ImageBackground
        width={getWindowWidth()}
        height={280}
        resizeMode="cover"
        source={{uri: getUri(featuredMovie.backdrop_path)}}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          start={{x: 0, y: 0.3}}
          end={{x: 0, y: 1}}
          colors={[colors.transparent, 'rgba(0,0,0,0.8)', colors.black]}
        />
        <VerticalView
          justifyContent="flex-end"
          paddingLeft={10}
          paddingRight={10}
          paddingBottom={15}
          style={{height: '100%'}}>
          <Text color={colors.white} fontSize={25} fontWeight="bold">
            {featuredMovie.title}
          </Text>
          <Text marginTop={15} color={colors.veryLightGrey} numberOfLines={4}>
            {featuredMovie.overview}
          </Text>
          <TouchableOpacity
            style={styles.moreInfoButton}
            onPress={() =>
              navigation.navigate('MovieDetail', {
                id: featuredMovie.id,
              })
            }>
            <Image width={24} height={24} source={images.icons.info} />
            <Text color={colors.white} fontWeight="bold" marginLeft={10}>
              More Info
            </Text>
          </TouchableOpacity>
        </VerticalView>
      </ImageBackground>
    );
  };

  const onRefresh = () => {
    setRefreshing(false);
    getMovieList();
  };

  useEffect(() => {
    getMovieList();
    return () => {};
  }, []);

  if (loading) {
    return <LoadingModal visible={loading} />;
  }

  return (
    <VerticalView backgroundColor={colors.black}>
      <AppStatusBar barStyle="light-content" />
      <LoadingModal visible={loading} />
      {/* <Header borderColor={colors.orange} style={styles.header} /> */}

      <ScrollView
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {featuredMovie && <FeaturedMovie />}

        {originals && (
          <MovieTVSections
            width={140}
            height={210}
            borderRadius={6}
            type="movie"
            {...originals}
          />
        )}

        {trending && (
          <MovieTVSections
            width={140}
            height={210}
            borderRadius={6}
            type="movie"
            {...trending}
          />
        )}

        {upcoming && (
          <MovieTVSections
            width={140}
            height={210}
            borderRadius={6}
            type="movie"
            {...upcoming}
          />
        )}

        {topRated && (
          <MovieTVSections
            width={140}
            height={210}
            borderRadius={6}
            type="movie"
            {...topRated}
          />
        )}
      </ScrollView>
    </VerticalView>
  );
}

const styles = StyleSheet.create({
  moreInfoButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    marginTop: 15,
    paddingTop: 7,
    paddingLeft: 15,
    paddingRight: 15,
    paddingBottom: 7,
    borderRadius: 6,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  header: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 30 : 0,
    right: 0,
    zIndex: 99,
  },
});
