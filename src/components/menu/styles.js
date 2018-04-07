import { StyleSheet } from 'react-native';
import theme from 'theme';

const styles = StyleSheet.create({
  // MENU
  menuContainer: {
    position: 'absolute',
    bottom: theme.size.bannerHeight + 10,
    left: 0,
    height: theme.size.screenHeight * 0.3,
    width: theme.size.screenWidth,

  },
  shareView: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    overflow: 'hidden',
  },
  notifSettingView: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    overflow: 'hidden',
  },
  safeBatteryView: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.primary,
    overflow: 'hidden',
  },
  root: {
    backgroundColor: theme.colors.primaryLight,
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem3: {
    position: 'absolute',
    bottom: -15,
    right: 20,
    backgroundColor: theme.colors.primaryLight,
    height: 20,
    width: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuItem2: {
    position: 'absolute',
    top: 40,
    right: -8,
    backgroundColor: theme.colors.primaryLight,
    height: 20,
    width: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '40deg' }],
  },
  menuItem1: {
    position: 'absolute',
    top: 3,
    right: -10,
    backgroundColor: theme.colors.primaryLight,
    height: 20,
    width: 20,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    transform: [{ rotate: '65deg' }],
  },
});

export default styles;
