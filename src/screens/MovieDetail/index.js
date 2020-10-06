import React, {useState, useEffect, useRef, useContext} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, Platform} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import AuthContext from '../../contexts/userContext';

import {
  showError,
  getUri,
  getWindowWidth,
  getYearFromDate,
  stringToUpperCase,
  minutesInHours,
  formatDate,
} from '../../util';

import {api, API_KEY} from '../../services/api';

import {images, colors} from '../../constants';

import {
  ScrollView,
  ImageBackground,
  ItemSeparatorComponent,
  VerticalView,
  HorizontalView,
  Text,
  Image,
  AppStatusBar,
  CastList,
  RBSheetDetail,
  VoteAverage,
  GlobalStyles,
  Wrapper,
  LoadingModal,
  Poster,
  ShowMore,
} from '../../components';

export default function Movie() {
  const {user} = useContext(AuthContext);

  const refRBSheet = useRef();
  const route = useRoute();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const [movieCredit, setMovieCredit] = useState([]);
  const [castCrew, setCastCrew] = useState([]);
  const [movieCertification, setMovieCertification] = useState({});
  const [moviePosters, setMovieImages] = useState([]);
  const [note, setNote] = useState(null);

  const [favorite, setFavorite] = useState(false);
  const [rated, setRated] = useState(false);
  const [watchlist, setWatchlist] = useState(false);

  const movieId = route.params.id;

  function StringList({data}) {
    return (
      <HorizontalView
        alignItems="center"
        justifyContent="center"
        borderWidth="0.7px"
        borderColor={colors.nobel}
        borderRadius="6px"
        paddingLeft="10px"
        paddingBottom="2px"
        paddingRight="10px">
        <Text fontSize="15px" color={colors.white}>
          {data.name}
        </Text>
      </HorizontalView>
    );
  }

  function CertificationList({data, runtime}) {
    return (
      <HorizontalView
        marginTop="15px"
        alignItems="center"
        justifyContent="center">
        <VerticalView
          backgroundColor={colors.red}
          paddingLeft="5px"
          paddingRight="5px"
          borderRadius="3px">
          <Text fontWeight="bold" color={colors.whiteSmoke} fontSize="15px">
            {data.certification ? data.certification : null}
          </Text>
        </VerticalView>
        <Text marginLeft="5px" color={colors.whiteSmoke} fontWeight="300">
          {formatDate(data.release_date)} (US) • {minutesInHours(runtime)}
        </Text>
      </HorizontalView>
    );
  }

  function getCertification(data, country) {
    try {
      return data
        .filter((item) => item.iso_3166_1 === country)
        .map((item) => {
          setNote(item.release_dates[0].note);
          return item.release_dates[0];
        });
    } catch (e) {
      showError(e.message);
    }
  }

  const getMovie = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          append_to_response: 'release_dates',
        },
      });
      setMovie(response.data);
      setGenres(response.data.genres);
      const release_dates = response.data.release_dates.results;
      setMovieCertification(getCertification(release_dates, 'US'));
      getMovieCast();
      getMovieState();
    } catch (e) {
      setLoading(false);
      showError('getMovie', e.message);
    }
  };

  const getMovieCast = async () => {
    try {
      const response = await api.get(`/movie/${movieId}/credits`, {
        API_KEY,
      });
      const sortByOrder = (a, b) => a.order - b.order;
      const topBilledCast = response.data.cast.sort(sortByOrder).slice(0, 10);
      setMovieCredit(topBilledCast);
      const cast = response.data.cast.sort((a, b) => a.order - b.order);
      const crew = response.data.crew;
      setCastCrew({cast, crew});
      getMovieMedia();
    } catch (e) {
      setLoading(false);
      showError('getMovieCast', e.message);
    }
  };

  const getMovieMedia = async () => {
    try {
      const response = await api.get(`/movie/${movieId}/images`);
      setMovieImages([...response.data.posters, ...response.data.backdrops]);
    } catch (e) {
      setLoading(false);
      showError('getMovieMedia', e.message);
    }
  };

  const getMovieState = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/movie/${movieId}/account_states`, {
        params: {
          api_key: API_KEY,
          session_id: user.session_id,
        },
      });
      setFavorite(response.data.favorite);
      setRated(response.data.rated);
      setWatchlist(response.data.watchlist);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showError('getMovieState', e.message);
    }
  };

  const onFavoriteClick = async () => {
    try {
      const response = await api.post(
        `/account/${user.id}/favorite?api_key=${API_KEY}&session_id=${user.session_id}`,
        {
          media_type: 'movie',
          media_id: movieId,
          favorite: !favorite,
        },
      );
      if (response.data.success) {
        setFavorite(!favorite);
      }
    } catch (e) {
      setLoading(false);
      showError('favorite', e.message);
    }
  };

  const onWatchListClick = async () => {
    try {
      const response = await api.post(
        `/account/${user.id}/watchlist?api_key=${API_KEY}&session_id=${user.session_id}`,
        {
          media_type: 'movie',
          media_id: movieId,
          watchlist: !watchlist,
        },
      );
      if (response.data.success) {
        setWatchlist(!watchlist);
      }
    } catch (e) {
      setLoading(false);
      showError('favorite', e.message);
    }
  };

  function Header() {
    return (
      <ImageBackground
        width={getWindowWidth() + 'px'}
        height="280px"
        resizeMode="cover"
        source={{uri: getUri(movie.backdrop_path)}}>
        <LinearGradient
          style={StyleSheet.absoluteFill}
          start={{x: 0, y: 0.3}}
          end={{x: 0, y: 1}}
          colors={[colors.transparent, 'rgba(24,25,26, 0.3)', colors.swamp]}
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Trailer', {
              movieId,
              movieName: movie.title,
            })
          }>
          <Image width="54px" height="54px" source={images.icons.youtube} />
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  function MoviePoster() {
    return (
      <Wrapper
        marginLeft="15px"
        borderRadius="6px"
        backgroundColor={colors.white}>
        <Poster
          note={note}
          resizeMode="contain"
          width="120px"
          height="180px"
          borderRadius="6px"
          type="movie"
          source={movie.poster_path}
        />
      </Wrapper>
    );
  }

  function Name() {
    return (
      <Text
        marginLeft="10px"
        marginRight="15px"
        fontWeight="bold"
        fontSize="20px"
        color={colors.white}
        numberOfLines={2}>
        {stringToUpperCase(movie.title)} ({getYearFromDate(movie.release_date)})
      </Text>
    );
  }

  function Certification() {
    return (
      <HorizontalView>
        <FlatList
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={() => <ItemSeparatorComponent width="3px" />}
          data={movieCertification}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item}) => (
            <CertificationList data={item} runtime={movie.runtime} />
          )}
        />
      </HorizontalView>
    );
  }

  function Popularity() {
    return (
      <Text
        marginTop="5px"
        fontWeight="300"
        marginLeft="10px"
        fontSize="15px"
        color={colors.whiteSmoke}>
        {movie.popularity} People watching
      </Text>
    );
  }

  function Genre() {
    return (
      <HorizontalView>
        <FlatList
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          contentContainerStyle={styles.flatListContainer}
          ItemSeparatorComponent={() => <ItemSeparatorComponent width="3px" />}
          data={genres}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item}) => <StringList data={item} />}
        />
      </HorizontalView>
    );
  }

  function Rating() {
    return (
      <HorizontalView marginLeft="10px" alignItems="center">
        <Image
          height="22.92px"
          width="24px"
          marginRight="5px"
          resizeMode="contain"
          source={images.icons.rating_star}
        />
        <VoteAverage
          marginRight="5px"
          fontWeight="400"
          fontColor={colors.fireEngineRed}
          voteAverage={movie.vote_average}
        />
        <Text fontWeight="500" color={colors.fireEngineRed}>
          ({movie.vote_count})
        </Text>
      </HorizontalView>
    );
  }

  function Overview() {
    return (
      <TouchableOpacity onPress={() => refRBSheet.current.open()}>
        <Text
          color={colors.whiteSmoke}
          marginTop={note ? '160px' : '140px'}
          marginLeft="15px"
          marginRight="15px"
          fontSize="17px"
          textAlign="justify"
          numberOfLines={4}>
          {movie.overview}
        </Text>
      </TouchableOpacity>
    );
  }

  function Cast() {
    return (
      <>
        <HorizontalView
          justifyContent="space-between"
          alignItems="center"
          paddingLeft="15px"
          paddingRight="15px"
          paddingTop="10px"
          paddingBottom="10px"
          marginTop="15px">
          <Text fontSize="22px" fontWeight="bold" color={colors.orange}>
            Top-Billed Cast
          </Text>
          <TouchableOpacity onPress={openCastClick}>
            <Text fontSize="22px" fontWeight="bold" color={colors.orange}>
              ...
            </Text>
          </TouchableOpacity>
        </HorizontalView>
        <HorizontalView>
          <FlatList
            bounces={false}
            horizontal
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={() => (
              <ShowMore width={90} height={131} onPress={openCastClick} />
            )}
            contentContainerStyle={{
              paddingLeft: 15,
              paddingTop: 15,
              paddingRight: 15,
            }}
            ItemSeparatorComponent={() => (
              <ItemSeparatorComponent width="5px" />
            )}
            data={movieCredit}
            keyExtractor={(_, index) => String(index)}
            renderItem={({item}) => (
              <CastList
                resizeMode="cover"
                width="90px"
                height="131px"
                borderRadius="6px"
                type="person"
                {...item}
              />
            )}
          />
        </HorizontalView>
      </>
    );
  }

  function UserActionButtons() {
    return (
      <VerticalView>
        <HorizontalView justifyContent="center">
          <TouchableOpacity style={styles.space} onPress={onWatchListClick}>
            <Image
              width="54px"
              height="54px"
              resizeMode="contain"
              source={watchlist ? images.icons.saved : images.icons.save}
            />
            <Text color={colors.white} fontWeight="bold" style={{marginTop: 7}}>
              {watchlist ? 'Saved' : 'Save'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.space} onPress={onFavoriteClick}>
            <Image
              width="54px"
              height="54px"
              resizeMode="contain"
              source={favorite ? images.icons.liked : images.icons.like}
            />
            <Text color={colors.white} fontWeight="bold" style={{marginTop: 7}}>
              {favorite ? 'Liked' : 'Like'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.space}
            onPress={() =>
              navigation.navigate('Review', {
                movieId,
                movieName: movie.title,
              })
            }>
            <Image
              width="54px"
              height="54px"
              resizeMode="contain"
              source={images.icons.overview}
            />
            <Text color={colors.white} fontWeight="bold" style={{marginTop: 7}}>
              Review
            </Text>
          </TouchableOpacity>
        </HorizontalView>
      </VerticalView>
    );
  }

  const openCastClick = () => {
    navigation.push('Cast', {
      data: castCrew,
      title: `${stringToUpperCase(movie.title)} (${getYearFromDate(
        movie.release_date,
      )})`,
    });
  };

  const openMedia = (data, index) => {
    const params = {
      indexRef: index,
      data,
    };

    navigation.navigate('Media', params);
  };

  const Images = () => {
    return (
      <VerticalView>
        <HorizontalView
          justifyContent="space-between"
          alignItems="center"
          paddingLeft="15px"
          paddingRight="15px"
          paddingBottom="10px"
          marginTop="15px">
          <Text fontSize="22px" fontWeight="bold" color={colors.orange}>
            Media
          </Text>
          <TouchableOpacity onPress={() => openMedia(moviePosters, 0)}>
            <Text fontSize="22px" fontWeight="bold" color={colors.orange}>
              ...
            </Text>
          </TouchableOpacity>
        </HorizontalView>
        <FlatList
          bounces={false}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          horizontal
          contentContainerStyle={{
            paddingTop: 15,
            paddingBottom: Platform.OS === 'ios' ? 30 : 15,
          }}
          data={moviePosters}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item, index}) => (
            <VerticalView justifyContent="center" alignItems="center">
              <TouchableOpacity
                onPress={() => openMedia(moviePosters, index)}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                }}>
                <Image height="64px" width="64px" source={images.icons.zoom} />
              </TouchableOpacity>
              <Poster
                resizeMode="cover"
                width="220px"
                height="300px"
                type="images"
                source={item.file_path}
              />
            </VerticalView>
          )}
        />
      </VerticalView>
    );
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (loading) {
    return <LoadingModal visible={loading} />;
  }

  return (
    <VerticalView backgroundColor={colors.swamp}>
      <AppStatusBar transparent barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Header />
        <HorizontalView style={styles.absoluteView}>
          <MoviePoster />
          <VerticalView flex={1}>
            <Name />
            <Certification />
            <Popularity />
            <Genre />
            <Rating />
          </VerticalView>
        </HorizontalView>
        <VerticalView />
        <Overview />
        <Cast />
        <UserActionButtons />
        <Images />
        <RBSheetDetail
          tag={refRBSheet}
          image={movie.poster_path}
          overview={movie.overview}
        />
      </ScrollView>
    </VerticalView>
  );
}

const styles = StyleSheet.create({
  flatListContainer: {
    paddingLeft: 10,
    paddingTop: 5,
    paddingRight: 15,
    paddingBottom: 5,
  },
  absoluteView: {
    zIndex: 1,
    position: 'absolute',
    top: 220,
  },
  space: {
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
