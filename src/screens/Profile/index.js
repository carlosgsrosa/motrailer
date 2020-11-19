import React, {useState, useCallback, useContext} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  FlatList,
  RefreshControl,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation, useFocusEffect} from '@react-navigation/native';

import AuthContext from '../../contexts/userContext';

import {showError, getWindowWidth, getCardWidthDimension} from '../../util';

import {images, colors} from '../../constants';

import {api, API_KEY, USER_PERMISSION_URL} from '../../services/api';

import {
  GlobalStyles,
  SafeAreaView,
  AppStatusBar,
  VerticalView,
  HorizontalView,
  LoadingModal,
  Loading,
  ImageBackground,
  Text,
  ItemSeparatorComponent,
  Poster,
  ScrollView,
  Header,
  WebViewModal,
  EmptyContent,
  Avatar,
  Image,
} from '../../components';

export default function Profile() {
  const {user, setUser} = useContext(AuthContext);
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [token, setToken] = useState({});
  const [watchList, setWatchList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [reload, setReload] = useState(false);

  function CustomImageBackground() {
    const getName = () => {
      return user.name ? user.name : user.username;
    };

    return (
      <ImageBackground
        style={styles.imageBackground}
        width={getWindowWidth()}
        height={210}
        resizeMode="cover"
        source={images.background.profile}>
        <TouchableOpacity onPress={() => setWebViewVisible(!webViewVisible)}>
          <VerticalView marginBottom={40}>
            <Avatar
              width={110}
              height={110}
              borderRadius={55}
              resizeMode="cover"
              borderColor={colors.white}
            />
          </VerticalView>
        </TouchableOpacity>
        <Text fontSize={28} fontWeight="300">
          {user ? getName() : null}
        </Text>
      </ImageBackground>
    );
  }

  const getToken = async () => {
    setLoading(true);
    await api
      .get('/authentication/token/new', {API_KEY})
      .then((response) => {
        setToken(response.data);
        setWebViewVisible(true);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError('geToken', e.message);
      });
  };

  const onConfirm = () => {
    getAuthentication();
  };

  const getAuthentication = async () => {
    await api
      .post(
        `/authentication/session/new?api_key=${API_KEY}&request_token=${token.request_token}`,
      )
      .then((response) => {
        const {success, status_message} = response.data;
        if (success) {
          getUserAccount(response.data.session_id);
        } else {
          showError('getAuthentication', status_message);
        }
        setWebViewVisible(!webViewVisible);
      })
      .catch((e) => showError('getAuthentication', e.message));
  };

  const getUserAccount = async (sessionId) => {
    setLoading(true);
    await api
      .get('/account', {
        params: {
          api_key: API_KEY,
          session_id: sessionId,
        },
      })
      .then((response) => {
        response.data.session_id = sessionId;
        response.data.access_token = token.request_token;
        setUser(response.data);
        saveLocalUser(JSON.stringify(response.data));
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError('getUserAccount', e.message);
      });
  };

  const saveLocalUser = (data) => {
    setLoading(true);
    AsyncStorage.setItem('@MoTrailer:user', data)
      .then(() => {
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError('saveLocalUser', e.message);
      });
  };

  const getWatchlist = async () => {
    try {
      setLoading(true);
      if (totalPages && page > totalPages) {
        setLoading(false);
        return;
      }

      const response = await api.get(`/account/${user.id}/watchlist/movies`, {
        params: {
          api_key: API_KEY,
          session_id: user.session_id,
          sort_by: 'created_at.desc',
          page: page,
        },
      });

      setWatchList(
        reload
          ? response.data.results
          : [...watchList, ...response.data.results],
      );
      setPage(response.data.page + 1);
      setTotalPages(response.data.total_pages);
      setTotalResults(response.data.total_results);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showError('getWatchList', e.message);
    }
  };

  const onRefresh = () => {
    setRefreshing(false);
    setPage(1);
    setTotalPages(0);
    getWatchlist();
  };

  const onRemoveWatchlist = async (props) => {
    try {
      await api.post(
        `/account/${user.id}/watchlist?api_key=${API_KEY}&session_id=${user.session_id}`,
        {
          media_type: 'movie',
          media_id: props.id,
          watchlist: false,
        },
      );
      await onRefresh();
    } catch (e) {
      showError('onRemoveWatchlist', e.message);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (user !== null || user) {
        onRefresh();
      } else {
        setWatchList([]);
        setTotalResults(0);
        getToken();
        onRefresh();
      }
    }, [user]),
  );

  const MovieList = (props) => {
    const {id} = props;
    return (
      <VerticalView marginRight={15} style={[GlobalStyles.shadow]}>
        <RemoveIcon {...props} />
        <TouchableOpacity onPress={() => navigation.push('MovieDetail', {id})}>
          <Poster
            resizeMode="cover"
            width={getCardWidthDimension(15, 4)}
            height={119}
            borderRadius={6}
            type="movie"
            source={props.poster_path}
          />
        </TouchableOpacity>
      </VerticalView>
    );
  };

  const RemoveIcon = (props) => {
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.removeIcon}
        onPress={() => onRemoveWatchlist(props)}>
        <Image
          resizeMode="contain"
          height={46}
          width={32}
          source={images.icons.remove}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView backgroundColor={colors.orange}>
      <AppStatusBar barStyle="light-content" />
      <LoadingModal visible={loading} />
      <WebViewModal
        title="PERMISSÃO MANUAL"
        onCancel={() => setWebViewVisible(!webViewVisible)}
        onConfirm={onConfirm}
        visible={webViewVisible}
        uri={USER_PERMISSION_URL + token.request_token}
      />
      <VerticalView flex={1} backgroundColor={colors.white}>
        <Header
          color={colors.white}
          title="PROFILE"
          backgroundColor={colors.orange}
          borderColor={colors.white}
        />
        <ScrollView
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <CustomImageBackground />
          <VerticalView
            backgroundColor={colors.white}
            paddingLeft={15}
            paddingTop={15}
            paddingRight={15}>
            <HorizontalView
              marginTop={15}
              marginBottom={15}
              alignItems="center"
              justifyContent="center">
              <TouchableOpacity>
                <VerticalView
                  borderBottomColor={colors.fireEngineRed}
                  borderBottomWidth={5}
                  paddingLeft={20}
                  paddingTop={15}
                  paddingRight={20}
                  paddingBottom={15}
                  marginRight={30}
                  alignItems="center">
                  <Text fontSize={30} color={colors.nero}>
                    0
                  </Text>
                  <Text color={colors.nobel}>Like</Text>
                </VerticalView>
              </TouchableOpacity>

              <TouchableOpacity>
                <VerticalView
                  paddingLeft={20}
                  paddingTop={15}
                  paddingRight={20}
                  paddingBottom={15}
                  alignItems="center"
                  style={GlobalStyles.shadow}>
                  <Text fontSize={30} color={colors.nero}>
                    {totalResults}
                  </Text>
                  <Text color={colors.nobel}>Movies</Text>
                </VerticalView>
              </TouchableOpacity>
            </HorizontalView>
          </VerticalView>
          <VerticalView backgroundColor={colors.white}>
            <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              numColumns={4}
              contentContainerStyle={GlobalStyles.content}
              ListFooterComponent={loading && <Loading />}
              ItemSeparatorComponent={() => (
                <ItemSeparatorComponent height={15} />
              )}
              ListEmptyComponent={() => (
                <EmptyContent message="You haven't added any movies to your watchlist." />
              )}
              onEndReached={getWatchlist}
              onEndReachedThreshold={1}
              data={watchList}
              keyExtractor={(_, index) => String(index)}
              renderItem={({item}) => <MovieList {...item} />}
            />
          </VerticalView>
        </ScrollView>
      </VerticalView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {justifyContent: 'center', alignItems: 'center'},
  removeIcon: {position: 'absolute', top: 0, right: 6, zIndex: 1},
});
