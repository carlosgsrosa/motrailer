import React, {useState, useEffect} from 'react';
import {Alert, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';

import api, {api_key} from '../../services/api';

import {getYearsOfAge} from '../../util';

import {
  SafeAreaView,
  AppStatusBar,
  VerticalView,
  HorizontalView,
  Text,
  Wrapper,
  styles,
  LoadingModal,
  SocialMedia,
  Poster,
} from '../../components';

const params = {
  params: {
    api_key: api_key,
    language: 'en-US',
  },
};

export default function Person() {
  const route = useRoute();
  const [data, setData] = useState({});
  const [social, setSocial] = useState({});
  const [alsoKnownAs, setAlsoKnownAs] = useState([]);
  const [loading, setLoading] = useState(false);

  const personId = route.params.id;

  async function getPerson() {
    try {
      setLoading(true);
      const response = await api.get(`/person/${personId}`, params);
      setData(response.data);
      setAlsoKnownAs(response.data.also_known_as);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Acorreu um erro inesperado!', error.message);
    }
  }

  async function getSocialMedia() {
    try {
      setLoading(true);
      const response = await api.get(
        `/person/${personId}/external_ids`,
        params,
      );
      setSocial(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Acorreu um erro inesperado!', error.message);
    }
  }

  useEffect(() => {
    getPerson();
    getSocialMedia();
  }, []);

  return (
    <SafeAreaView flex={1}>
      <AppStatusBar />
      <LoadingModal visible={loading} />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <HorizontalView
          paddingLeft="15px"
          paddingTop="15px"
          paddingRight="15px"
          paddingBottom="15px">
          <VerticalView style={{width: 190}}>
            <Wrapper width="140px" height="210px" style={styles.shadow}>
              <Poster
                resizeMode="cover"
                width="140px"
                height="210px"
                borderRadius="6px"
                gender={data.gender}
                type="person"
                source={data.profile_path}
              />
            </Wrapper>
            <SocialMedia
              twitter_id={social.twitter_id}
              facebook_id={social.facebook_id}
              instagram_id={social.instagram_id}
            />
            <Text fontWeight="bold" marginTop="15px">
              Known for
            </Text>
            <Text>{data.known_for_department}</Text>
            <Text fontWeight="bold" marginTop="15px">
              Birthday
            </Text>
            <Text>
              {data.birthday} ({getYearsOfAge(data.birthday)} years old)
            </Text>
            <Text fontWeight="bold" marginTop="15px">
              Place of Birth
            </Text>
            <Text>{data.place_of_birth}</Text>
            <Text fontWeight="bold" marginTop="15px">
              Also Known As
            </Text>
            {alsoKnownAs.map((item, index) => (
              <Text key={index}>{item.trim()}</Text>
            ))}
          </VerticalView>
          <VerticalView flex={1} paddingLeft="5px">
            <Text>{data.biography}</Text>
          </VerticalView>
        </HorizontalView>
      </ScrollView>
    </SafeAreaView>
  );
}
