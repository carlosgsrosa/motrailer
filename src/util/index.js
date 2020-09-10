import {Alert, Dimensions, Platform, ToastAndroid} from 'react-native';

import {IMAGE_PATH} from '../services/api';

export function getUri(path) {
  return IMAGE_PATH + path;
}

export function convertStringToDate(string) {
  try {
    let date = new Date(String(string));
    return date;
  } catch (e) {
    return '0';
  }
}

export function getYearFromDate(string) {
  try {
    let date = convertStringToDate(string);
    return date.getFullYear();
  } catch (error) {
    return '0';
  }
}

export function splitString(separator, limit, string) {
  const newString = string?.split(separator)[limit];
  return newString ? newString : '0';
}

export function getYearsOfAge(string) {
  try {
    let years_of_age = 0;
    if (string !== null) {
      let year_of_bith_day = getYearFromDate(string);
      let current_year = new Date();
      years_of_age = current_year.getFullYear() - year_of_bith_day;
    }

    return years_of_age;
  } catch (e) {
    return '0';
  }
}

export function getWindowsHeight() {
  return Math.round(Dimensions.get('window').height);
}

export function getWindowWidth() {
  return Math.round(Dimensions.get('window').width);
}

export function stringToUpperCase(string) {
  if (string) {
    return string.toUpperCase();
  }

  return string;
}

export function stringToLowerCase(string) {
  if (string) {
    return string.toLowerCase();
  }

  return string;
}

export function minutesInHours(minutes) {
  try {
    var hours = Math.floor(minutes / 60);
    var minutes = (minutes / 60 - hours) * 60;
    return hours + 'h ' + Math.round(minutes) + 'm';
  } catch (error) {
    return 0;
  }
}

export function formatDate(date) {
  try {
    return new Date(date).toLocaleDateString('US');
  } catch (error) {
    return 0;
  }
}

export function getCardDimension(padding, columns) {
  const DIVISOR = (columns + 1) * padding;
  const cardWidth = (getWindowWidth() - DIVISOR) / columns;
  return cardWidth + 'px';
}

export function showError(method = '', message) {
  Alert.alert('Acorreu um erro inesperado!', message);
  console.log(`${method}:`, message);
}

export function showNotifyMessage(message) {
  if (Platform.OS === 'ios') {
    Alert.alert(message);
  } else {
    ToastAndroid.show(message, ToastAndroid.SHORT);
  }
}
