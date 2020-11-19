import React, {useState, useEffect} from 'react';
import {ScrollView} from 'react-native';
import {useRoute} from '@react-navigation/native';

import {api, API_KEY} from '../../services/api';

import {showError, getYearsOfAge} from '../../util';

import {colors} from '../../constants';

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
    <SafeAreaView backgroundColor={colors.swamp}>
      <AppStatusBar barStyle="light-content" />
      <LoadingModal visible={loading} />
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}>
        <HorizontalView
          paddingLeft={15}
          paddingTop={15}
          paddingRight={15}
          paddingBottom={15}>
          <VerticalView style={{width: 190}}>
            <VerticalView justifyContent="center" alignItems="center">
              <Wrapper style={GlobalStyles.shadow}>
                <Poster
                  resizeMode="cover"
                  width={190}
                  height={276}
                  borderRadius={6}
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
            <Text color={colors.white} fontWeight="bold" marginTop={15}>
              Known for
            </Text>
            <Text color={colors.dimGray}>{data.known_for_department}</Text>
            <Text color={colors.white} fontWeight="bold" marginTop={15}>
              Birthday
            </Text>
            <Text color={colors.dimGray}>
              {data.birthday} ({getYearsOfAge(data.birthday)} years old)
            </Text>
            <Text color={colors.white} fontWeight="bold" marginTop={15}>
              Place of Birth
            </Text>
            <Text color={colors.dimGray}>{data.place_of_birth}</Text>
            <Text color={colors.white} fontWeight="bold" marginTop={15}>
              Also Known As
            </Text>
            {alsoKnownAs.map((item, index) => (
              <Text color={colors.dimGray} key={index}>
                {item.trim()}
              </Text>
            ))}
          </VerticalView>
          <VerticalView flex={1} paddingLeft={15}>
            <Text color={colors.white}>{data.biography}</Text>
          </VerticalView>
        </HorizontalView>
      </ScrollView>
    </SafeAreaView>
  );
}
