import React, {useState, useEffect, useContext} from 'react';
import {FlatList, TextInput, TouchableOpacity} from 'react-native';
import {useRoute} from '@react-navigation/native';

import AuthContext from '../../contexts/auth';

import api, {API_KEY, THUMBNAIL_PATH} from '../../services/api';

import {images} from '../../constants';

import {showError} from '../../util';

import {
  SafeAreaView,
  HorizontalView,
  GlobalStyles,
  ItemSeparatorComponent,
  LoadingModal,
  ReviewList,
  EmptyContent,
  Text,
  Image,
} from '../../components';

export default function Review() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [message, setMessage] = useState(null);

  const route = useRoute();

  const {user} = useContext(AuthContext);

  const avatar = user.avatar.gravatar.hash;

  const movieId = route.params.id;

  const getReview = async () => {
    setLoading(true);
    await api
      .get(`/movie/${movieId}/reviews`, {API_KEY})
      .then((response) => {
        setData(response.data.results);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError(e.message);
      });
  };

  useEffect(() => {
    getReview();
  }, []);

  if (loading) {
    return <LoadingModal visible={loading} />;
  }

  return (
    <SafeAreaView backgroundColor="#fff">
      <FlatList
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.content}
        ItemSeparatorComponent={() => <ItemSeparatorComponent height="15px" />}
        ListEmptyComponent={() => (
          <EmptyContent message="We don't have any reviews for Pets United. Would you like to write one?" />
        )}
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <ReviewList key={item.id} {...item} />}
      />
      <HorizontalView
        style={{
          alignItems: 'center',
          borderTopWidth: 0.6,
          borderTopColor: '#ccc',
        }}
        justifyContent="space-between"
        paddingLeft="15px"
        paddingTop="15px"
        paddingRight="15px"
        paddingBottom="15px">
        <Image
          width="32px"
          height="32px"
          marginRight="5px"
          borderRadius="16px"
          source={
            avatar
              ? {uri: THUMBNAIL_PATH + avatar}
              : images.background.male_profile
          }
        />
        <TextInput
          style={{
            flex: 1,
            height: 25,
            marginLeft: 5,
            marginRight: 5,
          }}
          autoFocus
          autoCorrect={false}
          // onChangeText={(value) => setQuery(value)}
          // onSubmitEditing={() => getSearchMulti(1, true)}
          // value={query}
        />
        <TouchableOpacity>
          <Text color="#D6182A" fontWeight="500">
            SEND
          </Text>
        </TouchableOpacity>
      </HorizontalView>
    </SafeAreaView>
  );
}
