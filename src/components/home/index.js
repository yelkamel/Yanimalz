import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { setAlert } from 'actions/app';
import appStyles from 'appStyles';
import PropTypes from 'prop-types';
import { INIT_ALERT } from 'data';
import {
  SCLAlert,
  SCLAlertButton,
} from 'react-native-scl-alert';
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

  render() {
    const {
      title,
      subtitle,
      theme,
      show,
      type,
    } = this.state.alert;

    if (type === 'question') {
      return (
        <View style={appStyles.flexOne} >
          <Home />
          <SCLAlert
            onRequestClose={this.closeModal}
            theme={theme}
            show={show}
            title={title}
            subtitle={subtitle}
          >
            <SCLAlertButton
              theme="info"
              onPress={() => this.setState({ alertMsg: 'TETETER' })}
            >
              Ok
            </SCLAlertButton>
          </SCLAlert>
        </View>
      );
    }

    return (
      <View style={appStyles.flexOne} >
        <Home />
        <SCLAlert
          onRequestClose={this.closeModal}
          theme={theme}
          show={show}
          title={title}
          subtitle={subtitle}
        >
          <SCLAlertButton
            theme="info"
            onPress={this.closeModal}
          >
            Ok
          </SCLAlertButton>
        </SCLAlert>
      </View>
    );
  }
}

HomeHOC.propTypes = {
  alert: PropTypes.any.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  alert: state.app.alert,
});

const mapDispatchToProps = (dispatch) => ({
  setAlert: (alert) => {
    dispatch(setAlert(alert));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(HomeHOC);
