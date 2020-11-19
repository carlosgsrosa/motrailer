import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, Platform} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';

import AuthContext from '../../contexts/userContext';

import {
  showError,
  getUri,
  getWindowWidth,
  getYearFromDate,
  stringToUpperCase,
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
  VoteAverage,
  GlobalStyles,
  Wrapper,
  LoadingModal,
  Poster,
  ShowMore,
} from '../../components';

export default function TVDetail() {
  const {user} = useContext(AuthContext);

  const route = useRoute();
  const navigation = useNavigation();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [genres, setGenres] = useState([]);
  const [cast, setCast] = useState([]);
  const [castCrew, setCastCrew] = useState([]);
  const [tvCertification, setTvCertification] = useState([]);
  const [tvImages, setTvImages] = useState([]);
  const [note, setNote] = useState(null);

  const [favorite, setFavorite] = useState(false);
  const [rated, setRated] = useState(false);
  const [watchlist, setWatchlist] = useState(false);

  const id = route.params.id;

  function StringList(props) {
    return (
      <HorizontalView
        alignItems="center"
        justifyContent="center"
        borderRadius={40}
        paddingTop={3}
        paddingLeft={10}
        paddingBottom={3}
        paddingRight={10}
        backgroundColor="#F0F0F0">
        <Text fontWeight="300" fontSize={15}>
          {props.name}
        </Text>
      </HorizontalView>
    );
  }

  function CertificationList(props) {
    return (
      <HorizontalView
        marginTop={15}
        alignItems="center"
        justifyContent="center">
        <VerticalView
          backgroundColor={colors.red}
          paddingLeft={5}
          paddingRight={5}
          borderRadius={3}>
          <Text fontWeight="bold" color={colors.white} fontSize={15}>
            {props.rating}
          </Text>
        </VerticalView>
        <Text marginLeft={5}>{data.first_air_date} (US)</Text>
      </HorizontalView>
    );
  }

  const getDetails = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/tv/${id}`, {
        params: {
          api_key: API_KEY,
          append_to_response: 'release_dates',
          language: 'en-US',
        },
      });
      setData(response.data);
      setGenres(response.data.genres);
      getContentRatings();
      getCredits();
      getAccountStates();
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showError('getMovie', e.message);
    }
  };

  const getContentRatings = async () => {
    try {
      const response = await api.get(`/tv/${id}/content_ratings`);
      const filteredCertification = response.data.results.filter(
        (item) => item.iso_3166_1 === 'US',
      );
      setTvCertification(filteredCertification);
    } catch (e) {
      setLoading(false);
      showError('getContentRatings', e.message);
    }
  };

  const getCredits = async () => {
    try {
      const response = await api.get(`/tv/${id}/credits`, {
        API_KEY,
      });
      const sortByOrder = (a, b) => a.order - b.order;
      const topBilledCast = response.data.cast.sort(sortByOrder).slice(0, 10);
      setCast(topBilledCast);
      const castSorted = response.data.cast.sort((a, b) => a.order - b.order);
      const crew = response.data.crew;
      setCastCrew({castSorted, crew});
      getImages();
    } catch (e) {
      setLoading(false);
      showError('getMovieCast', e.message);
    }
  };

  const getImages = async () => {
    try {
      const response = await api.get(`/tv/${id}/images`);
      setTvImages([...response.data.posters, ...response.data.backdrops]);
    } catch (e) {
      setLoading(false);
      showError('getMovieMedia', e.message);
    }
  };

  const getAccountStates = async () => {
    try {
      const response = await api.get(`/tv/${id}/account_states`, {
        params: {
          api_key: API_KEY,
          session_id: user.session_id,
        },
      });
      setFavorite(response.data.favorite);
      setRated(response.data.rated);
      setWatchlist(response.data.watchlist);
    } catch (e) {
      setLoading(false);
      showError('getAccountStates', e.message);
    }
  };

  const onFavorite = async () => {
    try {
      const response = await api.post(
        `/account/${user.id}/favorite?api_key=${API_KEY}&session_id=${user.session_id}`,
        {
          media_type: 'movie',
          media_id: id,
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

  const onWatchList = async () => {
    try {
      const response = await api.post(
        `/account/${user.id}/watchlist?api_key=${API_KEY}&session_id=${user.session_id}`,
        {
          media_type: 'movie',
          media_id: id,
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
        width={getWindowWidth()}
        height={280}
        resizeMode="cover"
        source={{uri: getUri(data.backdrop_path)}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Trailer', {
              id,
              movieName: data.title,
            })
          }>
          <Image width={54} height={54} source={images.icons.youtube} />
        </TouchableOpacity>
      </ImageBackground>
    );
  }

  function MoviePoster() {
    return (
      <Wrapper marginLeft={15} style={GlobalStyles.shadow}>
        <Poster
          note={note}
          resizeMode="contain"
          width={120}
          height={180}
          borderRadius={6}
          type="movie"
          source={data.poster_path}
        />
      </Wrapper>
    );
  }

  function Name() {
    return (
      <Text
        style={{height: 50}}
        marginLeft={10}
        marginRight={15}
        fontWeight="600"
        fontSize={20}
        color={colors.white}
        numberOfLines={2}>
        {stringToUpperCase(data.original_name)} (
        {getYearFromDate(data.first_air_date)})
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
          ItemSeparatorComponent={() => <ItemSeparatorComponent width={3} />}
          data={tvCertification}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item}) => <CertificationList {...item} />}
        />
      </HorizontalView>
    );
  }

  function Popularity() {
    return (
      <Text marginTop={5} fontWeight="300" marginLeft={10} fontSize={15}>
        {data.popularity} People wathing
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
          ItemSeparatorComponent={() => <ItemSeparatorComponent width={3} />}
          data={genres}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item}) => <StringList {...item} />}
        />
      </HorizontalView>
    );
  }

  function Rating() {
    return (
      <HorizontalView marginLeft={10} alignItems="center">
        <Image
          height={22.92}
          width={24}
          marginRight={5}
          resizeMode="contain"
          source={images.icons.rating_star}
        />
        <VoteAverage
          marginRight={5}
          fontWeight="400"
          fontColor={colors.pinkRed}
          voteAverage={data.vote_average}
        />
        <Text fontWeight="500" color={colors.pinkRed}>
          ({data.vote_count})
        </Text>
      </HorizontalView>
    );
  }

  function Overview() {
    return (
      <Text
        color={colors.shade}
        marginTop={note ? 160 : 140}
        marginLeft={15}
        marginRight={15}
        fontSize={17}
        textAlign="justify"
        numberOfLines={4}>
        {data.overview}
      </Text>
    );
  }

  function Cast() {
    return (
      <>
        <HorizontalView
          justifyContent="space-between"
          alignItems="center"
          paddingLeft={15}
          paddingRight={15}
          paddingTop={10}
          paddingBottom={10}
          marginTop={15}>
          <Text fontSize={22} fontWeight="500" color="#000">
            Top Billed Cast
          </Text>
          <TouchableOpacity onPress={openCast}>
            <Text fontSize={22} fontWeight="500" color="#000">
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
            ItemSeparatorComponent={() => <ItemSeparatorComponent width={5} />}
            data={cast}
            keyExtractor={(_, index) => String(index)}
            renderItem={({item}) => <CastList data={item} />}
          />
        </HorizontalView>
      </>
    );
  }

  function LikeFavoriteComment() {
    return (
      <VerticalView>
        <HorizontalView justifyContent="center" backgroundColor="#F5F5F5">
          <TouchableOpacity style={styles.space} onPress={onWatchList}>
            <Image
              width={54}
              height={54}
              resizeMode="contain"
              source={watchlist ? images.icons.saved : images.icons.save}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.space} onPress={onFavorite}>
            <Image
              width={54}
              height={54}
              resizeMode="contain"
              source={favorite ? images.icons.liked : images.icons.like}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.space}
            onPress={() =>
              navigation.navigate('Review', {
                id,
                movieName: data.title,
              })
            }>
            <Image
              width={54}
              height={54}
              resizeMode="contain"
              source={images.icons.overview}
            />
          </TouchableOpacity>
        </HorizontalView>
      </VerticalView>
    );
  }

  const openCast = () => {
    navigation.push('Cast', {
      data: castCrew,
      title: `${stringToUpperCase(data.original_name)} (${getYearFromDate(
        data.first_air_date,
      )}`,
    });
  };

  const openMedia = (data, index) => {
    navigation.navigate('Media', {
      indexRef: index,
      data,
    });
  };

  const Media = () => {
    return (
      <VerticalView>
        <HorizontalView
          justifyContent="space-between"
          alignItems="center"
          paddingLeft={15}
          paddingRight={15}
          paddingBottom={10}
          marginTop={15}>
          <Text fontSize={22} fontWeight="500" color="#000">
            Media
          </Text>
          <TouchableOpacity onPress={() => openMedia(tvImages, 0)}>
            <Text fontSize={22} fontWeight="500" color="#000">
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
          data={tvImages}
          keyExtractor={(_, index) => String(index)}
          renderItem={({item, index}) => (
            <VerticalView justifyContent="center" alignItems="center">
              <TouchableOpacity
                onPress={() => openMedia(tvImages, index)}
                style={{
                  position: 'absolute',
                  zIndex: 1,
                }}>
                <Image height={64} width={64} source={images.icons.zoom} />
              </TouchableOpacity>
              <Poster
                resizeMode="cover"
                width={220}
                height={300}
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
    getDetails();
  }, []);

  if (loading) {
    return <LoadingModal visible={loading} />;
  }

  return (
    <VerticalView backgroundColor={colors.white}>
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
  },
});
