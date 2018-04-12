import React from 'react';
import { View, AppState } from 'react-native';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import theme from 'theme';
import CountDown from 'common/countDown';
import moment from 'moment';
// import { styles } from './styles';

class ShareMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: props.longitude,
      latitude: props.latitude,
      appState: AppState.currentState,
      until: props.until,
      done: false,
      tracksViewChanges: props.tracksViewChanges,
    };

    this.untilDate = moment().add(props.until, 'second');
    this.index = props.index;
  }
  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
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
        until: this.untilDate.diff(moment(), 'seconds'),
      }));
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  onFinish = () => {
    console.log('ON FINISH=====');
    console.log(this.index);
    this.setState((state) => ({
      ...state,
      done: true,
    }), () => {
      this.props.onFinish(this.index);
    });
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      const currentTime = moment();
      if (currentTime.isBefore(this.untilDate)) {
        this.setState((state) => ({
          ...state,
          until: this.untilDate.diff(moment(), 'seconds'),
        }));
      } else {
        this.setState((state) => ({
          ...state,
          done: true,
        }));
      }
    }
    this.setState({ appState: nextAppState });
  };


  render() {
    const { longitude, latitude, until, done, tracksViewChanges } = this.state;
    const { color } = this.props;

    if (done) {
      return null;
    }
    return (
      <Marker
        title="Shared Position"
        key={longitude}
        tracksViewChanges={tracksViewChanges}
        anchor={{ x: 0.5, y: 0.5 }}
        coordinate={{
          longitude,
          latitude,
        }}
        style={{ zIndex: 10 }}
      >
        <View style={{ height: 45, width: 45, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{
            width: 45,
            height: 45,
            position: 'absolute',
            backgroundColor: color,
            opacity: 0.2,
            borderRadius: 200,
          }}
          />
          <View style={{
            width: 35,
            height: 35,
            position: 'absolute',
            backgroundColor: color,
            opacity: 0.4,
            borderRadius: 200,
          }}
          />
          <View style={{
            position: 'absolute',
            width: 20,
            height: 20,
            opacity: 1,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: color,
          }}
          >
            {until &&
              <CountDown
                digitTxtColor={theme.colors.white}
                digitBgColor="transparent"
                until={until}
                hasLabel={false}
                timeToShow={['M']}
                size={14}
                onFinish={this.onFinish}
              />
            }
          </View>
        </View>

      </Marker >
    );
  }
}

ShareMarker.defaultProps = {
  longitude: 35.7465120,
  latitude: -39.4628910,
  color: theme.colors.primary,
  until: null,
};

ShareMarker.propTypes = {
  longitude: PropTypes.number,
  latitude: PropTypes.number,
  color: PropTypes.string,
  until: PropTypes.number,
  index: PropTypes.number.isRequired,
  onFinish: PropTypes.func.isRequired,
  tracksViewChanges: PropTypes.bool.isRequired,
};

export default ShareMarker;
