import React from 'react';
import { View, Text, ImageBackground, Animated, TouchableHighlight } from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';
import banner from 'assets/image/banner.png';
// import slideDownGif from 'assets/image/slideDown.gif';
import I18n from 'i18n';

import SubBanner from './subBanner';
import styles from './styles';

class Banner extends React.Component {
  state = {};
  componentWillMount() {

  }
  componentDidMount() {

  }

  isHide = false;

  render() {
    const { isTop, animeLineUp, untilEvent } = this.props;
    return (
      <TouchableHighlight onPress={() => animeLineUp()} >

        <View
          style={[
            styles.borderRadiusView,
            {
              height: untilEvent > 0 ? theme.size.bannerHeight : theme.size.bannerHeightLight,
            },
          ]}
        >
          <ImageBackground style={styles.bannerStyle} source={banner}>
            <View style={styles.subContainerView}>
              <Text style={styles.titleStyle}>{I18n.t('banner_title')}</Text>

              {untilEvent > 0 && <SubBanner />}

            </View>
          </ImageBackground>
        </View>
      </TouchableHighlight>

    );
  }
}

Banner.propTypes = {
  isTop: PropTypes.bool.isRequired,
  isAnimate: PropTypes.bool.isRequired,
  animeLineUp: PropTypes.func.isRequired,
  untilEvent: PropTypes.number.isRequired,
};

export default Banner;
