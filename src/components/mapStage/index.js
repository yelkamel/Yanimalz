import React from 'react';
import { Animated, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import PulseAnimation from 'common/pulseAnimation';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import theme from 'theme';

import logo from 'assets/image/logo.png';
import monkey from 'assets/image/monkey.png';
import bear from 'assets/image/bear.png';
import hibou from 'assets/image/hibou.png';
import cat from 'assets/image/cat.png';
import elephant from 'assets/image/elephant.png';
import sanglier from 'assets/image/sanglier.png';
import wolf from 'assets/image/wolf.png';


import MapStyle from '../../mapStyle.json';
import { styles } from './styles';

const AREA_LOC_GPS = {
  longitudeDelta: 0.0026429008518391583 * 0.5,
  latitudeDelta: 0.0012644995249289082 * 0.5,
  longitude: 2.3651310669234653,
  latitude: 48.90347782160455,
};

class MapStage extends React.Component {
  state = {
    animatedPulse: false,
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
                    this.animatePulse(30);
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

  animatePulse = (durationInSeconds) => {
    this.setState(
      (state) => ({ ...state, animatedPulse: true }),
      () => {
        Animated.delay(1000 * durationInSeconds).start(() => {
          this.setState((state) => ({ ...state, animatedPulse: false }));
        });
      },
    );
  };

  renderPicture() {
    const { eventInfo: { picture } } = this.props;

    if (picture) {
      return (
        <Animated.Image
          source={picture}
          style={[
            styles.djImage,
          ]}
        />
      );
    }

    return (
      <Animated.Image
        source={logo}
        style={[
          styles.logoStyle,
        ]}
      />
    );
  }

  //            opacity: this.itemOpacity,


  render() {
    const { isFirstTime } = this.props;
    // const { animatedPulse } = this.state;

    const initialCordianate = {
      longitude: 2.364360,
      latitude: 48.903588,
    };

    const rowPosition = [
      {
        longitude: 2.3641557,
        latitude: 48.9032470,
      },
      {
        longitude: 2.3643706,
        latitude: 48.9032248,
      },
      {
        longitude: 2.3645587,
        latitude: 48.9032040,
      },
      {
        longitude: 2.3647438,
        latitude: 48.9031818,
      },
      {
        longitude: 2.3649550,
        latitude: 48.9031584,
      },
      {
        longitude: 2.3651387,
        latitude: 48.9031366,
      },
      {
        longitude: 2.3653352,
        latitude: 48.9031040,
      },
      {
        longitude: 2.3655575,
        latitude: 48.9031053,
      },

    ];

    const columnPosition = [

      {
        longitude: 2.3639968,
        latitude: 48.9034432,
      },
      {
        longitude: 2.3640501,
        latitude: 48.9035692,
      },
      {
        longitude: 2.3640652,
        latitude: 48.9036827,
      },
    ];

    const animalzPosition = [
      {
        longitude: 2.3644286,
        latitude: 48.903904,
        image: monkey,
      },
      {
        longitude: 2.3644283,
        latitude: 48.9032001,
        image: bear,
      },
      {
        longitude: 2.3648108,
        latitude: 48.9038564,
        image: hibou,
      },
      {
        longitude: 2.3648346,
        latitude: 48.9031582,
        image: wolf,
      },
      {
        longitude: 2.3652051,
        latitude: 48.9038154,
        image: sanglier,
      },
      {
        longitude: 2.3652034,
        latitude: 48.9031143,
        image: elephant,
      },
      {
        longitude: 2.3654810,
        latitude: 48.9030927,
        image: cat,
      },

    ];


    return (
      <View style={styles.container}>
        <MapView
          ref={(mapView) => (this.map = mapView)}
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
          showsCompass={false}
          showsMyLocationButton={false}
          showsPointsOfInterest={false}
          showsTraffic={false}
        >


          {rowPosition.map((value) => (
            <Marker key={value.longitude} anchor={{ x: 0, y: 0 }} coordinate={value}>
              <Animated.View style={{
                width:
                  theme.size.screenWidth,
                height: 2,
                backgroundColor: theme.colors.primaryLight,
                opacity: 0.6,
              }}
              />
            </Marker>
          ))}
          {columnPosition.map((value) => (
            <Marker key={value.longitude} anchor={{ x: 0, y: 0 }} coordinate={value}>
              <Animated.View style={{
                height:
                  theme.size.screenHeight,
                width: 2,
                backgroundColor: theme.colors.primaryLight,
                opacity: 0.6,
              }}
              />
            </Marker>
          ))}
          {animalzPosition.map((value) => (
            <Marker key={value.longitude} anchor={{ x: 0.5, y: 0.5 }} coordinate={value}>
              <Animated.Image
                source={value.image}
                style={[
                  styles.logoStyle,
                ]}
              />
            </Marker>
          ))}

          <Marker coordinate={initialCordianate}>
            {this.renderPicture()}
          </Marker>
        </MapView>
      </View>
    );
  }
}

/*

          <Marker coordinate={initialCordianate} anchor={{ x: 0.5, y: 0.42 }}>
            {animatedPulse &&
              <View style={{
                height: 400,
                width: 400,
              }}
              >
                <PulseAnimation
                  color={theme.colors.primary}
                  numPulses={2}
                  diameter={250}
                  speed={30}
                  duration={2000}
                />
              </View>
            }
          </Marker>
*/

MapStage.defaultProps = {};

MapStage.propTypes = {
  onFinishAnimation: PropTypes.func.isRequired,
  isFirstTime: PropTypes.bool.isRequired,
  eventInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  eventInfo: state.timeline.currentEvent,
});

export default connect(mapStateToProps)(MapStage);
