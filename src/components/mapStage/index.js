import React from 'react';
import { Animated, View, Linking, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import PropTypes from 'prop-types';

import logo from 'assets/image/logo.png';
import buffle from 'assets/image/buffle.png';
import monkey from 'assets/image/monkey.png';
import bear from 'assets/image/bear.png';
import hibou from 'assets/image/hibou.png';
import cat from 'assets/image/cat.png';
import elephant from 'assets/image/elephant.png';
import phaco from 'assets/image/phaco.png';
import wolf from 'assets/image/wolf.png';
import cosmo from 'assets/image/cosmo.png';
import lion from 'assets/image/lion.png';

import AnimalzMarker from './animalzMarker';
import ShareMarker from './shareMarker';
import UserMarker from './userMarker';

import MapStyle from '../../mapStyle.json';
import { styles } from './styles';

const COEF_ZOOM = Platform.OS === 'ios' ? 0.5 : 0.55;

const AREA_LOC_GPS = {
  longitudeDelta: 0.0026429008518391583 * COEF_ZOOM,
  latitudeDelta: 0.0012644995249289082 * COEF_ZOOM,
  longitude: 2.3650113,
  latitude: 48.9034989,
};

const INIT_POS = {
  longitude: 2.364360,
  latitude: 48.903588,

};

const ANIMALZ_POSITION = {
  longitude: 2.36534,
  latitude: 48.90328,
};

const ANIMALZ_LIST = [
  {
    id: 'buffle',
    image: buffle,
  },
  {
    id: 'elephant',
    image: elephant,
  },
  {
    id: 'hibou',
    image: hibou,
  },
  {
    id: 'cat',
    image: cat,
  },
  {
    id: 'phaco',
    image: phaco,
  },
  {
    id: 'bear',
    image: bear,
  },
  {
    id: 'lion',
    image: lion,
  },
  {
    id: 'cosmo',
    image: cosmo,
  },
  {
    id: 'wolf',
    image: wolf,
  },
  {
    id: 'monkey',
    image: monkey,
  },
];

class MapStage extends React.Component {
  state = {
    isLoading: true,
    markerDone: false,
    userPosition: {
      latitude: null,
      longitude: null,
      error: null,
      isLoading: true,
    },
    sharedPosition: [{
      longitude: 2.36534,
      latitude: 48.90328,
      color: 'blue',
      until: 7,
    }],
  };

  componentDidMount() {
    this.intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState((state) => ({
            ...state,
            userPosition: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              error: null,
              isLoading: false,
            },
          }));
        },
        (error) => console.log('Get Current Position Error', error),
        { enableHighAccuracy: true },
      );
    }, 5000);

    Linking.addListener('url',
      this.handleOpenURL);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.hideAnimalz !== this.props.hideAnimalz) {
      this.setState((state) => ({
        ...state,
        markerDone: false,
      }), () => {
        Animated.delay(5000).start(() => {
          this.setState((state) => ({
            ...state,
            markerDone: true,
          }));
        });
      });
    }

    if (nextProps.isFirstTime !== this.props.isFirstTime) {
      Animated.delay(500).start(() => {
        this.map.animateToRegion(AREA_LOC_GPS, 1000);

        Animated.delay(1500).start(() => {
          this.map.animateToViewingAngle(45, 800);

          Animated.delay(1000).start(() => {
            this.map.animateToViewingAngle(0, 800);
            this.map.animateToBearing(280.5, 1000);

            Animated.delay(1500).start(() => {
              this.map.animateToBearing(280.5, 1000);

              Animated.delay(1200).start(() => {
                this.map.animateToViewingAngle(0, 800);

                this.props.onFinishAnimation();
                Animated.timing(this.itemOpacity, {
                  toValue: 0.6,
                }).start(() => {
                  this.setState((state) => ({
                    ...state,
                    isLoading: false,
                  }));
                  Animated.delay(5000).start(() => {
                    this.setState((state) => ({
                      ...state,
                      markerDone: true,
                    }));
                  });
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

  handleOpenURL = (event) => {
    const urlSlipted = event.url.split('/');
    const sharePosition =
      {
        longitude: parseFloat(urlSlipted[urlSlipted.length - 2]),
        latitude: parseFloat(urlSlipted[urlSlipted.length - 1]),
        until: urlSlipted[urlSlipted.length - 3],
        color: 'red',
      };

    this.hasRenderSharedPosition = false;
    this.setState((state) => ({
      ...state,
      sharedPosition: state.sharedPosition.concat(sharePosition),
    }));
  }

  removeFromSharePosition = (index) => {
    if (index > -1) {
      this.state.sharedPosition.splice(index, 1);
      const tmpData = this.state.sharedPosition;
      this.setState((state) => ({
        ...state,
        sharedPosition: tmpData,
      }), () => {
        console.log('====Marker Removed====');
        console.log(this.state.sharedPosition);
        console.log('====================================');
      });
    }
  }

  hasRenderSharedPosition = true;
  intervalId = null
  modalNotif = null;
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
        />);
    }
    return null;
  }
  renderMarker() {
    if (!this.state.isLoading) {
      return (

        <Marker
          tracksViewChanges={!this.state.markerDone}
          anchor={{ x: 0.01, y: 0.8 }}
          coordinate={ANIMALZ_POSITION}
        >

          {ANIMALZ_LIST.map((value, index) => {
            if (index % 2 === 0 && index !== ANIMALZ_LIST.length - 1) {
              return (
                <AnimalzMarker
                  key={value.id}
                  animalzList={ANIMALZ_LIST}
                  item={value}
                  index={index}
                  hideAnimalz={this.props.hideAnimalz}
                />);
            }
            return null;
          },
          )}
        </Marker>
      );
    }

    return null;
  }


  //            opacity: this.itemOpacity,


  render() {
    const { isFirstTime } = this.props;
    // Test 2.3651089   48.9036151
    return (
      <View style={styles.container}>
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
          {this.renderMarker()}
          {this.renderUserPosition()}
          {this.renderSharedPosition()}
          <Marker
            anchor={{ x: 0.5, y: 2.2 }}
            coordinate={INIT_POS}
            style={{ zIndex: 1 }}
          >
            <Animated.Image
              source={logo}
              style={[
                styles.logoStyle]}
            />
          </Marker>

        </MapView>

      </View >
    );
  }
}

MapStage.defaultProps = {};

MapStage.propTypes = {
  onFinishAnimation: PropTypes.func.isRequired,
  isFirstTime: PropTypes.bool.isRequired,
  hideAnimalz: PropTypes.bool.isRequired,
};


export default MapStage;
