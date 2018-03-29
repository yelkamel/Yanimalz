import React from 'react';
import { Animated, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import theme from 'theme';
import AnimationVideo from '../common/animationVideo';
import MapStyle from '../../mapStyle.json';
import styles from './styles';

const AREA_LOC_GPS = {
  longitudeDelta: 0.0026429008518391583 * 0.6,
  latitudeDelta: 0.0012644995249289082 * 0.6,
  longitude: 2.3651310669234653,
  latitude: 48.90347782160455,
};

const VIDEO_TOP_POS = theme.size.screenHeight * 0.1;
const VIDEO_LEFT_POS = theme.size.screenWidth * 0.34;
const VIDEO_WIDTH = theme.size.screenWidth * 0.36;
const VIDEO_HEIGHT = theme.size.screenHeight * 0.16;


class MapStage extends React.Component {
  state = {
  }

  componentDidMount() {

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isFirstTime !== this.props.isFirstTime) {
      Animated.delay(500).start(() => {
        this.map.animateToRegion(AREA_LOC_GPS, 1000);

        Animated.delay(1500).start(() => {
          this.map.animateToViewingAngle(45, 800);

          Animated.delay(1000).start(() => {
            this.map.animateToViewingAngle(0, 800);
            this.map.animateToBearing(280, 1000);

            Animated.delay(1500).start(() => {
              this.map.animateToViewingAngle(0, 800);
              this.map.animateToBearing(280, 1000);

              Animated.delay(1500).start(() => {
                this.props.onFinishAnimation();
                Animated.timing(this.pictureOpacity, {
                  toValue: 1,
                }).start();
              });
            });
          });
        });
      });
    }
  }

  map = null;
  pictureOpacity = new Animated.Value(0);


  renderPicture() {
    const { eventInfo: { picture } } = this.props;

    if (picture) {
      return (

        <View style={{ position: 'absolute', top: 60, left: 150, height: 100, width: 100 }} >

          <Animated.Image
            source={picture}
            style={[
              styles.djImage, {
                opacity: this.pictureOpacity,
              },
            ]}
          />
        </View>

      );
    }

    return (
      <View style={{ position: 'absolute', top: VIDEO_TOP_POS, left: VIDEO_LEFT_POS, height: 210, width: 210 }} >
        <AnimationVideo
          heightSize={VIDEO_HEIGHT}
          widthSize={VIDEO_WIDTH}
          animatedStyle={{
            opacity: this.pictureOpacity,
          }}
        />
      </View>
    );
  }

  render() {
    const { isFirstTime } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          ref={(mapView) => this.map = mapView}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          showsUserLocation
          cacheEnabled={!isFirstTime}
          scrollEnabled={false}
          rotateEnabled={false}
          zoomControlEnabled={false}
          zoomEnabled={false}
          showsScale={false}
        />
        {this.renderPicture()}
      </View>

    );
  }
}

MapStage.propTypes = {
  onFinishAnimation: PropTypes.func.isRequired,
  isFirstTime: PropTypes.bool.isRequired,
  eventInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  eventInfo: state.timeline.currentEvent,
});

export default connect(mapStateToProps)(MapStage);

