import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import theme from 'theme';
// import { styles } from './styles';

class UserMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: props.longitude,
      latitude: props.latitude,
      tracksViewChanges: props.tracksViewChanges,
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.tracksViewChanges !== this.props.tracksViewChanges) {
      this.setState((state) => ({
        ...state,
        tracksViewChanges: nextProps.tracksViewChanges,
      }));
    }

    if (nextProps.longitude !== this.props.longitude) {
      this.setState((state) => ({
        ...state,
        longitude: nextProps.longitude,
        latitude: nextProps.latitude,
      }));
    }
  }

  render() {
    const { longitude, latitude, tracksViewChanges } = this.state;
    return (
      <Marker
        title="Position Actuelle"
        key={longitude}
        tracksViewChanges={tracksViewChanges}
        anchor={{ x: 0.5, y: 0.5 }}
        coordinate={{
          longitude,
          latitude,
        }}
        style={{ zIndex: 10 }}
      >
        <View style={{
          width: 60,
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <View style={{
            position: 'absolute',
            backgroundColor: theme.colors.accent,
            width: 55,
            height: 55,
            opacity: 0.2,
            borderRadius: 30,
          }}
          />
          <View style={{
            position: 'absolute',
            backgroundColor: theme.colors.accent,
            width: 40,
            height: 40,
            opacity: 0.25,
            borderRadius: 30,
          }}
          />
          <View style={{
            position: 'absolute',
            backgroundColor: theme.colors.accent,
            width: 10,
            height: 10,
            opacity: 0.8,
            borderRadius: 30,
          }}
          />

        </View>
      </Marker>
    );
  }
}

UserMarker.defaultProps = {
  longitude: 35.7465120,
  latitude: -39.4628910,
};

UserMarker.propTypes = {
  longitude: PropTypes.number,
  latitude: PropTypes.number,
  tracksViewChanges: PropTypes.bool.isRequired,
};

export default UserMarker;
