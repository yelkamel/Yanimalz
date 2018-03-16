import React from 'react';
import { View, Text, Button, StyleSheet, Animated } from 'react-native';
import MapView from 'react-native-maps';

const AREA_LOC_GPS = {
  longitudeDelta: 0.0026429008518391583 * 0.6,
  latitudeDelta: 0.0012644995249289082 * 0.6,
  longitude: 2.3651310669234653,
  latitude: 48.90347782160455
}

class Map extends React.Component {
  map = null

  state = {
    currentPosition: null
  }

  componentWillReceiveProps(nextProps) {


    if (nextProps.isFirstTime !== this.props.isFirstTime) {
      Animated.delay(500).start(() => {
        this.map.animateToRegion(AREA_LOC_GPS, 3000)
      })
      Animated.delay(4000).start(() => {
        this.map.animateToViewingAngle(45, 1000)
      })
      Animated.delay(6000).start(() => {
        this.map.animateToBearing(280, 2000)
        this.map.animateToViewingAngle(0, 2000)
      })
    }
  }

  onRegionChangeComplete = (Region) => {
    // console.log(Region)
  }

  render() {
    const { isFirstTime } = this.props

    return (
      <MapView
        ref={mapView => this.map = mapView}
        style={styles.map}
        onRegionChangeComplete={this.onRegionChangeComplete}
        showsUserLocation={true}
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
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});


export default Map;
