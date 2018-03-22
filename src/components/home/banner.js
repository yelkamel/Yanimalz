import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';
import banner from 'assets/image/banner.png';
import slideDownGif from 'assets/image/slideDown.gif';

class Banner extends React.Component {
  state = {
  }

  componentDidMount() {

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

  iconOpacity = new Animated.Value(1)
  isHide = false

  render() {
    const { isTop } = this.props;
    return (
      <View style={styles.borderRadiusView}>
        <ImageBackground style={styles.bannerStyle} source={banner}>
          <View style={styles.subContainerView}>
            <Text style={styles.titleStyle}>Time-Line</Text>
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


const styles = StyleSheet.create({
  borderRadiusView: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  titleStyle: {
    fontSize: theme.textSizes.small,
    color: theme.colors.primaryLight,
    fontWeight: 'bold',
    fontFamily: theme.fontFamily.rubikRegular,
  },
  bannerStyle: {
    width: theme.size.screenWidth,
    height: 50,
  },
  slideDownImg: {
    height: 20,
    width: 34,
  },
  subContainerView: {
    height: 50,
    alignItems: 'center',
    marginHorizontal: theme.size.screenWidth * 0.15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});

export default Banner;
