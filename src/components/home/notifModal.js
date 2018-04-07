import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNotifBefore } from 'actions/app';
import theme from 'theme';
import LargeSlider from 'common/largeSlider';
import I18n from 'i18n';
import SwitchSelector from 'react-native-switch-selector';

import styles from './styles';

const options = [
  { label: '5min', value: '5' },
  { label: '10min', value: '10' },
  { label: '15min', value: '15' },
  { label: '20min', value: '20' },

];

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
      <View style={styles.notifModalContainer}>
        <Text style={styles.notifModalText}>
          Notifer avant:
        </Text>
        <SwitchSelector
          options={options}
          initial={0}
          selectedColor={theme.colors.primaryLight}
          buttonColor={theme.colors.primary}
          backgroundColor={theme.colors.primaryLight}
          onPress={(value) => console.log(`Call onPress with value: ${value}`)}
        />
      </View>

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

