import React from 'react';
import {FlatList, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {colors} from '../../constants';

import {
  VerticalView,
  HorizontalView,
  Text,
  GlobalStyles,
  ItemSeparatorComponent,
  MovieList,
  TvList,
  ShowMore,
} from '../../components';

export default (props) => {
  const {title, endpoint, type} = props;

  const items = props.data;

  const navigation = useNavigation();

  const Item = (item) => {
    if (type === 'tv') {
      return <TvList {...props} {...item} />;
    }

    return <MovieList {...props} {...item} />;
  };

  return (
    <VerticalView>
      <HorizontalView
        marginLeft="15px"
        marginRight="15px"
        justifyContent="space-between"
        alignItems="center">
        <Text
          fontSize="22px"
          fontFamily="SFProDisplay-Medium"
          fontWeight="bold"
          color={colors.orange}>
          {title}
        </Text>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('AllMovies', {title, endpoint, type})
          }>
          <Text
            fontSize="25px"
            fontFamily="SFProDisplay-Medium"
            fontWeight="bold"
            color={colors.orange}>
            ...
          </Text>
        </TouchableOpacity>
      </HorizontalView>

      <FlatList
        bounces={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        horizontal
        contentContainerStyle={GlobalStyles.content}
        ItemSeparatorComponent={() => <ItemSeparatorComponent width="5px" />}
        ListFooterComponent={() => (
          <ShowMore
            width={140}
            height={210}
            onPress={() => navigation.navigate('AllMovies', {endpoint, title})}
          />
        )}
        data={items}
        keyExtractor={(_, index) => String(index)}
        renderItem={({item}) => <Item {...item} />}
      />
    </VerticalView>
  );
};
