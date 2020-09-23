import React, {useContext, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from '../../contexts/auth';

import {showError, showNotifyMessage} from '../../util';

import {
  SafeAreaView,
  HorizontalView,
  Text,
  LoadingModal,
} from '../../components';

export default function Settings() {
  const [loading, setLoading] = useState(false);

  const {setUser} = useContext(AuthContext);

  const logOut = async () => {
    setLoading(true);
    try {
      setUser(null);
      await AsyncStorage.removeItem('@MoTrailer:user').then(() => {
        showNotifyMessage('Logout efetuado com sucesso!');
      });
    } catch (e) {
      showError('logOut', e.message);
    }
  };

  return (
    <SafeAreaView>
      <LoadingModal visible={loading} />
      <TouchableOpacity onPress={logOut}>
        <HorizontalView
          paddingLeft="15px"
          paddingTop="15px"
          paddingRight="15px"
          paddingBottom="15px"
          backgroundColor="#CCCCCC">
          <Text>Deslogar</Text>
        </HorizontalView>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
