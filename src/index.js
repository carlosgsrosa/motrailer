import 'react-native-gesture-handler';

import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';

import {AuthProvider} from './contexts/auth';

import Routes from './routes';

Sentry.init({
  dsn:
    'https://00d32e4f4c184bf99b2b31ae595f7944@o405657.ingest.sentry.io/5271704',
  enableAutoSessionTracking: true,
  sessionTrackingIntervalMillis: 10000,
});

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}
