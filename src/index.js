import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';
import Config from 'react-native-config';

import {AuthProvider} from './contexts/userContext';

import Routes from './routes';

Sentry.init({
  dsn: Config.SENTRY_API_KEY,
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 10000,
});

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </AuthProvider>
  );
}
