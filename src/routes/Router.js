import React from 'react';

import { StackNavigator } from 'react-navigation';
import { Home, Map, Artist } from './pages';

const navigationOptions = {
  headerMode: 'none',
  initialRouteName: 'Home',
};

export default StackNavigator(
  {
    Home: {
      screen: Home,
    },
    Map: {
      screen: Map,
    },
    Artist: {
      screen: Artist,
    },
  },
  navigationOptions
);
