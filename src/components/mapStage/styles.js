import { StyleSheet, Dimensions, Platform } from 'react-native';
import theme from 'theme';

const { height } = Dimensions.get('window');
const IMAGE_COEF_WIDTH = Platform.OS === 'ios' ? 0.18 : 0.17;
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
    marginBottom: theme.size.bannerHeight,
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
  gridMarkerView: {
    height: ANIMALZ_HEIGHT,
    width: ANIMALZ_WIDTH,
    backgroundColor: Platform.OS === 'ios' ? theme.colors.grid : 'transparent',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },

  gridMarkerText: {
    fontSize: theme.textSizes.xnormal,
    color: theme.colors.primaryDark,
    textAlign: 'center',
    fontFamily: theme.fontFamily.rubikRegular,
    fontWeight: 'bold',
  },

  legendView: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLegendView: {
    backgroundColor: Platform.OS === 'ios' ? theme.colors.grid : 'transparent',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridLegendText: {
    fontSize: theme.textSizes.regular,
    color: theme.colors.primaryDark,
    marginVertical: 10,
    marginHorizontal: 20,
    textAlign: 'center',
    fontFamily: theme.fontFamily.rubikRegular,
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
    //  borderRadius: 30,
    width: theme.size.screenWidth * 0.65,
    //  backgroundColor: theme.colors.primary,
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
