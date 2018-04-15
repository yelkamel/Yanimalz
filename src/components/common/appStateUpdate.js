import PropTypes from 'prop-types';
import React from 'react';
import { AppState } from 'react-native';
import { connect } from 'react-redux';
import { setAppState } from 'actions/app';

const noop = () => null;

class AppStateUpdate extends React.PureComponent {
  componentDidMount() {
    const { onActive } = this.props;

    onActive();
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillUnmount() {
    const { onBackground } = this.props;

    onBackground();
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (newState) => {
    const { onActive, onBackground, onInactive } = this.props;

    this.props.setAppState(newState);

    const callbacks = {
      active: onActive,
      background: onBackground,
      inactive: onInactive,
    };
    const callback = callbacks[newState] || noop;

    callback();
  };

  render() {
    return null;
  }
}

AppStateUpdate.propTypes = {
  onActive: PropTypes.func,
  onBackground: PropTypes.func,
  onInactive: PropTypes.func,
  setAppState: PropTypes.func.isRequired,
};

AppStateUpdate.defaultProps = {
  onActive: noop,
  onBackground: noop,
  onInactive: noop,
};

const mapDispatchToProps = (dispatch) => ({
  setAppState: (nextAppState) => {
    dispatch(setAppState(nextAppState));
  },
});

export default connect(null, mapDispatchToProps)(AppStateUpdate);
