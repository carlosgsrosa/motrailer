import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
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
document.getElementsByClassName("page_wrap _wrap ")[0].style.backgroundColor = '#fff';
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
            borderRadius="6px"
            backgroundColor="#fff"
            style={{minWidth: '90%', maxHeight: 423}}>
            <HorizontalView
              justifyContent="space-between"
              backgroundColor="#EE7429"
              paddingLeft="15px"
              paddingTop="15px"
              paddingRight="15px"
              paddingBottom="15px">
              <Text fontSize="20px" fontWeight="bold" color="#fff">
                {title}
              </Text>
              <TouchableOpacity onPress={onCancel} shadowOpacity={0.7}>
                <Image
                  style={{tintColor: '#fff'}}
                  width="22px"
                  height="22px"
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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'rbga(255, 255, 255, 0.8)',
  },
  modalView: {
    minWidth: 350,
    minHeight: 400,
    margin: 15,
    backgroundColor: '#fff',
    borderRadius: 6,
    padding: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
});
