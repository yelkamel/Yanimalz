import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import I18n from 'i18n';
import theme from 'theme';
import CountDown from 'common/countDown';
import moment from 'moment';
import { connect } from 'react-redux';

// import { styles } from './styles';

class ShareMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: props.longitude,
      latitude: props.latitude,
      until: props.until,
      done: false,
      tracksViewChanges: props.tracksViewChanges,
    };

    this.untilDate = moment().add(props.until, 'second');
    this.index = props.index;
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

    this.handleAppStateChange(this.props.appState, nextProps.appState);
  }


  onFinish = () => {
    this.setState((state) => ({
      ...state,
      done: true,
    }), () => {
      this.props.onFinish(this.index);
    });
  }

  handleAppStateChange = (currentAppState, nextAppState) => {
    if (currentAppState.match(/inactive|background/) && nextAppState === 'active') {
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
  };


  render() {
    const { longitude, latitude, until, done, tracksViewChanges } = this.state;
    const { color } = this.props;

    if (done) {
      return <View />;
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
        style={{ zIndex: 15 }}
      >
        <View style={{ height: 70, width: 70, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{
            width: 70,
            height: 70,
            position: 'absolute',
            backgroundColor: color,
            opacity: 0.4,
            borderRadius: 200,
          }}
          />
          <View style={{
            width: 45,
            height: 45,
            position: 'absolute',
            backgroundColor: color,
            opacity: 0.3,
            borderRadius: 200,
          }}
          />
          <View style={{
            position: 'absolute',
            width: 40,
            height: 40,
            borderRadius: 200,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          >
            {until &&
              <CountDown
                digitTxtColor={theme.colors.white}
                digitBgColor="transparent"
                until={until}
                timeToShow={['M']}
                timeTxtColor={theme.colors.white}
                size={18}
                textDescStyle={{
                  color: theme.colors.white,
                  marginVertical: 0,
                  fontSize: theme.textSizes.xxsmall,
                  fontFamily: theme.fontFamily.rubikRegular,
                  backgroundColor: 'transparent',
                }}
                onFinish={this.onFinish}
                minLabel={I18n.t('minutes')}
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
  appState: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  appState: state.app.appState,
});
export default connect(mapStateToProps)(ShareMarker);

