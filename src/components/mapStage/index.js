import React from 'react';
import { Animated } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import PropTypes from 'prop-types';
import MapStyle from '../../mapStyle.json';
import styles from './styles';

const AREA_LOC_GPS = {
  longitudeDelta: 0.0026429008518391583 * 0.6,
  latitudeDelta: 0.0012644995249289082 * 0.6,
  longitude: 2.3651310669234653,
  latitude: 48.90347782160455,
};

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
              });
            });
          });
        });
      });
    }
  }


  map = null

  render() {
    const { isFirstTime } = this.props;

    return (
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

    );
  }
}
/*
        cacheEnabled={true}
        scrollEnabled={false}
        rotateEnabled={false}
        zoomControlEnabled={false}
        zoomEnabled={false}
        showsScale={false}
*/


MapStage.propTypes = {
  onFinishAnimation: PropTypes.func.isRequired,
  isFirstTime: PropTypes.bool.isRequired,
};

export default MapStage;
