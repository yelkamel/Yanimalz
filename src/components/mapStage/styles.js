import { StyleSheet } from 'react-native';
import theme from 'theme';

export const VIDEO_TOP_POS = theme.size.screenHeight * 0.1;
export const VIDEO_LEFT_POS = theme.size.screenWidth * 0.34;
export const ANIMALZ_WIDTH = theme.size.screenWidth * 0.17;
export const ANIMALZ_HEIGHT = theme.size.screenHeight * 0.08;

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
    height: ANIMALZ_HEIGHT,
    width: ANIMALZ_WIDTH,
    borderRadius: 5,
  },
});
