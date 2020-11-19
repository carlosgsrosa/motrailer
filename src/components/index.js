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

  ${(props) =>
    props.backgroundColor && `background-color: ${props.backgroundColor};`};
`;

const Wrapper = styled.View`
  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft}px;`};
  ${(props) => props.marginTop && `margin-top: ${props.marginTop}px;`};
  ${(props) => props.marginRight && `margin-right: ${props.marginRight}px;`};
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};

  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius}px;`};
`;

const ScrollView = styled.ScrollView`
  ${(props) =>
    props.backgroundColor && `background-color: ${props.backgroundColor};`};

  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft}px;`};
  ${(props) => props.marginTop && `margin-top: ${props.marginTop}px;`};
  ${(props) => props.marginRight && `margin-right: ${props.marginRight}px;`};
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};

  ${(props) => props.paddingLeft && `padding-left: ${props.paddingLeft}px;`};
  ${(props) => props.paddingTop && `padding-top: ${props.paddingTop}px;`};
  ${(props) => props.paddingRight && `padding-right: ${props.paddingRight}px;`};
  ${(props) =>
    props.paddingBottom && `padding-bottom: ${props.paddingBottom}px;`};

  ${(props) => props.borderWidth && `border-width: ${props.borderWidth}px;`};

  ${(props) => props.borderColor && `border-color: ${props.borderColor}px;`};
`;

const VerticalView = styled.View`
  ${(props) => props.flex && `flex: ${props.flex};`};

  ${(props) =>
    props.backgroundColor && `background-color: ${props.backgroundColor};`};

  ${(props) => props.alignItems && `align-items: ${props.alignItems};`};
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent};`};

  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft}px;`};
  ${(props) => props.marginTop && `margin-top: ${props.marginTop}px;`};
  ${(props) => props.marginRight && `margin-right: ${props.marginRight}px;`};
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};

  ${(props) => props.paddingLeft && `margin-left: ${props.paddingLeft}px;`};
  ${(props) => props.paddingTop && `margin-top: ${props.paddingTop}px;`};
  ${(props) => props.paddingRight && `margin-right: ${props.paddingRight}px;`};
  ${(props) =>
    props.paddingBottom && `margin-bottom: ${props.paddingBottom}px;`};

  ${(props) => props.borderWidth && `border-width: ${props.borderWidth}px;`};
  ${(props) =>
    props.borderLeftWidth && `border-left-width: ${props.borderLeftWidth}px;`};
  ${(props) =>
    props.borderTopWidth && `border-top-width: ${props.borderTopWidth}px;`};
  ${(props) =>
    props.borderRightWidth &&
    `border-right-width: ${props.borderRightWidth}px;`};
  ${(props) =>
    props.borderBottomWidth &&
    `border-bottom-width: ${props.borderBottomWidth}px;`};

  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius}px;`};

  ${(props) => props.borderColor && `border-color: ${props.borderColor};`};

  ${(props) =>
    props.borderLeftColor && `border-left-color: ${props.borderLeftColor};`};
  ${(props) =>
    props.borderTopColor && `border-top-color: ${props.borderTopColor};`};
  ${(props) =>
    props.borderRightColor && `border-right-color: ${props.borderRightColor};`};
  ${(props) =>
    props.borderBottomColor &&
    `border-bottom-color: ${props.borderBottomColor};`};
`;

const HorizontalView = styled.View`
  flex-direction: row;

  ${(props) => props.flex && `flex: ${props.flex}`};

  ${(props) =>
    props.backgroundColor && `background-color: ${props.backgroundColor}`};
  ${(props) => props.alignItems && `align-items: ${props.alignItems}`};
  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent}`};

  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft}px;`};
  ${(props) => props.marginTop && `margin-top: ${props.marginTop}px;`};
  ${(props) => props.marginRight && `margin-right: ${props.marginRight}px;`};
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};

  ${(props) => props.paddingLeft && `margin-left: ${props.paddingLeft}px;`};
  ${(props) => props.paddingTop && `margin-top: ${props.paddingTop}px;`};
  ${(props) => props.paddingRight && `margin-right: ${props.paddingRight}px;`};
  ${(props) =>
    props.paddingBottom && `margin-bottom: ${props.paddingBottom}px;`};

  border-width: ${(props) => props.borderWidth || '0px'};
  border-color: ${(props) => props.borderColor || colors.transparent};
  border-radius: ${(props) => props.borderRadius || '0px'};
`;

const ItemSeparatorComponent = styled.View`
  ${(props) => props.width && `width: ${props.width}px;`};
  ${(props) => props.height && `height: ${props.height}px;`};
`;

const Text = styled.Text`
  ${(props) => props.fontSize && `font-size: ${props.fontSize}px;`};

  ${(props) => props.width && `width: ${props.width};`};

  color: ${(props) => props.color || colors.black};

  text-align: ${(props) => props.textAlign || 'auto'};

  font-family: ${(props) => props.fontFamily || 'System'};

  background-color: ${(props) => props.backgroundColor || colors.transparent};

  font-weight: ${(props) => props.fontWeight || 'normal'};

  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft}px;`};
  ${(props) => props.marginTop && `margin-top: ${props.marginTop}px;`};
  ${(props) => props.marginRight && `margin-right: ${props.marginRight}px;`};
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};

  ${(props) => props.paddingLeft && `margin-left: ${props.paddingLeft}px;`};
  ${(props) => props.paddingTop && `margin-top: ${props.paddingTop}px;`};
  ${(props) => props.paddingRight && `margin-right: ${props.paddingRight}px;`};
  ${(props) =>
    props.paddingBottom && `margin-bottom: ${props.paddingBottom}px;`};

  border-width: ${(props) => props.borderWidth || '0px'};
  border-color: ${(props) => props.borderColor || colors.transparent};
  border-radius: ${(props) => props.borderRadius || '0px'};
`;

const Image = styled.Image`
  ${(props) => props.width && `width: ${props.width}px;`};
  ${(props) => props.height && `height: ${props.height}px;`};

  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius}px;`};

  ${(props) => props.marginLeft && `margin-left: ${props.marginLeft}px;`};
  ${(props) => props.marginTop && `margin-top: ${props.marginTop}px;`};
  ${(props) => props.marginRight && `margin-right: ${props.marginRight}px;`};
  ${(props) => props.marginBottom && `margin-bottom: ${props.marginBottom}px;`};
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
  ${(props) => props.width && `width: ${props.width}px;`};
  ${(props) => props.height && `height: ${props.height}px;`};

  ${(props) => props.borderRadius && `border-radius: ${props.borderRadius}px;`};

  ${(props) =>
    props.justifyContent && `justify-content: ${props.justifyContent};`};
  ${(props) => props.alignItems && `align-items: ${props.alignItems};`};

  ${(props) => props.overflow && `overflow: ${props.overflow};`};
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
