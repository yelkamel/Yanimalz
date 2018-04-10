import React from 'react';
import { Animated, Easing, View } from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';
import ResponsiveImage from 'react-native-responsive-image';
import TouchableRipple from 'common/touchableRipple';
import PushNotification from 'react-native-push-notification';

import styles from './styles';


// const SLIDE_MAX_VALUE = theme.size.slideMaxValue;
const SWITCH_TO_VALUE = 50;

class PictureSwitch extends React.Component {
  state = {
    // isFirstAnimate: false,
    isOpen: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.isOpen !== this.props.isOpen && nextProps.isOpen) {
      Animated.timing(this.scrollValue, {
        toValue: SWITCH_TO_VALUE,
        duration: 300,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start();
    } /* else if (nextProps.animate !== this.props.animate && nextProps.animate) {
      this.setState(
        (state) => ({ ...state, isFirstAnimate: true }),
        () => {
          this.openAndCloseSwitch(() => {
            this.setState(
              (state) => ({ ...state, isFirstAnimate: false }));
          });
        });
    } */
  }


  onPressPicture = () => {
    console.log('=this.state.isOpen==');
    console.log(this.state.isOpen);

    if (this.state.isOpen) {
      this.closeSwitch();
    } else {
      this.openSwitch();
    }
  }

  openAndCloseSwitch = (call) => {
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

  closeSwitch = () => {
    this.validationNotif(false);
    Animated.timing(this.scrollValue, {
      toValue: 0,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      this.setState(
        (state) => ({
          ...state,
          isOpen: false,
        }));
    });
  }


  openSwitch = () => {
    if (!this.state.isLoading) {
      this.validationNotif(true);
    }
    Animated.timing(this.scrollValue, {
      toValue: SWITCH_TO_VALUE,
      duration: 300,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      this.setState(
        (state) => ({ ...state, isOpen: true }));
    });
  }

  validationNotif = (addNotif) => {
    if (!this.state.isFirstAnimate) {
      PushNotification.configure({
        onRegister(token) {
          console.log('TOKEN:', token);
        },
        onNotification(notification) {
          console.log('NOTIFICATION:', notification);
        },
        permissions: {
          alert: true,
          badge: true,
          sound: true,
        },
        popInitialNotification: true,
        requestPermissions: true,
      });
      this.props.action(this.props.value, addNotif);
    }
  };

  scrollValue = new Animated.Value(0);
  scroll = null;
  isAnimate = false;
  /*
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
  }); */


  render() {
    const { picture, enabled, icon } = this.props;
    const borderAnimated = this.scrollValue.interpolate({
      inputRange: [0, SWITCH_TO_VALUE],
      outputRange: [0.01, 1],
    });

    return (
      <TouchableRipple onPress={this.onPressPicture}>
        <View style={{ height: 70, width: 120, borderRadius: 30 }}>
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
        </View>

      </TouchableRipple>
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
