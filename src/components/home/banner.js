import React from 'react';
import { View, Text, ImageBackground, Platform, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';
import banner from 'assets/image/banner.png';
import RNIconic from 'react-native-iconic';
import I18n from 'i18n';

import SubBanner from './subBanner';
import styles from './styles';

class Banner extends React.Component {
  state = {
  };
  componentWillMount() {

  }
  componentDidMount() {

  }


  onPressTab = () => {
    this.props.animeLineUp();
  }

  isHide = false;

  renderShapes() {
    const { isTop } = this.props;

    let shapes = [];

    if (Platform.OS === 'ios') {
      shapes = [
        RNIconic.Shapes.Share,
        RNIconic.Shapes.Download,

        RNIconic.Shapes.UpTriangle,
        RNIconic.Shapes.LeftTriangle,

        RNIconic.Shapes.UpBasic,
        RNIconic.Shapes.DownBasic,

        RNIconic.Shapes.Default,
        RNIconic.Shapes.Add,
        RNIconic.Shapes.Minus,
        RNIconic.Shapes.Close,
        RNIconic.Shapes.Back,
        RNIconic.Shapes.Forward,
        RNIconic.Shapes.Menu,
        RNIconic.Shapes.Paused,
        RNIconic.Shapes.DownArrow,
        RNIconic.Shapes.RightTriangle,
        RNIconic.Shapes.DownTriangle,
        RNIconic.Shapes.Ok,
        RNIconic.Shapes.Rewind,
        RNIconic.Shapes.FastForward,
        RNIconic.Shapes.Square,
      ];
      return (
        <RNIconic
          shape={shapes}
          roundBackgroundColor={theme.colors.primaryLight}
          tintColor={theme.colors.primaryDark}
          size={20}
          selection={isTop ? 1 : 0}
          disable={false}
          lineThickness={3}
          onChange={this.onPressTab}
        />);
    }

    shapes = [
      RNIconic.Shapes.BURGER,
      RNIconic.Shapes.CHECK,
    ];

    return (
      <RNIconic
        shape={shapes}
        tintColor={theme.colors.primaryLight}
        size={40}
        onChange={this.onPressTab}
      />
    );
  }


  render() {
    const { untilEvent } = this.props;
    return (
      <TouchableWithoutFeedback onPress={this.onPressTab}>
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
              {this.renderShapes()}

              <Text style={styles.titleStyle}>{I18n.t('banner_title')}</Text>

              {untilEvent > 0 && <SubBanner />}

            </View>
          </ImageBackground>
        </View>
      </TouchableWithoutFeedback>

    );
  }
}

Banner.propTypes = {
  isTop: PropTypes.bool.isRequired,
  animeLineUp: PropTypes.func.isRequired,
  untilEvent: PropTypes.number.isRequired,
};

export default Banner;
