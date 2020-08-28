import React, {createContext, useState, useEffect} from 'react';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

export const AuthContext = createContext({signed: false, user: {}});

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function getStorageUser() {
    try {
      const value = await AsyncStorage.getItem('@MoTrailer:signed');
      if (value !== null) {
        setUser(value);
      }
    } catch (error) {
      Alert.alert('Acorreu um erro inesperado!', error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getStorageUser();
  }, []);

  return (
    <AuthContext.Provider value={{signed: !!user, user, loading}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
