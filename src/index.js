import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import * as Sentry from '@sentry/react-native';

import {AuthProvider} from './contexts/userContext';

import {SENTRY_API_KEY} from './services/api';

import Routes from './routes';

Sentry.init({
  dsn: SENTRY_API_KEY,
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
