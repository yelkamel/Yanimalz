import React from 'react';
import { Animated, View, Text, Image, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import PulseAnimation from 'common/pulseAnimation';
import PropTypes from 'prop-types';
import theme from 'theme';

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
  };

  componentDidMount() { }

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

  modalNotif = null;
  map = null;
  itemOpacity = new Animated.Value(0);
  /*
    renderAnimalz(value, index) {
      if (this.props.hideAnimalz) {
        return null;
      }
      if (Platform.OS === 'ios') {
        return (
          <View
            style={[styles.gradient, { opacity: 0.6 }]}
          >
            <OpacityGradientView
              colors={['transparent', 'white', 'white', 'transparent']}
              locations={[0, 0.2, 0.80, 1.0]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 0.0, y: 1.0 }}
            >

              <OpacityGradientView
                colors={['transparent', 'white', 'white', 'transparent']}
                locations={[0, 0.2, 0.80, 1.0]}
                start={{ x: 1, y: 0.0 }}
                end={{ x: 0.0, y: 0.0 }}
              >
                <Image
                  source={value.image}
                  style={[
                    styles.animalzStyle,
                  ]}
                />
              </OpacityGradientView>

            </OpacityGradientView>
            <OpacityGradientView
              colors={['transparent', 'white', 'white', 'transparent']}
              locations={[0, 0.2, 0.80, 1.0]}
              start={{ x: 0.0, y: 0.0 }}
              end={{ x: 0.0, y: 1.0 }}
            >

              <OpacityGradientView
                colors={['transparent', 'white', 'white', 'transparent']}
                locations={[0, 0.2, 0.80, 1.0]}
                start={{ x: 1, y: 0.0 }}
                end={{ x: 0.0, y: 0.0 }}
              >
                <Image
                  source={ANIMALZ_LIST[index + 1].image}
                  style={[
                    styles.animalzStyle,
                  ]}
                />
              </OpacityGradientView >
            </OpacityGradientView >
          </View >
        );
      }
      return (
        <View
          style={[styles.gradient, { opacity: 0.5 }]}
        >
          <Image
            source={value.image}
            style={[
              styles.animalzStyle,
            ]}
          />
          <Image
            source={ANIMALZ_LIST[index + 1].image}
            style={[
              styles.animalzStyle,
            ]}
          />

        </View>
      );
    } */

  renderUserPosition() {
    return (
      <Marker
        anchor={{ x: 0.5, y: 0.5 }}
        coordinate={{
          latitude: 48.90356,
          longitude: 2.36463,
        }}
        style={{ zIndex: 1 }}
      >
        <View style={{
          width: 40,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <View style={{
            position: 'absolute',
            backgroundColor: theme.colors.accent,
            width: 30,
            height: 30,
            opacity: 0.2,
            borderRadius: 30,
          }}
          />
          <View style={{
            position: 'absolute',
            backgroundColor: theme.colors.accent,
            width: 25,
            height: 25,
            opacity: 0.4,
            borderRadius: 30,
          }}
          />
          <View style={{
            backgroundColor: theme.colors.accent,
            width: 13,
            height: 13,
            borderRadius: 10,
          }}
          />

        </View>
      </Marker>
    );
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
