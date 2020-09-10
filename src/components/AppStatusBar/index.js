import React from 'react';
import {StatusBar, Platform} from 'react-native';

// default
// dark-content
// light-content

export default function AppStatusBar(props) {
  const style = props.barStyle;

  function getStyleByOS() {
    if (Platform.OS === 'ios') {
      return style;
    }
    return 'light-content';
  }

  return <StatusBar barStyle={getStyleByOS()} backgroundColor="#EE7429" />;
}
