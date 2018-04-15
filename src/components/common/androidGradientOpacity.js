import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';

const styles = StyleSheet.create({
  androidOpacityLevel1: {
    position: 'absolute',
    backgroundColor: theme.colors.grid,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.3,
    borderRadius: 20,
  },
  androidOpacityLevel2: {
    position: 'absolute',
    backgroundColor: theme.colors.grid,
    top: 10,
    left: 10,
    right: 10,
    bottom: 10,
    opacity: 0.4,
    borderRadius: 20,
  },
  androidOpacityLevel3: {
    position: 'absolute',
    backgroundColor: theme.colors.grid,
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    opacity: 0.6,
    borderRadius: 20,
  },
});


const AndroidGradientOpacity = ({ globaleOpacity, children }) => (
  <View style={{ opacity: globaleOpacity }}>
    <View style={styles.androidOpacityLevel1} />
    <View style={styles.androidOpacityLevel2} />
    {children}
  </View>
);


AndroidGradientOpacity.propTypes = {
  children: PropTypes.any.isRequired,
  globaleOpacity: PropTypes.number,
};

AndroidGradientOpacity.defaultProps = {
  globaleOpacity: 0.8,
};

export default AndroidGradientOpacity;
