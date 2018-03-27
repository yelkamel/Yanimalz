import { StyleSheet } from 'react-native';
import theme from 'theme';

const styles = StyleSheet.create({
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
});

export default styles;
