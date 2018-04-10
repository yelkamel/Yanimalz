import React from 'react';
import { View } from 'react-native';

import Ripple from 'react-native-material-ripple';
import {
  node,
  func,
  any,
} from 'prop-types';
import theme from 'theme';

const TouchableRipple = ({ onPress, style, children }) => (
  <View style={style}>

    <Ripple
      onPress={onPress}
      rippleColor={theme.colors.accent}
      rippleOpacity={0.7}
      rippleDuration={600}
    >
      <View style={style}>
        {children}
      </View>
    </Ripple >
  </View>

);

TouchableRipple.defaultProps = {
  style: {},
};

TouchableRipple.propTypes = {
  children: node.isRequired,
  onPress: func.isRequired,
  style: any,
};

export default TouchableRipple;
