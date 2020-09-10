import React, {useState, useEffect} from 'react';
import {Alert, ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';

import api, {API_KEY} from '../../services/api';

import {showError, getYearsOfAge} from '../../util';

import {
  SafeAreaView,
  AppStatusBar,
  VerticalView,
  HorizontalView,
  Text,
  Wrapper,
  GlobalStyles,
  LoadingModal,
  SocialMedia,
  Poster,
} from '../../components';

const params = {
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
};

export default function Person() {
  const route = useRoute();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [social, setSocial] = useState({});
  const [alsoKnownAs, setAlsoKnownAs] = useState([]);

  const personId = route.params.id;

  async function getPerson() {
    try {
      setLoading(true);
      const response = await api.get(`/person/${personId}`, params);
      setData(response.data);
      setAlsoKnownAs(response.data.also_known_as);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      showError(e.message);
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
    } catch (e) {
      setLoading(false);
      showError(e.message);
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
            <VerticalView justifyContent="center" alignItems="center">
              <Wrapper style={GlobalStyles.shadow}>
                <Poster
                  resizeMode="cover"
                  width="190px"
                  height="276px"
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
            </VerticalView>
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
          <VerticalView flex={1} paddingLeft="15px">
            <Text>{data.biography}</Text>
          </VerticalView>
        </HorizontalView>
      </ScrollView>
    </SafeAreaView>
  );
}
