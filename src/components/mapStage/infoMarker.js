import React from 'react';
import { View, Platform, Image, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import theme from 'theme';
import appStyles from 'appStyles';
import wc from 'assets/image/wc.png';
import controls from 'assets/image/controls.png';
import drink from 'assets/image/drink.png';

const GRID_MARKER_POSITION = {
  longitude: 2.36534,
  latitude: 48.90328,
};

const BAR_HEIGHT = theme.size.screenHeight * 0.06;
const DOORS_HEIGHT = theme.size.screenHeight * 0.03;

const WALL_COEF_LEFT = Platform.OS === 'ios' ? 0.35 : 0.32;
const WALL_COEF_TOP = Platform.OS === 'ios' ? 0.07 : 0.05;
const CONTROL_COEF_LEFT = 0.13;
class InfoMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      tracksViewChanges: true,
    };
  }
  opacityValue = new Animated.Value(Platform.OS === 'ios' ? 0 : 1)
  componentWillReceiveProps(nextProps) {
    if (nextProps.show !== this.props.show) {
      console.log('==SHOW INFO==');
      this.setState((state) => ({
        ...state,
        tracksViewChanges: true,
        show: nextProps.show,
      }), () => {
        Animated.timing(this.opacityValue, {
          toValue: 1,
          duration: 1000,
        }).start(
          () => {
            this.setState((state) => ({
              ...state,
              tracksViewChanges: false,
            }));
          });
      });
    }
  }

  renderWall() {
    return (
      <Animated.View style={[
        {
          position: 'absolute',
          left: theme.size.screenWidth * WALL_COEF_LEFT,
          top: theme.size.screenHeight * WALL_COEF_TOP,
          height: theme.size.screenHeight * 0.70,
          width: 50,
          backgroundColor: theme.colors.hideMap,
          borderRightColor: theme.colors.hideMapBorder,
          borderRightWidth: 4,
          opacity: this.opacityValue,
        }]}
      />
    );
  }

  renderWC() {
    return (
      <Animated.View style={[
        appStyles.absolute,
        {
          opacity: this.opacityValue,
        }]}
      >
        <View style={{
          position: 'absolute',
          left: theme.size.screenWidth * WALL_COEF_LEFT,
          bottom: theme.size.screenHeight * 0.13,
          height: theme.size.screenHeight * 0.05,
          width: theme.size.screenHeight * 0.06,
          backgroundColor: theme.colors.toilette,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.8,
        }}
        >
          <Image
            source={wc}
            style={{ height: 25, width: 25 }}
          />
        </View>

        <View style={{
          position: 'absolute',
          left: theme.size.screenWidth * WALL_COEF_LEFT,
          bottom: theme.size.screenHeight * 0.40,
          height: theme.size.screenHeight * 0.05,
          width: theme.size.screenHeight * 0.06,
          backgroundColor: theme.colors.toilette,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.8,
        }}
        >
          <Image
            source={wc}
            style={{ height: 25, width: 25 }}
          />
        </View>

      </Animated.View >
    );
  }
  renderControl() {
    return (
      <Animated.View style={[
        appStyles.absolute,
        {
          opacity: this.opacityValue,
        }]}
      >
        <View style={{
          position: 'absolute',
          left: theme.size.screenWidth * CONTROL_COEF_LEFT,
          bottom: theme.size.screenHeight * 0.28,
          height: theme.size.screenHeight * 0.1,
          width: theme.size.screenHeight * 0.06,
          backgroundColor: theme.colors.toilette,
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0.8,
        }}
        >
          <Image
            source={controls}
            style={{ height: 20, width: 20 }}
          />
        </View>

      </Animated.View >
    );
  }

  renderDrink() {
    return (
      <Animated.View style={[
        appStyles.absolute,
        {
          opacity: this.opacityValue,
        }]}
      >
        <View style={{
          position: 'absolute',
          left: theme.size.screenWidth * WALL_COEF_LEFT - 15,
          top: theme.size.screenHeight * 0.22,
          height: BAR_HEIGHT,
          width: 15,
          backgroundColor: theme.colors.toilette,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Image
            source={drink}
            style={{ height: 25, width: 15 }}
          />
        </View>
        <View style={{
          position: 'absolute',
          left: 10,
          top: theme.size.screenHeight * 0.25,
          height: BAR_HEIGHT,
          width: 15,
          backgroundColor: theme.colors.toilette,
          borderTopRightRadius: 5,
          borderBottomRightRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <Image
            source={drink}
            style={{ height: 25, width: 15 }}
          />
        </View>
        <View style={{
          position: 'absolute',
          left: theme.size.screenWidth * WALL_COEF_LEFT - 15,
          bottom: theme.size.screenHeight * 0.2,
          height: BAR_HEIGHT,
          width: 15,
          backgroundColor: theme.colors.toilette,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 1,
        }}
        >
          <Image
            source={drink}
            style={{ height: 25, width: 15 }}
          />

        </View>


      </Animated.View >
    );
  }
  /*
  HIDDEN DOORS :
          <View style={{
            position: 'absolute',
            left: 0,
            top: theme.size.screenHeight * 0.08,
            height: DOORS_HEIGHT,
            width: 8,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            backgroundColor: theme.colors.gate,
          }}
          />

          <View style={{
            position: 'absolute',
            left: 0,
            top: theme.size.screenHeight * 0.15,
            height: DOORS_HEIGHT,
            width: 8,
            borderTopLeftRadius: 5,
            borderBottomLeftRadius: 5,
            backgroundColor: theme.colors.gate,
          }}
          />


  */
  renderMarker() {
    if (!this.state.show) {
      return (
        <View
          style={{ height: 5, width: 5, backgroundColor: 'transparent' }}
        />);
    }

    return (
      <View style={{
        height: theme.size.screenHeight * 0.8,
        width: theme.size.screenWidth * 0.6,

      }}
      >

        <View style={{
          position: 'absolute',
          left: 2,
          bottom: theme.size.screenHeight * 0.19,
          height: DOORS_HEIGHT,
          width: 10,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          backgroundColor: theme.colors.gate,
        }}
        />

        <View style={{
          position: 'absolute',
          left: 2,
          bottom: theme.size.screenHeight * 0.33,
          height: DOORS_HEIGHT,
          width: 10,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          backgroundColor: theme.colors.gate,
        }}
        />


        <View style={{
          position: 'absolute',
          left: 2,
          bottom: theme.size.screenHeight * 0.40,
          height: DOORS_HEIGHT,
          width: 10,
          borderTopLeftRadius: 5,
          borderBottomLeftRadius: 5,
          backgroundColor: theme.colors.gate,
        }}
        />

        <View style={{
          position: 'absolute',
          left: 10,
          bottom: theme.size.screenHeight * 0.072,
          height: 10,
          width: theme.size.screenHeight * 0.035,
          borderBottomRightRadius: 5,
          borderBottomLeftRadius: 5,
          backgroundColor: theme.colors.gate,
        }}
        />
        {this.renderWall()}
        {this.renderWC()}
        {this.renderWC()}
        {this.renderControl()}
        {this.renderDrink()}
      </View>
    );
  }


  render() {
    return (
      <Marker.Animated
        tracksViewChanges={this.state.tracksViewChanges}
        anchor={{ x: 0.04, y: 0.8 }}
        coordinate={GRID_MARKER_POSITION}
        style={{ zIndex: -1 }}
      >
        {this.renderMarker()}
      </Marker.Animated>
    );
  }
}

InfoMarker.propTypes = {
  show: PropTypes.bool.isRequired,
};

export default InfoMarker;
