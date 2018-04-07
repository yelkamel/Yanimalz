import React from 'react';
import { Animated, PanResponder, View } from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';
import ResponsiveImage from 'react-native-responsive-image';

import styles from './styles';

const SLIDE_MAX_VALUE = theme.size.slideMaxValue;
const SWITCH_TO_VALUE = 50;

class PictureSwitch extends React.Component {
  state = {
    isFirstAnimate: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen && nextProps.isOpen) {
      this.openSwitch();
    } else if (nextProps.animate !== this.props.animate && nextProps.animate) {
      this.setState(
        (state) => ({ ...state, isFirstAnimate: true }),
        () => {
          this.openAndCloseSwitch(() => {
            this.setState(
              (state) => ({ ...state, isFirstAnimate: false }));
          });
        });
    }
  }

  validationNotif = () => {
    if (this.props.enabled && !this.state.isFirstAnimate) {
      this.props.action(this.props.value);
    }
  };

  openAndCloseSwitch = (call = () => { }) => {
    Animated.timing(this.scrollValue, {
      toValue: SWITCH_TO_VALUE,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(this.scrollValue, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start(call);
    });
  }

  closeSwitch = (call = () => { }) => {
    Animated.timing(this.scrollValue, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(call);
  }


  openSwitch = (call = () => { }) => {
    Animated.timing(this.scrollValue, {
      toValue: SWITCH_TO_VALUE,
      duration: 100,
      useNativeDriver: true,
    }).start(call);
  }

  scrollValue = new Animated.Value(0);
  scroll = null;
  isAnimate = false;
  panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: (event, { dx }) => (Math.abs(dx) <= SLIDE_MAX_VALUE),
    onMoveShouldSetPanResponderCapture: (event, { dx }) => (Math.abs(dx) <= SLIDE_MAX_VALUE),
    onPanResponderMove: (event, { dx }) => {
      if (dx >= SLIDE_MAX_VALUE && !this.isAnimate) {
        this.isAnimate = true;
        this.openSwitch(this.validationNotif);
        return false;
      } else if (dx <= -SLIDE_MAX_VALUE && !this.isAnimate) {
        this.isAnimate = true;
        this.closeSwitch(this.validationNotif);
        return false;
      }
      return true;
    },
    onPanResponderRelease: () => {
      this.isAnimate = false;
      return true;
    },
  });

  render() {
    const { picture, enabled, icon } = this.props;
    const borderAnimated = this.scrollValue.interpolate({
      inputRange: [0, SWITCH_TO_VALUE],
      outputRange: [0.01, 1],
    });

    return (
      <Animated.View {...this.panResponder.panHandlers}>
        {enabled && (
          <Animated.View
            style={[
              styles.borderOpen,
            ]}
          >

            <Animated.View
              style={[
                styles.lightShow,
                {
                  transform: [{ scale: borderAnimated }],
                },
              ]}
            >
              <ResponsiveImage
                initWidth="60"
                initHeight="60"
                source={icon}
                style={styles.icon}
              />
            </Animated.View>

          </Animated.View>
        )}
        <Animated.Image
          source={picture}
          style={[styles.image, {
            transform: [{ translateX: this.scrollValue }],
          }]}
        />
      </Animated.View>


    );
  }
}

PictureSwitch.defaultProps = {
  picture: null,
  icon: null,
  animate: false,
};

PictureSwitch.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  picture: PropTypes.number,
  enabled: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  animate: PropTypes.bool,
  icon: PropTypes.number,
};

export default PictureSwitch;
