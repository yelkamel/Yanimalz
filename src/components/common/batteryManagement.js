import PropTypes from 'prop-types';
import React from 'react';
import { DeviceEventEmitter, Alert } from 'react-native';
import { connect } from 'react-redux';
import theme from 'theme';
import i18n from 'i18n';
import {
  SCLAlert,
  SCLAlertButton,
} from 'react-native-scl-alert';
import Icon from 'react-native-vector-icons/FontAwesome';
import SystemSetting from 'react-native-system-setting';
import TouchableRipple from './touchableRipple';

const BatteryManager = require('NativeModules').BatteryManager;


class BatteryManagement extends React.PureComponent {
  state = {
    show: false,
    batteryLevel: '',
  }

  hasShowAlert = false;
  componentDidMount() {
    this.getBatteryLevel();
  }

  componentWillReceiveProps(nextProps) {
    this.handleAppStateChange(this.props.appState, nextProps.appState);
  }


  componentWillUnmount() {
    this._subscription.remove();
  }

  getBatteryLevel = () => {
    BatteryManager.updateBatteryLevel((info) => {
      this._subscription = DeviceEventEmitter.addListener('BatteryStatus', this.onBatteryStatus);
      console.log('=GET BATTERY LEVEL=', info.level);


      if (!this.hasShowAlert && info.level < 30 && info.level) {
        this.setState({
          batteryLevel: info.level,
          show: true,
        });
      }
    });
  }

  handleAppStateChange = (currentAppState, nextAppState) => {
    if (currentAppState.match(/inactive|background/) && nextAppState === 'active') {
      this.getBatteryLevel();
    }
  };

  onPressOk = () => {
    // change the brightness & check permission
    SystemSetting.setBrightnessForce(0.4).then((success) => {
      SystemSetting.switchWifi(() => {
        console.log('switch wifi successfully');
      });
      SystemSetting.switchBluetooth(() => {
        console.log('switch bluetooth successfully');
      });
      if (!success) {
        Alert.alert('Permission Deny', 'You have no permission changing settings',
          [
            { text: 'Ok', style: 'cancel' },
            { text: 'Open Setting', onPress: () => SystemSetting.grantWriteSettingPremission() },
          ]);
      }
    });
    this.setState((state) => ({ ...state, show: false }), () => {
      this.hasShowAlert = true;
    });
  }

  onPressCancel = () => {
    this.setState((state) => ({ ...state, show: false }), () => {
      this.hasShowAlert = true;
    });
  }


  render() {
    const { show, batteryLevel } = this.state;
    return (
      <SCLAlert
        theme="danger"
        slideAnimationDuration={1000}
        show={show}
        title={`${i18n.t('batteryAlerteTitle')} (${batteryLevel}%)`}
        subtitle={i18n.t('batteryAlerteSubTitle')}
        onRequestClose={() => { }}
        titleStyle={{ color: theme.colors.primary, fontWeight: 'bold' }}
        subtitleStyle={{ color: theme.colors.primaryDark, marginVertical: 10 }}
        headerIconComponent={<Icon name="battery-quarter" size={40} color={theme.colors.primary} />}
      >
        <TouchableRipple onPress={this.onPressOk}>
          <SCLAlertButton
            onPress={() => { }}
            containerStyle={{
              backgroundColor: theme.colors.primaryLight,
            }}
            theme="info"
          >
            {i18n.t('okBattery')}
          </SCLAlertButton>
        </TouchableRipple>
        <TouchableRipple onPress={this.onPressCancel}>
          <SCLAlertButton
            containerStyle={{
              backgroundColor: theme.colors.primary,
            }}
            onPress={() => { }}
            theme="info"
          >
            {i18n.t('nokBattery')}
          </SCLAlertButton>
        </TouchableRipple>
      </SCLAlert >
    );
  }
}

BatteryManagement.propTypes = {
  appState: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  appState: state.app.appState,
});


export default connect(mapStateToProps)(BatteryManagement);
