import React, {createContext, useState, useEffect} from 'react';
import {useAsyncStorage} from '@react-native-community/async-storage';

import {showError} from '../util';

export const AuthContext = createContext({signed: false, user: {}});

export const AuthProvider = ({children}) => {
  const {getItem} = useAsyncStorage('@MoTrailer:signed');

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const getStorageUser = async () => {
    await getItem()
      .then((value) => {
        if (value !== null) {
          setUser(value);
        }
      })
      .catch((error) => {
        showError(error.message);
      });
    setLoading(false);
  };

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
