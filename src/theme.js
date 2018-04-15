/* eslint global-require: 0 */
import { Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default {
  maxTextSize: 70,
  colors: {
    white: '#FFF',
    black: '#000',
    red: '#FF676C',
    blackLogo: '#11020D',
    // couleur du theme
    primaryLight: '#C58BAC',
    primary: '#4C2F41',
    primaryDark: '#20050E',
    accent: '#27FFFF',
    grey: '#867274',

    // MARKER INFO
    grid: '#9575CD',
    gate: '#500E44',
    toilette: '#C05E15',
    hideMap: '#AA2225',
    hideMapBorder: '#991E23',

  },
  time: {
    splashScreenDelay: 2500,
    bannerShowIconDelay: 10000,
  },
  textSizes: {
    xxxsmall: 10,
    xxsmall: 13,
    notif: 15,
    xsmall: 16,
    small: 18,
    regular: 22,
    normal: 24,
    xnormal: 26,
    big: 36,
    xbig: 50,
    xxbig: 58,
  },
  fontFamily: {
    rubikRegular: 'Rubik-Regular',
    rubikMedium: 'Rubik-Medium',
    rubikLight: 'Rubik-Light',
  },
  size: {
    screenWidth: width,
    screenHeight: Platform.OS === 'ios' ? height : height - 30,
    hideElasticSize: 50,
    slideMaxValue: 25,
    bannerHeight: 50,
    bannerHeightLight: 70,
    pastEventHeight: 40,
    currentEventHeight: 60,
    nextEventHeight: 120,
  },
};
