import React from 'react';
import {Text, View} from 'react-native';

import {fonts} from './constants';

export default (props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{fontFamily: 'SFProDisplay-Bold', fontSize: 40}}>
        Inter Black
      </Text>

      <Text style={{fontFamily: 'SFProDisplay-Light', fontSize: 40}}>
        Inter Black
      </Text>

      <Text style={{fontFamily: 'SFProDisplay-Medium', fontSize: 40}}>
        Inter Black
      </Text>

      <Text style={{fontFamily: 'SFProDisplay-Regular', fontSize: 40}}>
        Inter Black
      </Text>

      <Text style={{fontFamily: 'SFProDisplay-SemiBold', fontSize: 40}}>
        Inter Black
      </Text>

      <Text style={{fontFamily: 'SFProDisplay-UltraLight', fontSize: 40}}>
        Inter Black
      </Text>
    </View>
  );
};
