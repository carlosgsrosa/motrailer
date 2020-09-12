import React from 'react';
import {Text, Alert, View, StyleSheet} from 'react-native';
import {WebView} from 'react-native-webview';
import {useNavigation} from '@react-navigation/native';

export default () => {
  const navigation = useNavigation();
  const webViewUrl = 'https://reactnative.dev';

  const _onMessage = (event) => {
    const res = JSON.parse(event.nativeEvent.data);
    if (res.message === 'ok') {
      navigation.navigate('Movies');
    }
  };

  const jsCode = `document.querySelector('.HeaderHero').style.backgroundColor = '#ff0';
    document.querySelector('a.ActionButton').style.backgroundColor = 'green';
    document.querySelector('a.ActionButton').addEventListener("click", function() {  
    window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message : "ok"}));
}); 
true;`;
  return (
    <View style={styles.container}>
      <WebView
        source={{uri: webViewUrl}}
        originWhitelist={['*']}
        javaScriptEnabledAndroid={true}
        injectedJavaScript={jsCode}
        onMessage={_onMessage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
