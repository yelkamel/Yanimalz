import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import intro from 'assets/video/intro.mp4';
import Video from 'react-native-video';
import PropTypes from 'prop-types';

class Loading extends React.Component {


  componentWillReceiveProps(nextProps) {

    if (nextProps.isLoading !== this.props.isLoading
      && nextProps.isLoading === false) {

      Animated.timing(this.scale, {
        toValue: 0,
        duration: 1000,
      }).start()
    }
  }

  scale = new Animated.Value(1)

  render() {
    return (
      <Animated.View style={{
        backgroundColor: 'black',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        transform: [{ scale: this.scale }]
      }}>
        <View style={styles.mainContainer}>
          <Video source={intro}
            rate={1.0}
            volume={1.0}
            muted={false}
            paused={false}
            resizeMode="cover"
            repeat={true}
            playInBackground={false}
            style={styles.videoStyle}
          />
        </View>
      </Animated.View >
    )
  }
}

Loading.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoStyle: {
    height: 270,
    width: 270
  },
});

export default Loading;
