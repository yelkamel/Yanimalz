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
    };
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.longitude !== this.props.longitude) {
      this.setState((state) => ({
        ...state,
        longitude: nextProps.longitude,
        latitude: nextProps.latitude,
      }));
    }
  }

  render() {
    const { longitude, latitude } = this.state;

    return (
      <Marker
        title="Position Actuelle"
        key={longitude}
        anchor={{ x: 0.5, y: 0.5 }}
        coordinate={{
          longitude,
          latitude,
        }}
        style={{ zIndex: 10 }}
      >
        <View style={{
          width: 30,
          height: 30,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          <View style={{
            position: 'absolute',
            backgroundColor: theme.colors.accent,
            width: 25,
            height: 25,
            opacity: 0.2,
            borderRadius: 30,
          }}
          />
          <View style={{
            position: 'absolute',
            backgroundColor: theme.colors.accent,
            width: 20,
            height: 20,
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
}

UserMarker.defaultProps = {
  longitude: 35.7465120,
  latitude: -39.4628910,
};

UserMarker.propTypes = {
  longitude: PropTypes.number,
  latitude: PropTypes.number,
};

export default UserMarker;
