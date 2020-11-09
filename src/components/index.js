import {StyleSheet} from 'react-native';
import styled from 'styled-components/native';
import LinearGradient from 'react-native-linear-gradient';

import {colors} from '../constants';

import RBSheetDetail from './RBSheetDetail';
import AppStatusBar from './AppStatusBar';
import TrailerList from './TrailerList';
import CastList from './CastList';
import MovieList from './MovieList';
import TvList from './TvList';
import VoteAverage from './VoteAverage';
import Poster from './Poster';
import LoadingModal from './LoadingModal';
import SocialMedia from './SocialMedia';
import EmptyContent from './EmptyContent';
import SearchList from './SearchList';
import Loading from './Loading';
import Header from './Header';
import WebViewModal from './WebViewModal';
import ShowMore from './ShowMore';
import ReviewList from './ReviewList';
import Avatar from './Avatar';
import MovieTVSections from './MovieTVSections';

const SafeAreaView = styled.SafeAreaView`
  flex: 1;
  background-color: ${(props) => props.backgroundColor || colors.transparent};
`;

const Wrapper = styled.View`
  margin-left: ${(props) => props.marginLeft || '0px'};

  margin-left: ${(props) => props.marginLeft || '0px'};
  margin-top: ${(props) => props.marginTop || '0px'};
  margin-right: ${(props) => props.marginRight || '0px'};
  margin-bottom: ${(props) => props.marginBottom || '0px'};

  border-radius: ${(props) => props.borderRadius || '0px'};
`;

const ScrollView = styled.ScrollView`
  background-color: ${(props) => props.backgroundColor || colors.transparent};

  margin-left: ${(props) => props.marginLeft || '0px'};
  margin-top: ${(props) => props.marginTop || '0px'};
  margin-right: ${(props) => props.marginRight || '0px'};
  margin-bottom: ${(props) => props.marginBottom || '0px'};

  padding-left: ${(props) => props.paddingLeft || '0px'};
  padding-top: ${(props) => props.paddingTop || '0px'};
  padding-right: ${(props) => props.paddingRight || '0px'};
  padding-bottom: ${(props) => props.paddingBottom || '0px'};

  border-width: ${(props) => props.borderWidth || '0px'};
  border-color: ${(props) => props.borderColor || '0px'};
`;

const VerticalView = styled.View`
  ${(props) => props.flex && `flex: ${props.flex}`};
  ${(props) =>
    props.backgroundColor && `background-color: ${props.backgroundColor}`};

  ${(props) => props.alignItems && `align-items: ${props.alignItems}`};
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent}`};

  margin-left: ${(props) => props.marginLeft || '0px'};
  margin-top: ${(props) => props.marginTop || '0px'};
  margin-right: ${(props) => props.marginRight || '0px'};
  margin-bottom: ${(props) => props.marginBottom || '0px'};

  padding-left: ${(props) => props.paddingLeft || '0px'};
  padding-top: ${(props) => props.paddingTop || '0px'};
  padding-right: ${(props) => props.paddingRight || '0px'};
  padding-bottom: ${(props) => props.paddingBottom || '0px'};

  border-width: ${(props) => props.borderWidth || '0px'};
  border-left-width: ${(props) => props.borderLeftWidth || '0px'};
  border-top-width: ${(props) => props.borderTopWidth || '0px'};
  border-right-width: ${(props) => props.borderRightWidth || '0px'};
  border-bottom-width: ${(props) => props.borderBottomWidth || '0px'};

  border-color: ${(props) => props.borderColor || colors.transparent};
  border-left-color: ${(props) => props.borderLeftColor || colors.transparent};
  border-top-color: ${(props) => props.borderTopColor || colors.transparent};
  border-right-color: ${(props) =>
    props.borderRightColor || colors.transparent};
  border-bottom-color: ${(props) => props.borderColor || colors.transparent};

  border-radius: ${(props) => props.borderRadius || '0px'};
`;

const HorizontalView = styled.View`
  ${(props) => props.flex && `flex: ${props.flex}`};

  flex-direction: row;

  ${(props) =>
    props.backgroundColor && `background-color: ${props.backgroundColor}`};
  ${(props) => props.alignItems && `align-items: ${props.alignItems}`};
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent}`};

  margin-top: ${(props) => props.marginTop || '0px'};
  margin-left: ${(props) => props.marginLeft || '0px'};
  margin-right: ${(props) => props.marginRight || '0px'};
  margin-bottom: ${(props) => props.marginBottom || '0px'};

  padding-left: ${(props) => props.paddingLeft || '0px'};
  padding-top: ${(props) => props.paddingTop || '0px'};
  padding-right: ${(props) => props.paddingRight || '0px'};
  padding-bottom: ${(props) => props.paddingBottom || '0px'};

  border-width: ${(props) => props.borderWidth || '0px'};
  border-color: ${(props) => props.borderColor || colors.transparent};
  border-radius: ${(props) => props.borderRadius || '0px'};
`;

const ItemSeparatorComponent = styled.View`
  width: ${(props) => props.width || '0px'};
  height: ${(props) => props.height || '0px'};
`;

const Text = styled.Text`
  font-size: ${(props) => props.fontSize || '15px'};

  ${(props) => props.width && `width: ${props.width}`};

  color: ${(props) => props.color || colors.black};

  text-align: ${(props) => props.textAlign || 'auto'};

  font-family: ${(props) => props.fontFamily || 'System'};

  background-color: ${(props) => props.backgroundColor || colors.transparent};

  font-weight: ${(props) => props.fontWeight || 'normal'};

  margin-left: ${(props) => props.marginLeft || '0px'};
  margin-top: ${(props) => props.marginTop || '0px'};
  margin-right: ${(props) => props.marginRight || '0px'};
  margin-bottom: ${(props) => props.marginBottom || '0px'};

  padding-left: ${(props) => props.paddingLeft || '0px'};
  padding-top: ${(props) => props.paddingTop || '0px'};
  padding-right: ${(props) => props.paddingRight || '0px'};
  padding-bottom: ${(props) => props.paddingBottom || '0px'};

  border-width: ${(props) => props.borderWidth || '0px'};
  border-color: ${(props) => props.borderColor || colors.transparent};
  border-radius: ${(props) => props.borderRadius || '0px'};
`;

const Image = styled.Image`
  width: ${(props) => props.width || '0px'};
  height: ${(props) => props.height || '0px'};

  border-radius: ${(props) => props.borderRadius || '0px'};

  margin-left: ${(props) => props.marginLeft || '0px'};
  margin-top: ${(props) => props.marginTop || '0px'};
  margin-right: ${(props) => props.marginRight || '0px'};
  margin-bottom: ${(props) => props.marginBottom || '0px'};
`;

export const Button = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  align-self: center;
  height: 54px;
  width: 192px;
  border-width: ${(props) => props.borderWidth || '2px'};
  border-color: ${(props) => props.borderColor || colors.white};
  border-radius: 27px;
  background-color: ${(props) => props.backgroundColor || colors.transparent};
  margin-top: 50px;
`;

export const ImageBackground = styled.ImageBackground`
  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius}`};

  width: ${(props) => props.width || '24px'};
  height: ${(props) => props.height || '24px'};
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

function elevationShadowStyle(elevation) {
  return {
    borderRadius: 6,
    elevation,
    shadowColor: colors.white,
    shadowOffset: {width: 0, height: 0.5 * elevation},
    shadowOpacity: 0.3,
    shadowRadius: 0.8 * elevation,
    backgroundColor: colors.white,
  };
}

const GradientCircle = styled(LinearGradient)`
  flex: 1;
  z-index: 1;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
  height: 32px;
  width: 32px;
  border-radius: 16px;
  padding: 2px;
`;

const GlobalStyles = StyleSheet.create({
  shadow: elevationShadowStyle(4),
  content: {
    padding: 15,
  },
  roundedAbsoluteView: {
    flex: 1,
    zIndex: 1,
    bottom: 0,
    position: 'absolute',
  },
  image: {
    width: 90,
    height: 121,
    borderRadius: 6,
  },
  text: {width: 90},
});

export {
  SafeAreaView,
  ScrollView,
  Wrapper,
  VerticalView,
  HorizontalView,
  Loading,
  ItemSeparatorComponent,
  Text,
  Image,
  GlobalStyles,
  AppStatusBar,
  VoteAverage,
  RBSheetDetail,
  MovieList,
  TvList,
  CastList,
  TrailerList,
  Poster,
  LoadingModal,
  SocialMedia,
  EmptyContent,
  SearchList,
  GradientCircle,
  Header,
  WebViewModal,
  ShowMore,
  ReviewList,
  Avatar,
  MovieTVSections,
};
