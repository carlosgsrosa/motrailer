import React, {useState, useEffect, useRef, useLayoutEffect} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, TextInput} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';

import {api, API_KEY} from '../../services/api';

import {showError, getWindowsHeight} from '../../util';

import {colors} from '../../constants';

import {
  SafeAreaView,
  VerticalView,
  HorizontalView,
  GlobalStyles,
  ItemSeparatorComponent,
  LoadingModal,
  ReviewList,
  EmptyContent,
  Text,
  Avatar,
} from '../../components';

export default function Review() {
  const [loading, setLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [data, setData] = useState([]);

  const refRBSheet = useRef();

  const route = useRoute();
  const navigation = useNavigation();

  const {movieId, movieName} = route.params;

  const getReview = async () => {
    setLoading(true);
    await api
      .get(`/movie/${movieId}/reviews`, {API_KEY})
      .then((response) => {
        setData(response.data.results);
        setTotalResults(response.data.total_results);
        setLoading(false);
      })
      .catch((e) => {
        setLoading(false);
        showError(e.message);
      });
  };

  const RBSheetReview = () => {
    return (
      <RBSheet
        ref={refRBSheet}
        height={getWindowsHeight() - 100}
        openDuration={250}
        closeOnDragDown
        closeOnPressMask
        closeOnPressBack
        customStyles={{
          draggableIcon: {
            backgroundColor: colors.nobel,
          },
          container: {borderTopLeftRadius: 12, borderTopRightRadius: 12},
        }}>
        <VerticalView
          flex={1}
          marginLeft="15px"
          marginRight="15px"
          marginBottom="15px">
          <TouchableOpacity
            style={{
              borderRadius: 6,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.orange,
              marginBottom: 15,
            }}
            onPress={() => {}}>
            <Text color={colors.white} marginTop="15px" marginBottom="15px">
              SUBMIT
            </Text>
          </TouchableOpacity>

          <TextInput
            style={styles.inputText}
            autoFocus
            multiline
            numberOfLines={30}
            placeholder="you can start writing your review here..."
          />
        </VerticalView>
      </RBSheet>
    );
  };

  useEffect(() => {
    getReview();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `Review (${totalResults})`,
    });
  }, [totalResults]);

  if (loading) {
    return <LoadingModal visible={loading} />;
  }

  return (
    <SafeAreaView backgroundColor={colors.white}>
      <RBSheetReview tag={refRBSheet} />
      <FlatList
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={GlobalStyles.content}
        ItemSeparatorComponent={() => <ItemSeparatorComponent height="15px" />}
        ListEmptyComponent={() => (
          <EmptyContent
            message={`We don't have any reviews for ${movieName}. Would you like to write one?`}
          />
        )}
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({item}) => <ReviewList key={item.id} {...item} />}
      />
      <VerticalView
        style={{
          alignItems: 'center',
          borderTopWidth: 0.8,
          borderTopColor: colors.veryLightGrey,
        }}>
        <TouchableOpacity onPress={() => refRBSheet.current.open()}>
          <HorizontalView
            alignItems="center"
            justifyContent="space-between"
            paddingLeft="15px"
            paddingTop="15px"
            paddingRight="15px"
            paddingBottom="15px">
            <Avatar
              width="40px"
              height="40px"
              borderRadius="20px"
              resizeMode="cover"
              borderColor={colors.orange}
            />
            <Text color={colors.shade} marginLeft="10px" marginRight="15px">
              you can start writing your review click here...
            </Text>
          </HorizontalView>
        </TouchableOpacity>
      </VerticalView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputText: {
    flex: 1,
    width: '100%',
    paddingLeft: 15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 6,
    backgroundColor: colors.lightShade,
  },
});
