import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  flexOne: {
    flex: 1,
  },
  flexDirectionRow: {
    flexDirection: 'row',
  },
  textItalic: {
    fontStyle: 'italic',
  },
  flexRow: {
    flex: 1,
    flexDirection: 'row',
  },
  flexCenter: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  absoluteBlack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.colors.black,
  },
});
