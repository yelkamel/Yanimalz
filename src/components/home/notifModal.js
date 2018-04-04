import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNotifBefore } from 'actions/app';
import theme from 'theme';
import LargeSlider from 'common/largeSlider';
import I18n from 'i18n';

import styles from './styles';

class NotifModal extends React.Component {
  state = {
    minBefore: this.props.minBefore,
  };
  componentDidMount() { }
  componentWillUnmount() { }


  onValueChange = (val) => {
    this.setState((state) => ({ ...state, minBefore: val }));
  }
  onSlidingComplete = () => {
    this.props.setNotifBefore(Math.floor(this.state.minBefore));
  }

  renderText = () => {
    const { minBefore } = this.state;
    const min = I18n.t('minutes');
    const before = I18n.t('before');
    return <Text style={styles.sliderText}>{`${Math.floor(minBefore)} \n${min}\n${before}`}</Text>;
  };

  render() {
    const { minBefore } = this.state;
    return (
      <LargeSlider
        horizontal
        value={minBefore}
        onValueChange={this.onValueChange}
        style={styles.sliderNotif}
        renderLabel={this.renderText}
        trackStyle={{ backgroundColor: theme.colors.primaryLight }}
        minimumValue={0}
        maximumValue={20}
        inSidelabel={I18n.t('notif')}
        onSlidingComplete={this.onSlidingComplete}
      />
    );
  }
}

NotifModal.propTypes = {
  minBefore: PropTypes.number.isRequired,
  setNotifBefore: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  minBefore: state.app.timeBeforeNotif,
});

const mapDispatchToProps = (dispatch) => ({
  setNotifBefore: (min) => {
    dispatch(setNotifBefore(min));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NotifModal);

