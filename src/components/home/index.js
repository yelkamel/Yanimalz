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
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'theme';
import { getRandomQuestion } from 'utils';
import TouchableRipple from 'common/touchableRipple';

import Home from './home';

class HomeHOC extends Component {
  state = {
    alert: INIT_ALERT,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.alert.show !== this.state.alert.show) {
      this.setState((state) => ({ ...state, alert: nextProps.alert }));
    }
  }

  closeModal = () => {
    this.setState({ alert: INIT_ALERT });
  }

  renderSCLButton = (answers, scltheme, type) => {
    if (answers.length > 0) {
      return answers.map((item) => (
        <SCLAlertButton
          key={item.buttonLabel}
          theme="info"
          containerStyle={{
            backgroundColor: theme.colors.primaryLight,
          }}
          onPress={() => this.setState((state) => ({
            ...state,
            alert: item.nextAlert,
          }))}
        >
          {item.buttonLabel}
        </SCLAlertButton>
      ));
    }

    if (type === 'question') {
      return (
        <View>
          <SCLAlertButton
            theme="info"
            onPress={() => this.setState((state) => ({
              ...state,
              alert: getRandomQuestion(),
            }))}
            containerStyle={{
              backgroundColor: theme.colors.primaryLight,
            }}
          >
            Autre question
          </SCLAlertButton>
          <SCLAlertButton
            theme="default"
            onPress={() => this.setState((state) => ({
              ...state,
              alert: INIT_ALERT,
            }))}
          >
            Fermer
          </SCLAlertButton>
        </View>
      );
    }

    return (
      <SCLAlertButton
        theme={scltheme}
        onPress={() => this.setState((state) => ({
          ...state,
          alert: INIT_ALERT,
        }))}
      >
        ok
      </SCLAlertButton>
    );
  }

  renderSCLModal() {
    const {
      title,
      subtitle,
      show,
      answers,
      type,
      scltheme,
    } = this.state.alert;
    if (type === 'question' && answers.length > 0) {
      return (
        <SCLAlert
          slideAnimationDuration={1000}
          onRequestClose={this.closeModal}
          theme={scltheme}
          show={show}
          title={title}
          subtitle={subtitle}
          titleStyle={{
            color: theme.colors.primary,
            fontWeight: 'bold',
          }}
          subtitleStyle={{
            color: theme.colors.primaryDark,
            height: 30,
          }}
          headerIconComponent={
            <Icon
              name="question-circle"
              size={75}
              color={theme.colors.primary}
            />}
        >
          {this.renderSCLButton(answers, scltheme, type)}
        </SCLAlert>
      );
    }
    return (
      <SCLAlert
        onRequestClose={this.closeModal}
        theme={scltheme}
        show={show}
        title={title}
        subtitle={subtitle}
        subtitleStyle={{
          color: theme.colors.primaryDark,
          height: 30,
        }}
      >
        {this.renderSCLButton(answers, scltheme, type)}
      </SCLAlert>
    );
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
