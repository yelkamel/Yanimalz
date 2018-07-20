import React from 'react';
import { ImageBackground, Image, Platform, Text } from 'react-native';
import {
  any,
} from 'prop-types';


const ImageMaps = ({ source, style }) => {
  if (Platform.OS === 'android') {
    return (
      <ImageBackground
        source={source}
        style={style}
      >
        <Text style={{ width: 0, height: 0 }}>{Math.random()}</Text>
      </ImageBackground>
    );
  }

  return (
    <Image
      source={source}
      style={style}
    />);
};

ImageMaps.defaultProps = {
  style: {},
};

ImageMaps.propTypes = {
  source: any.isRequired,
  style: any,
};

export default ImageMaps;
