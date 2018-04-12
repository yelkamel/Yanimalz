import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setNotifBefore } from 'actions/app';
import theme from 'theme';
import I18n from 'i18n';
import SwitchSelector from 'common/switchSelector';

import styles from './styles';

const options = [
  { label: '5min', value: 5 },
  { label: '10min', value: 10 },
  { label: '15min', value: 15 },
  { label: '20min', value: 20 },
];


class NotifModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minBefore: props.minBefore,
    };
  }

  componentDidMount() {

  }
  componentWillUnmount() { }


  onValueChange = (val) => {
    this.setState((state) => ({ ...state, minBefore: val }));
  }
  onSelectNotifParams = (value) => {
    this.props.setNotifBefore(value);
  }

  renderText = () => {
    const { minBefore } = this.state;
    const min = I18n.t('minutes');
    const before = I18n.t('before');
    return <Text style={styles.sliderText}>{`${Math.floor(minBefore)} \n${min}\n${before}`}</Text>;
  };

  render() {
    const { minBefore } = this.state;
    const initalIndex = minBefore ?
      options.findIndex((item) => (item.value === minBefore)) : 1;
    return (
      <View style={styles.notifModalContainer}>
        <Text style={styles.notifModalText}>
          {I18n.t('beforeTime')}
        </Text>
        <SwitchSelector
          options={options}
          initial={initalIndex}
          selectedColor={theme.colors.primaryLight}
          buttonColor={theme.colors.primary}
          backgroundColor={theme.colors.primaryLight}
          onPress={this.onSelectNotifParams}
          height={theme.size.screenHeight * 0.08}
        />
      </View>

    );
  }
}


NotifModal.defaultProps = {
  minBefore: 10,
};

NotifModal.propTypes = {
  minBefore: PropTypes.number,
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

