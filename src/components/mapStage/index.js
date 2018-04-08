import React from 'react';
import { Animated, View, Text, Image, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import PulseAnimation from 'common/pulseAnimation';
import PropTypes from 'prop-types';
import theme from 'theme';
import OpacityGradientView from 'react-native-opacity-gradient';

import logo from 'assets/image/logo.png';
import buffle from 'assets/image/buffle.png';
import monkey from 'assets/image/monkey.png';
import bear from 'assets/image/bear.png';
import hibou from 'assets/image/hibou.png';
import cat from 'assets/image/cat.png';
import elephant from 'assets/image/elephant.png';
import phaco from 'assets/image/phaco.png';
import wolf from 'assets/image/wolf.png';


import MapStyle from '../../mapStyle.json';
import { styles } from './styles';

const AREA_LOC_GPS = {
  longitudeDelta: 0.0026429008518391583 * 0.5,
  latitudeDelta: 0.0012644995249289082 * 0.5,
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
    id: 'monkey',
    image: monkey,
  },
  {
    id: 'bear',
    image: bear,
  },
  {
    id: 'hibou',
    image: hibou,
  },
  {
    id: 'wolf',
    image: wolf,
  },
  {
    id: 'phaco',
    image: phaco,
  },
  {
    id: 'elephant',
    image: elephant,
  },
  {
    id: 'cat',
    image: cat,
  },
  {
    id: 'buffle',
    image: buffle,
  },
];


class MapStage extends React.Component {
  state = {
    isLoading: true,
  };

  componentDidMount() { }

  componentWillReceiveProps(nextProps) {
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
                  if (true) {
                    // TODO  this.props.eventInfo.picture
                    this.setState((state) => ({ ...state, isLoading: false }));
                  }
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

  renderAnimalz(value, index) {
    if (Platform.OS === 'ios') {
      return (
        <OpacityGradientView
          style={styles.gradient}
          colors={['transparent', 'white', 'white', 'transparent']}
          locations={[0, 0.1, 0.90, 1.0]}
          start={{ x: 0.0, y: 0.0 }}
          end={{ x: 0.0, y: 1.0 }}
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

        </OpacityGradientView>);
    }
    return (
      <View
        style={[styles.gradient, { opacity: 0.8 }]}
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
  }
  renderMarker() {
    if (!this.state.isLoading) {
      return (

        <Marker anchor={{ x: 0.1, y: 0.8 }} coordinate={ANIMALZ_POSITION}>

          {ANIMALZ_LIST.map((value, index) => {
            if (index % 2 === 0 && index !== ANIMALZ_LIST.length - 1) {
              return (
                <Animated.View key={value.id} style={{ opacity: 0.5, zIndex: 10 }} >
                  {this.renderAnimalz(value, index)}
                </Animated.View>);
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
    const { isLoading } = this.state;


    return (
      <View style={styles.container}>
        <MapView
          ref={(mapView) => (this.map = mapView)}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          customMapStyle={MapStyle}
          cacheEnabled={!isFirstTime}
          scrollEnabled={false}
          rotateEnabled={false}
          zoomControlEnabled={false}
          zoomEnabled={false}
          showsScale={false}
          showsCompass={false}
          showsMyLocationButton={false}
          showsPointsOfInterest={false}
          showsTraffic={false}
        >
          {this.renderMarker()}
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
              <View style={{ backgroundColor: theme.colors.accent, width: 13, height: 13, borderRadius: 10 }} />

            </View>
          </Marker>

          <Marker
            anchor={{ x: 0.5, y: 2 }}
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
};


export default MapStage;
