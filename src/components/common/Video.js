

import React from 'react';
import { View, StyleSheet } from 'react-native';
import Video from 'react-native-video';
import intro from 'assets/video/intro.mp4';
import theme from 'theme';

class AnimationVideo extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Video
          source={intro}
          rate={1.0}
          paused={false}
          resizeMode="cover"
          repeat
          playInBackground={false}
          style={styles.videoStyle}
        />
      </View>);
  }
}


const styles = StyleSheet.create({
  mainContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: theme.size.screenHeight,
    width: theme.size.screenWidth,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',

  },
  videoStyle: {
    height: 270,
    width: 270,

  },
});


AnimationVideo.propTypes = {
};


export default AnimationVideo;
