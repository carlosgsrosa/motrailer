import React, {createContext, useState, useEffect} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

import {showError} from '../util';

const AuthContext = createContext({firstTime: true, user: {}});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [firstTime, setFirstTime] = useState(true);
  const [loading, setLoading] = useState(true);

  const isFirstTime = async () => {
    await AsyncStorage.getItem('@MoTrailer:firstTime')
      .then((value) => {
        if (value !== null) {
          setFirstTime(JSON.parse(value));
          if (firstTime) {
            getLocalUser();
          }
        }
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        showError(error.message);
      });
  };

  const getLocalUser = async () => {
    await AsyncStorage.getItem('@MoTrailer:user')
      .then((value) => {
        if (value !== null) {
          setUser(JSON.parse(value));
        }
      })
      .catch((e) => showError('getLocalUser', e.message));
  };

  useEffect(() => {
    isFirstTime();
  }, []);

  return (
    <AuthContext.Provider value={{firstTime, user, setUser, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
