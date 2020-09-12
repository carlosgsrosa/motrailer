import React, {useState, useEffect, useRef} from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
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
  const refBSDetail = useRef();
  const route = useRoute();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [movie, setMovie] = useState({});
  const [genres, setGenres] = useState([]);
  const [movieCredit, setMovieCredit] = useState([]);
  const [movieCertification, setMovieCertification] = useState([]);
  const [movieBackdrops, setMovieBackdrops] = useState([]);
  const [moviePosters, setMovieImages] = useState([]);

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

  function filterCertification(data, country) {
    try {
      return data
        .filter((item) => item.iso_3166_1 === country)
        .map((item) => {
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
          language: 'en-US',
          append_to_response: 'release_dates',
        },
      })
      .then((response) => {
        setMovie(response.data);
        setGenres(response.data.genres);
        setMovieCertification(
          filterCertification(response.data.release_dates.results, 'US'),
        );
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError(e.message);
      });
  }

  async function getMovieCast() {
    setLoading(true);
    try {
      const response = await api.get(`/movie/${movieId}/credits`, {
        API_KEY,
      });
      setMovieCredit(response.data.cast.slice(0, 10));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showError(e.message);
    }
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
          contentContainerStyle={{
            paddingLeft: 10,
            paddingTop: 5,
            paddingRight: 15,
            paddingBottom: 5,
          }}
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
          contentContainerStyle={{
            paddingLeft: 10,
            paddingTop: 5,
            paddingRight: 15,
            paddingBottom: 5,
          }}
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
        <VoteAverage
          fontWeight="400"
          fontColor="#D6182A"
          voteAverage={movie.vote_average}
        />
        <Image
          height="22.92px"
          width="24px"
          marginLeft="5px"
          resizeMode="contain"
          source={images.icons.rating_star}
        />
      </HorizontalView>
    );
  }

  function MovieOverview() {
    return (
      <TouchableOpacity onPress={() => refBSDetail.current.open()}>
        <Text
          color="#666666"
          marginTop="140px"
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
          style={{width: getWindowWidth()}}
          backgroundColor="#f8f8f8"
          paddingLeft="15px"
          paddingRight="15px"
          paddingTop="15px"
          paddingBottom="15px"
          marginTop="15px">
          <Text fontWeight="500" fontSize="17px" color="#999999">
            Top Billed Cast
          </Text>
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
              paddingLeft: 10,
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

  const openCast = () => {
    alert('SOON');
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
          style={{width: getWindowWidth()}}
          backgroundColor="#f8f8f8"
          paddingLeft="15px"
          paddingRight="15px"
          paddingTop="15px"
          paddingBottom="15px"
          marginTop="15px">
          <Text fontWeight="500" fontSize="17px" color="#999999">
            Media
          </Text>
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
                activeOpacity={0.7}
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
    try {
      const response = await api.get(`/movie/${movieId}/images`);
      setMovieImages([...response.data.posters, ...response.data.backdrops]);
    } catch (e) {
      setLoading(false);
      showError(e.message);
    }
  };

  useEffect(() => {
    getMovie();
    getMovieCast();
    getMovieMedia();
  }, []);

  if (loading) {
    return <LoadingModal visible={loading} />;
  }

  return (
    <VerticalView backgroundColor="#fff">
      <AppStatusBar transparent barStyle="light-content" />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <Header />
        <HorizontalView style={GlobalStyles.absoluteView}>
          <MoviePoster />
          <VerticalView flex={1}>
            <Name />
            <Certification />
            <Popularity />
            <Genre />
            <Rating />
          </VerticalView>
        </HorizontalView>
        <MovieOverview />
        <Cast />
        <Media />
        <RBSheetDetail
          tag={refBSDetail}
          image={movie.poster_path}
          overview={movie.overview}
        />
      </ScrollView>
    </VerticalView>
  );
}
