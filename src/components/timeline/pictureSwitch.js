import React from 'react';
import { Image, Animated, Easing } from 'react-native';
import PropTypes from 'prop-types';

import theme from 'theme';

import styles from './styles';


class PictureSwitch extends React.Component {
  state={
    isOpen: false,
  }


  componentWillMount() {
  }


  animateToMiddle= () => {
    if (this.props.enabled) {
      this.props.action();
      this.setState((state) => ({ ...state, isOpen: !this.state.isOpen }), () => {
        Animated.timing(this.borderWidthAnimated, {
          toValue: this.state.isOpen ? 1 : 0,
          duration: 500,
          easing: Easing.linear,
        }).start(() => {
          this.isAnimated = false;
        });
      });
    }
  }
  isAnimate = false;
  borderWidthAnimated= new Animated.Value(0);
  scrollValue= new Animated.Value(0);
  /*
  openEvent = () => {
    console.log('OPEN EVENT');
    Animated.delay(1000).start(() => {
      this.setState((state) => ({ ...state, isClose: true }));
    });
  }

  closeEvent = () => {
    console.log('CLOSE EVENT');
    this.props.setNotifForEvent(this.props.rowId);
  }
  */

  render() {
    const { picture, enabled } = this.props;

    return (
      <Animated.ScrollView
        scrollEventThrottle={5}
        horizontal
        bounces
        style={{ flex: 1, paddingLeft: theme.size.screenWidth * 0.2 }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: this.scrollValue } } }],
        { useNativeDriver: true },
        )}
        onMomentumScrollEnd={this.animateToMiddle}
        directionalLockEnabled
        scrollEnabled={enabled}
      >
        {enabled && <Animated.View
          style={[styles.borderOpen, {
            transform: [{ translateX: this.scrollValue }],
          }]}
                    >
          <Animated.View style={[styles.lightShow, {
            transform: [{ scale: this.borderWidthAnimated }],
          }]}
          />

        </Animated.View>
        }
        <Image
          source={picture}
          style={styles.image}
        />
      </Animated.ScrollView>

    );
  }
}

PictureSwitch.defaultProps = {
  picture: null,
};

PictureSwitch.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  picture: PropTypes.number,
  enabled: PropTypes.bool.isRequired,
};

export default PictureSwitch;
