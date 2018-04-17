import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import { connect } from 'react-redux';
import appStyles from 'appStyles';
import PropTypes from 'prop-types';
import { INIT_ALERT } from 'data';
import I18n from 'i18n';
import codePush from 'react-native-code-push';
import {
  SCLAlert,
  SCLAlertButton,
} from 'react-native-scl-alert';
import AppStateUpdate from 'common/appStateUpdate';
import BatteryManagement from 'common/batteryManagement';
import Loading from 'common/loading';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'theme';
import { getRandomQuestion } from 'utils';
import Home from './home';


const CODE_PUSH_DEV = Platform.OS === 'ios' ?
  'ez6fvhPellV4cTTqSwk57dvS9MAq54bfd2b7-109e-4645-8229-bad3eb48e6ff' :
  'fvoUeryEAlaeYzyyfKkT7xAirQJw54bfd2b7-109e-4645-8229-bad3eb48e6ff';
const CODE_PUSH_PRD = Platform.OS === 'ios' ?
  'HRzUcsx4V7a3VtFnFqLMLdpBmsRQ54bfd2b7-109e-4645-8229-bad3eb48e6ff' :
  '1W1rMdizRX6ObQD9kM7P3PmtCsBW54bfd2b7-109e-4645-8229-bad3eb48e6ff';


class HomeHOC extends Component {
  state = {
    alert: INIT_ALERT,
    isCodePushDone: false,
  }

  componentDidMount() {
    codePush
      .sync({
        deploymentKey: __DEV__ ? CODE_PUSH_DEV : CODE_PUSH_PRD,
        installMode: codePush.InstallMode.IMMEDIATE,
        updateDialog: {
          title: I18n.t('needUpdateTitle'),
          mandatoryUpdateMessage: I18n.t('needUpdateDescription'),
          mandatoryContinueButtonLabel: I18n.t('needUpdateButton'),
        },
      })
      .then((update) => {
        if (!update) {
          this.setState((state) => ({ ...state, isCodePushDone: true }));
        }
      });
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
          slideAnimationDuration={700}
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
    if (!this.state.isCodePushDone) {
      return (<Loading />);
    }
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
