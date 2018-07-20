import React from 'react';
import { Animated, View, Linking } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import PropTypes from 'prop-types';
import { AREA_LOC_GPS, COEF_ZOOM, COLOR_ARRAY } from 'data';
import ImageMaps from 'common/imageMaps';
import logo from 'assets/image/logo.png';
import GridMarker from './gridMarker';
import ShareMarker from './shareMarker';
import UserMarker from './userMarker';
import InfoMarker from './infoMarker';

import MapStyle from '../../mapStyle.json';
import MapLegend from './mapLegend';
import { styles } from './styles';

const INIT_LOGO_POS = {
  longitude: 2.364360,
  latitude: 48.903588,
};


class MapStage extends React.Component {
  state = {
    isLoading: true,
    showMarkerInfo: false,
    markerDone: false,
    userPosition: {
      latitude: null,
      longitude: null,
      error: null,
      isLoading: true,
    },
    sharedPosition: [
    ],
  };


  componentDidMount() {
    this.getUserLocation();

    this.intervalId = setInterval(() => {
      this.getUserLocation();
    }, 5000);

    Linking.addListener('url',
      this.handleOpenURL);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isGridHide !== this.props.isGridHide) {
      this.markerChange();
    }

    if (nextProps.isFirstTime !== this.props.isFirstTime) {
      Animated.delay(500).start(() => {
        this.map.animateToRegion(AREA_LOC_GPS, 1000);

        Animated.delay(1500).start(() => {
          this.map.animateToViewingAngle(45, 800);

          Animated.delay(1000).start(() => {
            //  this.map.animateToViewingAngle(0, 800);
            this.map.animateToBearing(280.5, 1000);

            Animated.delay(1500).start(() => {
              this.map.animateToBearing(280.5, 1000);

              Animated.delay(1200).start(() => {
                this.map.animateToViewingAngle(0, 800);

                this.setState((state) => ({
                  ...state,
                  isLoading: false,
                }));
                Animated.delay(2000).start(() => {
                  this.setState((state) => ({
                    ...state,
                    markerDone: true,
                    showMarkerInfo: true,
                  }));
                });
              });
            });
          });
        });
      });
    }
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
    Linking.removeEventListener('url', this.handleOpenURL);
  }

  getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log('======position========');
        console.log(position);
        console.log('====================================');
        this.setState((state) => ({
          ...state,
          userPosition: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            longitudeDelta: 0.0026429008518391583 * COEF_ZOOM,
            latitudeDelta: 0.0012644995249289082 * COEF_ZOOM,
            error: null,
            isLoading: false,
          },
        }));
      },
      (error) => console.log('Get Current Position Error', error),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );
  }

  markerChange = (callback = () => { }) => {
    this.setState((state) => ({
      ...state,
      markerDone: false,
    }), () => {
      callback();
      Animated.delay(1000).start(() => {
        this.setState((state) => ({
          ...state,
          markerDone: true,
        }));
      });
    });
  }

  handleOpenURL = (event) => {
    this.props.showMap();
    this.markerChange();
    const urlSlipted = event.url.split('/');
    const sharePosition =
      {
        longitude: parseFloat(urlSlipted[urlSlipted.length - 2]),
        latitude: parseFloat(urlSlipted[urlSlipted.length - 1]),
        longitudeDelta: AREA_LOC_GPS.longitudeDelta,
        latitudeDelta: AREA_LOC_GPS.latitudeDelta,
        until: urlSlipted[urlSlipted.length - 3],
        color: COLOR_ARRAY[Math.floor(Math.random() * COLOR_ARRAY.length)],
      };

    this.setState((state) => ({ ...state, showMarkerInfo: false }), () => {
      this.animateToMarker(sharePosition);
      this.setState((state) => ({
        ...state,
        sharedPosition: state.sharedPosition.concat(sharePosition),
      }));
    });
  }

  animateToArea = () => {
    this.map.animateToCoordinate(AREA_LOC_GPS, 1000);
  }

  animateToUser = () => {
    if (this.state.userPosition.longitude) {
      this.map.animateToCoordinate(this.state.userPosition, 2000);
    }
  }

  animateToMarker = (coord) => {
    const { hideAnimalz, isGridHide } = this.props;

    if (!isGridHide) {
      hideAnimalz();
    }

    this.map.animateToBearing(0, 500);
    Animated.delay(800).start(() => {
      this.map.animateToRegion(coord, 2000);
      Animated.delay(3000).start(() => {
        this.map.animateToRegion(AREA_LOC_GPS, 2000);
        Animated.delay(2500).start(() => {
          this.map.animateToBearing(280.5, 1000);
          Animated.delay(1500).start(() => {
            if (!isGridHide) {
              hideAnimalz();
            }
            this.setState((state) => ({ ...state, showMarkerInfo: true }));
          });
        });
      });
    });
  }

  removeFromSharePosition = (index) => {
    this.markerChange();

    if (index > -1) {
      this.state.sharedPosition.splice(index, 1);
      const tmpData = this.state.sharedPosition;
      this.setState((state) => ({
        ...state,
        sharedPosition: tmpData,
      }));
    }
  }

  intervalId = null
  map = null;
  itemOpacity = new Animated.Value(0);

  renderSharedPosition() {
    if (this.state.sharedPosition.length > 0) {
      return this.state.sharedPosition.map((share, index) => (
        <ShareMarker
          key={share.latitude + share.longitude}
          longitude={share.longitude}
          latitude={share.latitude}
          color={share.color}
          until={share.until * 60}
          index={index}
          onFinish={this.removeFromSharePosition}
          animateToMarker={this.animateToMarker}
          tracksViewChanges={!this.state.markerDone}
        />
      ));
    }
    return null;
  }

  renderUserPosition() {
    if (!this.state.userPosition.isLoading) {
      return (
        <UserMarker
          longitude={this.state.userPosition.longitude}
          latitude={this.state.userPosition.latitude}
          tracksViewChanges={!this.state.markerDone}
        />);
    }
    return null;
  }
  renderGridMarker() {
    if (!this.state.isLoading) {
      return (
        <GridMarker
          tracksViewChanges={!this.state.markerDone}
          isHide={this.props.isGridHide}
        />);
    }
    return null;
  }

  render() {
    const { isFirstTime, isGridHide, viewRef } = this.props;
    // Test 2.3651089   48.9036151
    return (
      <View
        style={styles.container}
        collapsable={false}
        ref={viewRef}
      >
        <MapView
          ref={(mapView) => (this.map = mapView)}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          cacheEnabled={!isFirstTime}
          showsUserLocation
          showsMyLocationButton={false}
          scrollEnabled={false}
          rotateEnabled={false}
          zoomControlEnabled={false}
          zoomEnabled={false}
          showsScale={false}
          showsCompass={false}
          showsPointsOfInterest={false}
          showsTraffic={false}

        >
          {this.renderGridMarker()}
          {this.renderSharedPosition()}
          <InfoMarker
            show={this.state.showMarkerInfo}
          />
          <Marker
            tracksViewChanges={!this.state.markerDone}
            anchor={{ x: 0.7, y: 2.2 }}
            coordinate={INIT_LOGO_POS}
            style={{ zIndex: 1 }}
          >
            <ImageMaps
              source={logo}
              style={styles.logoStyle}
            />

          </Marker>
        </MapView>

        {MapLegend(!isGridHide)}

      </View >
    );
  }
}
/*

*/

MapStage.defaultProps = {
  viewRef: () => { },
};

MapStage.propTypes = {
  showMap: PropTypes.func.isRequired,
  isFirstTime: PropTypes.bool.isRequired,
  isGridHide: PropTypes.bool.isRequired,
  hideAnimalz: PropTypes.func.isRequired,
  viewRef: PropTypes.func,
};


export default MapStage;
