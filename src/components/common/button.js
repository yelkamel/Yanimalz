import React from 'react';
import { View, Text } from 'react-native';
import {
  string,
  func,
  any,
} from 'prop-types';
import theme from 'theme';
import TouchableRipple from './touchableRipple';

const Button = ({ onPress, label, style }) => (
  <View style={{
    width: 120,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    borderColor: theme.colors.accent,
    borderWidth: 1,
    backgroundColor: theme.colors.primaryLight,
  }}
  >
    <TouchableRipple
      onPress={onPress}
    >
      <View style={{
        width: 120,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 30,
        overflow: 'hidden',
      }}
      >


        <Text style={{
          color: theme.colors.primaryDark,
        }}
        >
          {label}
        </Text>
      </View>

    </TouchableRipple>
  </View>


);

Button.defaultProps = {
  style: {},
};

Button.propTypes = {
  label: string.isRequired,
  onPress: func.isRequired,
  style: any,
};

export default Button;
