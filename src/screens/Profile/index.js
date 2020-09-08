import React, {useState, useEffect, useContext} from 'react';
import {TouchableOpacity, FlatList} from 'react-native';
import AsyncStorage, {
  useAsyncStorage,
} from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

import AuthContext from '../../contexts/auth';

import {showError, getWindowWidth, getCardDimension} from '../../util';

import {images} from '../../constants';

import api, {API_KEY, USER_PERMISSION_URL} from '../../services/api';

import {
  styles,
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
  const {setItem} = useAsyncStorage('@MoTrailer:token');

  const navigation = useNavigation();

  const {user} = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [webViewVisible, setWebViewVisible] = useState(false);
  const [token, setToken] = useState({});
  const [watchList, setWatchList] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  function CustomImageBackground() {
    const source = user ? user.avatar.gravatar.hash : null;

    return (
      <ImageBackground
        style={{justifyContent: 'center', alignItems: 'center'}}
        width={getWindowWidth() + 'px'}
        height="210px"
        resizeMode="cover"
        source={images.background.profile}>
        <VerticalView marginBottom="30px">
          <Image
            style={{borderWidth: 1, borderColor: '#fff'}}
            width="110px"
            height="110px"
            borderRadius="55px"
            source={
              source
                ? {uri: `http://0.gravatar.com/avatar/${source}`}
                : images.background.profile
            }
          />
        </VerticalView>
      </ImageBackground>
    );
  }

  const saveToken = async (data) => {
    setLoading(true);
    try {
      await setItem(JSON.stringify(data));
      console.log('Token salvo com sucesso!');
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showError('saveToken', e.message);
    }
  };

  const getToken = async () => {
    setLoading(true);
    await api
      .get('/authentication/token/new', {API_KEY})
      .then((response) => {
        setToken(response.data);
        saveToken(JSON.stringify(response.data));
        setWebViewVisible(true);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError('geToken', e.message);
      });
  };

  const onCancel = () => {
    setWebViewVisible(!webViewVisible);
    getAuthentication();
  };

  const getAuthentication = async () => {
    setLoading(true);
    await api
      .post(
        `/authentication/session/new?api_key=${API_KEY}&request_token=${token.request_token}`,
      )
      .then((response) => {
        const {success, status_message} = response.data;
        if (success) {
          getAccount(response.data.session_id);
        } else {
          showError('getAuthentication', status_message);
        }
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError('getAuthentication', e.message);
      });
  };

  const saveLocalAccount = async (account) => {
    setLoading(true);
    try {
      await AsyncStorage.setItem('@MoTrailer:signed', JSON.stringify(account));
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showError('saveAccount', e.message);
    }
  };

  const getAccount = async (session_id) => {
    setLoading(true);
    await api
      .get(`/account?api_key=${API_KEY}&session_id=${session_id}`)
      .then((response) => {
        response.data.session_id = session_id;
        saveLocalAccount(response.data);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError('getAccount', e.message);
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
          session_id: user.session_id,
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
    console.log('USER', user);
    if (!user) {
      getToken();
    } else {
      getWatchList();
    }
  }, []);

  // useEffect(() => {}, [token]);

  // useEffect(() => navigation.addListener('focus', () => getWatchList()), []);

  return (
    <SafeAreaView backgroundColor="#EE7429">
      <AppStatusBar style="light-content" />
      <LoadingModal visible={loading} />
      <WebViewModal
        onCancel={() => {
          onCancel();
        }}
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
                  style={styles.shadow}>
                  <Text fontSize="30px" color="#222222">
                    {watchList ? watchList.length : 0}
                  </Text>
                  <Text color="#999999">Watching</Text>
                </VerticalView>
              </TouchableOpacity>
            </HorizontalView>
          </VerticalView>
          <VerticalView>
            <FlatList
              showsVerticalScrollIndicator={false}
              numColumns={4}
              contentContainerStyle={styles.content}
              ListFooterComponent={
                loading && <Loading size="large" color="#ED7329" />
              }
              ItemSeparatorComponent={() => (
                <ItemSeparatorComponent height="15px" />
              )}
              ListEmptyComponent={() => (
                <EmptyContent message="Nenhum filme encontrado!" />
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
