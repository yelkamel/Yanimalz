import React from 'react';
import { Animated } from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';
import AnimationVideo from '../common/Video';

class Loading extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading !== this.props.isLoading
      && nextProps.isLoading === false) {
      Animated.timing(this.animHeight, {
        toValue: 0,
        duration: 1000,
      }).start();
    }
  }

  animHeight = new Animated.Value(theme.size.screenHeight)

  render() {
    return (
      <Animated.View style={{
        backgroundColor: theme.colors.blackLogo,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        height: this.animHeight,
        overflow: 'hidden',
      }}
      >

        <AnimationVideo />
      </Animated.View >
    );
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};


export default Loading;
