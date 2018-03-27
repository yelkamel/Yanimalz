import React from 'react';
import {
  View,
  Text,
  ImageBackground,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';
import banner from 'assets/image/banner.png';
import slideDownGif from 'assets/image/slideDown.gif';
import I18n from 'i18n';

import styles from './styles';

class Banner extends React.Component {
  state = {
  }

  componentDidMount() {
    Animated.delay(theme.time.bannerShowIconDelay).start(() => {
      this.animateIconOpacity();
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isAnimate !== nextProps.isAnimate && nextProps.isAnimate) {
      this.animateIconOpacity();
    }
  }

  animateIconOpacity = () => {
    Animated.timing(this.iconOpacity,
      {
        toValue: 0,
      }).start(() => {
      Animated.timing(this.iconOpacity,
        {
          toValue: 1,
          delay: 2000,
        }).start();
    });
  }

  iconOpacity = new Animated.Value(0)
  isHide = false

  render() {
    const { isTop } = this.props;
    return (
      <View style={styles.borderRadiusView}>
        <ImageBackground style={styles.bannerStyle} source={banner}>
          <View style={styles.subContainerView}>
            <Text style={styles.titleStyle}>{I18n.t('banner_title')}</Text>
            <Animated.Image
              source={slideDownGif}
              style={[styles.slideDownImg, {
                opacity: this.iconOpacity,
                transform: [{ rotate: isTop ? '0deg' : '180deg' }],
              }]}
            />
          </View>
        </ImageBackground>
      </View>


    );
  }
}

Banner.propTypes = {
  isTop: PropTypes.bool.isRequired,
  isAnimate: PropTypes.bool.isRequired,
};

export default Banner;
