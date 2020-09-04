import React, {useState, useEffect} from 'react';
import {TouchableOpacity, FlatList} from 'react-native';
import {useAsyncStorage} from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

import {showError, getWindowWidth, getCardDimension} from '../../util';

import {images} from '../../constants';

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
} from '../../components';

function CustomImageBackground() {
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
          source={images.background.male_profile}
        />
      </VerticalView>
    </ImageBackground>
  );
}

export default function Profile() {
  const {getItem} = useAsyncStorage('@MoTrailer:watchList');

  const [loading, setLoading] = useState(true);
  const [watchList, setWatchList] = useState([]);

  const navigation = useNavigation();

  const getWatchList = async () => {
    setLoading(true);
    await getItem()
      .then((value) => {
        setWatchList(JSON.parse(value));
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError(e.message);
      });
  };

  useEffect(() => {
    getWatchList();
  }, []);

  useEffect(() => navigation.addListener('focus', () => getWatchList()), []);

  return (
    <SafeAreaView backgroundColor="#EE7429">
      <AppStatusBar style="light-content" />
      <LoadingModal visible={loading} />
      <VerticalView flex={1} backgroundColor="#fff">
        <Header title="PROFILE" />
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
              ItemSeparatorComponent={() => (
                <ItemSeparatorComponent height="15px" />
              )}
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
