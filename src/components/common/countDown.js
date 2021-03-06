import React from 'react';
import PropTypes from 'prop-types';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import _ from 'lodash';
import { sprintf } from 'sprintf-js';
import theme from 'theme';

const DEFAULT_BG_COLOR = '#FAB913';
const DEFAULT_TIME_TXT_COLOR = '#000';
const DEFAULT_DIGIT_TXT_COLOR = '#000';
const DEFAULT_TIME_TO_SHOW = ['D', 'H', 'M', 'S'];

const styles = StyleSheet.create({
  timeCont: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  timeTxt: {
    color: 'white',
    marginVertical: 2,
    fontFamily: theme.fontFamily.rubikRegular,
    backgroundColor: 'transparent',
  },
  timeInnerCont: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitCont: {
    borderRadius: 5,
    marginHorizontal: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  doubleDigitCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  digitTxt: {
    color: 'white',
    fontWeight: 'bold',
  },
});


export default class CountDown extends React.PureComponent {
  state = {
    until: this.props.until,
  };

  isFinish = false;


  componentDidMount() {
    if (this.props.onFinish) {
      this.onFinish = _.once(this.props.onFinish);
    }
    this.timer = setInterval(this.updateTimer, 60 * 1000);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.until !== this.props.until && nextProps.until > 1) {
      this.setState((state) => (
        {
          ...state,
          until: nextProps.until,
        }));
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }


  getTimeLeft = () => {
    const { until } = this.state;
    return {
      minutes: parseInt(until / 60, 10) % 60,
      hours: parseInt(until / (60 * 60), 10) % 24,
      days: parseInt(until / (60 * 60 * 24), 10),
    };
  };

  updateTimer = () => {
    const { until } = this.state;

    if (until <= 1) {
      clearInterval(this.timer);
      this.isFinish = true;
      if (this.onFinish) {
        this.onFinish();
      }
    }
    if (!this.isFinish) {
      this.props.onUpdate();
      this.setState({ until: until - 60 });
    }
  };

  renderDigit = (label, d) => {
    const { digitBgColor, digitTxtColor, timeTxtColor, size, simpleDg, hasLabel, textDescStyle } = this.props;
    const digitToRender = simpleDg ? parseInt(d, 10) : d;
    return (
      <View
        style={[
          styles.digitCont,
          { backgroundColor: digitBgColor },
          hasLabel === true ? { width: size * 2.3, height: size * 2.6 } : {},
        ]}
      >
        <Text style={[styles.digitTxt, { fontSize: size }, { color: digitTxtColor }]}>{digitToRender}</Text>
        {hasLabel &&
          <Text
            style={[
              {
                fontSize: size / 1.8,
              },
              textDescStyle,
              {
                color: timeTxtColor,
              },
            ]}
          >
            {label}
          </Text>}
      </View>
    );
  };

  renderDoubleDigits = (label, digits) => (
    <View key={label} style={styles.doubleDigitCont}>
      <View style={styles.timeInnerCont}>{this.renderDigit(label, digits)}</View>
    </View>
  );

  renderCountDown = () => {
    const { timeToShow } = this.props;
    const { days, hours, minutes } = this.getTimeLeft();
    const newTime = sprintf('%02d:%02d:%02d', days, hours, minutes).split(':');
    const Component = this.props.onPress ? TouchableOpacity : View;

    return (
      <Component style={styles.timeCont} onPress={this.props.onPress}>
        {_.includes(timeToShow, 'D')
          ? this.renderDoubleDigits(this.props.daysLabel, newTime[0])
          : null}
        {_.includes(timeToShow, 'H')
          ? this.renderDoubleDigits(this.props.hoursLabel, newTime[1])
          : null}
        {_.includes(timeToShow, 'M')
          ? this.renderDoubleDigits(this.props.minLabel, newTime[2])
          : null}
      </Component>
    );
  };

  render() {
    return <View style={this.props.style}>{this.renderCountDown()}</View>;
  }
}

CountDown.propTypes = {
  digitBgColor: PropTypes.string,
  digitTxtColor: PropTypes.string,
  timeTxtColor: PropTypes.string,
  timeToShow: PropTypes.array,
  size: PropTypes.number,
  until: PropTypes.number,
  onFinish: PropTypes.func,
  onPress: PropTypes.func,
  style: PropTypes.any,
  daysLabel: PropTypes.string,
  hoursLabel: PropTypes.string,
  minLabel: PropTypes.string,
  secLabel: PropTypes.string,
  hasLabel: PropTypes.bool,
  textDescStyle: PropTypes.any,
  simpleDg: PropTypes.bool,
  onUpdate: PropTypes.func,
};

CountDown.defaultProps = {
  digitBgColor: DEFAULT_BG_COLOR,
  digitTxtColor: DEFAULT_DIGIT_TXT_COLOR,
  timeTxtColor: DEFAULT_TIME_TXT_COLOR,
  timeToShow: DEFAULT_TIME_TO_SHOW,
  daysLabel: 'days',
  hoursLabel: 'hours',
  minLabel: 'minutes',
  secLabel: 'secondes',
  until: 0,
  size: 15,
  onFinish: () => { },
  onPress: () => { },
  style: {},
  simpleDg: true,
  hasLabel: true,
  textDescStyle: styles.timeTxt,
  onUpdate: () => { },
};
