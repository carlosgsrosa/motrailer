import React, {useState, useEffect, useContext} from 'react';
import {StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

import AuthContext from '../../contexts/auth';

import {showError, getWindowWidth, getCardDimension} from '../../util';

import {images} from '../../constants';

import api, {
  API_KEY,
  USER_PERMISSION_URL,
  THUMBNAIL_PATH,
} from '../../services/api';

import {
  GlobalStyles,
  SafeAreaView,
  AppStatusBar,
  VerticalView,
  HorizontalView,
  LoadingModal,
  ImageBackground,
  Text,
  Image,
  ItemSeparatorComponent,
  MovieList,
  ScrollView,
  Header,
  WebViewModal,
  EmptyContent,
  Loading,
} from '../../components';

export default function Profile() {
  const {user, setUser} = useContext(AuthContext);

  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [token, setToken] = useState({});
  const [watchList, setWatchList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  function CustomImageBackground() {
    const avatar = user ? user.avatar.gravatar.hash : null;

    const getName = () => {
      return user.name ? user.name : user.username;
    };

    return (
      <ImageBackground
        style={styles.imageBackground}
        width={getWindowWidth() + 'px'}
        height="210px"
        resizeMode="cover"
        source={images.background.profile}>
        <TouchableOpacity onPress={() => setWebViewVisible(!webViewVisible)}>
          <VerticalView marginBottom="40px">
            <Image
              style={styles.image}
              width="110px"
              height="110px"
              borderRadius="55px"
              source={
                avatar
                  ? {uri: THUMBNAIL_PATH + avatar}
                  : images.background.male_profile
              }
            />
          </VerticalView>
        </TouchableOpacity>
        <Text fontSize="28px" fontWeight="300">
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
      .catch((e) => {
        showError('getAuthentication', e.message);
      });
  };

  const getUserAccount = async (sessionId) => {
    setLoading(true);
    await api
      .get(`/account?api_key=${API_KEY}&session_id=${sessionId}`)
      .then((response) => {
        response.data.session_id = sessionId;
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
        console.log('saveLocalUser', 'User salvo com sucesso!');
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError('saveLocalUser', e.message);
      });
  };

  const getWatchList = async () => {
    setLoading(true);

    if (totalPages && page > totalPages) {
      setLoading(false);
      return;
    }

    await api
      .get(`/account/${user.id}/watchlist/movies`, {
        params: {
          page: page,
          api_key: API_KEY,
          session_id: user ? user.session_id : null,
        },
      })
      .then((response) => {
        setWatchList([...watchList, ...response.data.results]);
        setPage(response.data.page + 1);
        setTotalPages(response.data.total_pages);
        setTotalResults(response.data.total_results);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError('getWatchList', e.message);
      });
  };

  useEffect(() => {
    if (!user) {
      setWatchList([]);
      setTotalResults(0);
      getToken();
    } else {
      getWatchList();
    }
  }, [user]);

  return (
    <SafeAreaView backgroundColor="#EE7429">
      <AppStatusBar barStyle="light-content" />
      <LoadingModal visible={loading} />
      <WebViewModal
        title="PERMISSÃO MANUAL"
        onCancel={() => setWebViewVisible(!webViewVisible)}
        onConfirm={onConfirm}
        visible={webViewVisible}
        uri={USER_PERMISSION_URL + token.request_token}
      />
      <VerticalView flex={1} backgroundColor="#fff">
        <Header title={'PROFILE'} />
        <ScrollView
          bounces={false}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}>
          <CustomImageBackground />
          <VerticalView
            backgroundColor="#ffff"
            paddingLeft="15px"
            paddingTop="15px"
            paddingRight="15px">
            <HorizontalView
              marginTop="15px"
              marginBottom="15px"
              alignItems="center"
              justifyContent="center">
              <TouchableOpacity>
                <VerticalView
                  borderBottomColor="#D6182A"
                  borderBottomWidth="5px"
                  paddingLeft="20px"
                  paddingTop="15px"
                  paddingRight="20px"
                  paddingBottom="15px"
                  marginRight="30px"
                  alignItems="center">
                  <Text fontSize="30px" color="#222222">
                    0
                  </Text>
                  <Text color="#999999">Like</Text>
                </VerticalView>
              </TouchableOpacity>

              <TouchableOpacity>
                <VerticalView
                  paddingLeft="20px"
                  paddingTop="15px"
                  paddingRight="20px"
                  paddingBottom="15px"
                  alignItems="center"
                  style={GlobalStyles.shadow}>
                  <Text fontSize="30px" color="#222222">
                    {totalResults}
                  </Text>
                  <Text color="#999999">Filmes</Text>
                </VerticalView>
              </TouchableOpacity>
            </HorizontalView>
          </VerticalView>
          <VerticalView backgroundColor="#ffff">
            <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              numColumns={4}
              contentContainerStyle={GlobalStyles.content}
              ListFooterComponent={loading && <Loading />}
              ItemSeparatorComponent={() => (
                <ItemSeparatorComponent height="15px" />
              )}
              ListEmptyComponent={() => (
                <EmptyContent message="Nenhum filme encontrado na sua lista de interesses!" />
              )}
              onEndReached={getWatchList}
              onEndReachedThreshold={1}
              data={watchList}
              keyExtractor={(_, index) => String(index)}
              renderItem={({item}) => (
                <MovieList
                  showLabels={false}
                  marginRight="15px"
                  width={getCardDimension(15, 4)}
                  height="119px"
                  {...item}
                />
              )}
            />
          </VerticalView>
        </ScrollView>
      </VerticalView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageBackground: {justifyContent: 'center', alignItems: 'center'},
  image: {borderWidth: 1, borderColor: '#fff', overflow: 'hidden'},
});
