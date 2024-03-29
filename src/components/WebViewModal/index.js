import React from 'react';
import {Modal, TouchableWithoutFeedback, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';

import {VerticalView, HorizontalView, Text, Image} from '../';

import {images} from '../../constants';

export default function WebViewModal(props) {
  const {title, onCancel, onConfirm, visible, uri} = props;

  const _onMessage = (event) => {
    const response = JSON.parse(event.nativeEvent.data);
    if (response.message === 'ok') {
      onConfirm();
    }
  };

  const jsCode = `document.getElementById('allow_authentication').style.backgroundColor = '#EE7429';
document.getElementsByClassName("single_column  ")[0].style.display = 'none';
document.getElementsByClassName("page_wrap _wrap ")[0].style.backgroundColor = '#FFFFFF';
document.getElementById('allow_authentication').addEventListener("click", function() {  
window.ReactNativeWebView.postMessage(JSON.stringify({type: "click", message : "ok"}));}); 
true;`;

  return (
    <Modal visible={visible} transparent onRequestClose={onCancel}>
      <VerticalView
        flex={1}
        backgroundColor="rgba(0,0,0,0.7)"
        justifyContent="center"
        alignItems="center">
        <TouchableWithoutFeedback onPress={onCancel}>
          <VerticalView
            borderRadius={6}
            backgroundColor="#FFFFFF"
            style={{minWidth: '90%', maxHeight: 423}}>
            <HorizontalView
              justifyContent="space-between"
              backgroundColor="#EE7429"
              paddingLeft={15}
              paddingTop={15}
              paddingRight={15}
              paddingBottom={15}>
              <Text fontSize={20} fontWeight="bold" color="#FFFFFF">
                {title}
              </Text>
              <TouchableOpacity onPress={onCancel} shadowOpacity={0.7}>
                <Image
                  style={{tintColor: '#FFFFFF'}}
                  width={22}
                  height={22}
                  source={images.icons.close}
                />
              </TouchableOpacity>
            </HorizontalView>
            <TouchableWithoutFeedback>
              <WebView
                source={{uri: uri}}
                originWhitelist={['*']}
                javaScriptEnabledAndroid={true}
                onMessage={_onMessage}
                injectedJavaScript={jsCode}
              />
            </TouchableWithoutFeedback>
          </VerticalView>
        </TouchableWithoutFeedback>
      </VerticalView>
    </Modal>
  );
}
