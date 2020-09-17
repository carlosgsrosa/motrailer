import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import {
  showError,
  getUri,
  getWindowWidth,
  getYearFromDate,
  stringToUpperCase,
  minutesInHours,
  formatDate,
} from '../../util';

import api, {API_KEY} from '../../services/api';

import {images} from '../../constants';

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

  const movieId = route.params.id;

  function StringList({data}) {
    return (
      <HorizontalView
        alignItems="center"
        justifyContent="center"
        borderRadius="40px"
        paddingTop="3px"
        paddingLeft="10px"
        paddingBottom="3px"
        paddingRight="10px"
        backgroundColor="#f0f0f0">
        <Text fontWeight="300" fontSize="15px">
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
          backgroundColor="#ff0000"
          paddingLeft="5px"
          paddingRight="5px"
          borderRadius="3px">
          <Text fontWeight="bold" color="#fff" fontSize="15px">
            {data.certification ? data.certification : null}
          </Text>
        </VerticalView>
        <Text marginLeft="5px">
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

  async function getMovie() {
    setLoading(true);
    await api
      .get(`/movie/${movieId}`, {
        params: {
          api_key: API_KEY,
          append_to_response: 'release_dates',
        },
      })
      .then((response) => {
        setMovie(response.data);
        setGenres(response.data.genres);
        const release_dates = response.data.release_dates.results;
        setMovieCertification(getCertification(release_dates, 'US'));
        getMovieCast();
      })
      .catch((e) => {
        setLoading(false);
        showError('getMovie', e.message);
      });
  }

  async function getMovieCast() {
    setLoading(true);
    await api
      .get(`/movie/${movieId}/credits`, {
        API_KEY,
      })
      .then((response) => {
        const sortByOrder = (a, b) => a.order - b.order;
        const topBilledCast = response.data.cast.sort(sortByOrder).slice(0, 10);
        setMovieCredit(topBilledCast);
        const cast = response.data.cast.sort((a, b) => a.order - b.order);
        const crew = response.data.crew;
        setCastCrew({cast, crew});
        getMovieMedia();
      })
      .catch((e) => {
        setLoading(false);
        showError('getMovieCast', e.message);
      });
  }

  function Header() {
    return (
      <ImageBackground
        width={getWindowWidth() + 'px'}
        height="280px"
        resizeMode="cover"
        source={{uri: getUri(movie.backdrop_path)}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('Trailer', movieId)}>
          <Image width="54px" height="54px" source={images.icons.youtube} />
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  function MoviePoster() {
    return (
      <Wrapper marginLeft="15px" style={GlobalStyles.shadow}>
        <Poster
          note={note}
          resizeMode="center"
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
        style={{height: 50}}
        marginLeft="10px"
        marginRight="15px"
        fontWeight="600"
        fontSize="20px"
        color="#fff"
        numberOfLines={2}>
        {stringToUpperCase(movie.title)} ({getYearFromDate(movie.release_date)})
      </Text>
    );
  }

  function Certification() {
    return (
      <HorizontalView>
        <FlatList
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
      <Text marginTop="5px" fontWeight="300" marginLeft="10px" fontSize="15px">
        {movie.popularity} People wathing
      </Text>
    );
  }

  function Genre() {
    return (
      <HorizontalView>
        <FlatList
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
          fontColor="#D6182A"
          voteAverage={movie.vote_average}
        />
        <Text fontWeight="500" color="#D6182A">
          ({movie.vote_count})
        </Text>
      </HorizontalView>
    );
  }

  function Overview() {
    return (
      <TouchableOpacity onPress={() => refRBSheet.current.open()}>
        <Text
          color="#666"
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
          style={{width: getWindowWidth(), justifyContent: 'space-between'}}
          backgroundColor="#f8f8f8"
          paddingLeft="15px"
          paddingRight="15px"
          paddingTop="15px"
          paddingBottom="15px"
          marginTop="15px">
          <Text fontWeight="500" fontSize="17px" color="#999999">
            Top Billed Cast
          </Text>
          <TouchableOpacity onPress={openCast}>
            <Text fontWeight="500" fontSize="17px" color="#999999">
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
              <ShowMore width={90} height={131} onPress={openCast} />
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
            renderItem={({item}) => <CastList data={item} />}
          />
        </HorizontalView>
      </>
    );
  }

  function LikeFavoriteComment() {
    return (
      <VerticalView justifyContent="center" alignItems="center">
        <HorizontalView
          style={{width: '80%'}}
          marginTop="15px"
          marginBottom="15px"
          justifyContent="space-between">
          <TouchableOpacity
            onPress={() => alert('LIKE')}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginLeft: 20,
              marginRight: 20,
            }}>
            <Image
              width="54px"
              height="54px"
              source={images.icons.like_checked}
            />
            <Text marginTop="5px" color="#999999">
              LIKE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => alert('FAVORITE')}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
            }}>
            <Image width="54px" height="54px" source={images.icons.favorite} />
            <Text marginTop="5px" color="#999999">
              FAVORITE
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Review', {
                movieId: movieId,
                movieName: movie.title,
              })
            }
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 20,
            }}>
            <Image width="54px" height="54px" source={images.icons.comment} />
            <Text marginTop="5px" color="#999999">
              COMMENT
            </Text>
          </TouchableOpacity>
        </HorizontalView>
      </VerticalView>
    );
  }

  const openCast = () => {
    navigation.push('Cast', {
      data: castCrew,
      title: `${stringToUpperCase(movie.title)} (${getYearFromDate(
        movie.release_date,
      )}`,
    });
  };

  const openMedia = (data, index) => {
    const params = {
      indexRef: index,
      data,
    };

    navigation.navigate('Media', params);
  };

  const Media = () => {
    return (
      <VerticalView>
        <HorizontalView
          style={{width: getWindowWidth(), justifyContent: 'space-between'}}
          backgroundColor="#f8f8f8"
          paddingLeft="15px"
          paddingRight="15px"
          paddingTop="15px"
          paddingBottom="15px"
          marginTop="15px">
          <Text fontWeight="500" fontSize="17px" color="#999999">
            Media
          </Text>
          <TouchableOpacity onPress={() => openMedia(moviePosters, 0)}>
            <Text fontWeight="500" fontSize="17px" color="#999999">
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
            paddingBottom: 30,
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

  const getMovieMedia = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/movie/${movieId}/images`);
      setMovieImages([...response.data.posters, ...response.data.backdrops]);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showError(e.message);
    }
  };

  useEffect(() => {
    getMovie();
  }, []);

  if (loading) {
    return <LoadingModal visible={loading} />;
  }

  return (
    <VerticalView backgroundColor="#fff">
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
        <Overview />
        <Cast />
        <LikeFavoriteComment />
        <Media />
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
});
