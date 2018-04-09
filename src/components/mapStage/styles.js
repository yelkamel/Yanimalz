import { StyleSheet, Dimensions, Platform } from 'react-native';
import theme from 'theme';

const { height } = Dimensions.get('window');
const IMAGE_COEF_WIDTH = Platform.OS === 'ios' ? 0.215 : 0.2;
const IMAGE_COEF_HEIGHT = Platform.OS === 'ios' ? 0.13 : 0.13;

export const ANIMALZ_HEIGHT = height * IMAGE_COEF_HEIGHT;
export const ANIMALZ_WIDTH = theme.size.screenWidth * IMAGE_COEF_WIDTH;

export const LOGO_HEIGHT = height * 0.07;
export const LOGO_WIDTH = theme.size.screenWidth * 0.50;

export const styles = StyleSheet.create({
  // MAP
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  djImage: {
    width: 90,
    height: 90,
    borderRadius: 15,
    borderWidth: 4,
    borderColor: theme.colors.primary,
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  logoStyle: {
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    borderRadius: 5,
  },
  animalzStyle: {
    height: ANIMALZ_HEIGHT,
    width: ANIMALZ_WIDTH,
    borderRadius: 5,
  },
  // Animalz
  gradient: {
    flexDirection: 'row',
    flex: 1,
    margin: 1,
    width: theme.size.screenWidth * 0.5,
  },
  currentEventMapContainer: {
    height: 50,
    width: theme.size.screenWidth * 0.6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
    borderWidth: 2,
    borderColor: theme.colors.primaryDark,
  },
  currentEventTextMap: {
    fontSize: theme.textSizes.small,
    color: theme.colors.primaryDark,
    marginHorizontal: 10,
    textAlign: 'center',
    fontFamily: theme.fontFamily.rubikRegular,
  },
});
