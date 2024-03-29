import React, {useContext, useState} from 'react';
import {TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import AuthContext from '../../contexts/userContext';

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
      await AsyncStorage.removeItem('@MoTrailer:user').then(() => {
        setUser(null);
        showNotifyMessage('Logout efetuado com sucesso!');
        setLoading(false);
      });
    } catch (e) {
      setLoading(false);
      showError('logOut', e.message);
    }
  };

  return (
    <SafeAreaView>
      <LoadingModal visible={loading} />
      <TouchableOpacity onPress={logOut}>
        <HorizontalView
          paddingLeft={15}
          paddingTop={15}
          paddingRight={15}
          paddingBottom={15}
          backgroundColor="#CCCCCC">
          <Text>Deslogar</Text>
        </HorizontalView>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
