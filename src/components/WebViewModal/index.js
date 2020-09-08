import React, {useState} from 'react';
import {
  SafeAreaView,
  Alert,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import {WebView} from 'react-native-webview';

import {VerticalView, HorizontalView, Text, Image} from '../';

import {images} from '../../constants';

export default function WebViewModal(props) {
  const {onCancel, visible, uri} = props;

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
            style={{minWidth: '90%', maxHeight: 600}}>
            <HorizontalView
              justifyContent="space-between"
              backgroundColor="#EE7429"
              paddingLeft="15px"
              paddingTop="15px"
              paddingRight="15px"
              paddingBottom="15px">
              <Text fontSize="20px" color="#fff">
                USER PERMISSION
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
              <WebView source={{uri: uri}} />
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
