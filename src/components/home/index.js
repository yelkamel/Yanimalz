import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import appStyles from 'appStyles';
import PropTypes from 'prop-types';
import { INIT_ALERT } from 'data';
import {
  SCLAlert,
  SCLAlertButton,
} from 'react-native-scl-alert';
import AppStateUpdate from 'common/appStateUpdate';
import BatteryManagement from 'common/batteryManagement';
import Home from './home';

class HomeHOC extends Component {
  state = {
    alert: INIT_ALERT,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alert.subtitle !== this.props.alert.subtitle) {
      this.setState((state) => ({ ...state, alert: nextProps.alert }));
    }
  }

  closeModal = () => {
    this.setState({ alert: INIT_ALERT });
  }

  renderSCLModal() {
    const {
      title,
      subtitle,
      theme,
      show,
      type,
      answers,
    } = this.state.alert;

    if (type === 'question') {
      return (
        <SCLAlert
          onRequestClose={this.closeModal}
          theme={theme}
          show={show}
          title={title}
          subtitle={subtitle}
        >
          {answers.map((item) => (
            <SCLAlertButton
              theme="info"
              onPress={() => this.setState((state) => ({
                ...state,
                alert: item.nextAlert,
              }))}
            >
              {item.buttonLabel}
            </SCLAlertButton>
          ))}

        </SCLAlert >
      );
    }

    return null;
  }

  render() {
    return (
      <View style={appStyles.flexOne} >
        <Home />
        <AppStateUpdate />
        <BatteryManagement />
        {this.renderSCLModal()}
      </View>
    );
  }
}

HomeHOC.propTypes = {
  alert: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.app.alert,
});

export default connect(mapStateToProps)(HomeHOC);
