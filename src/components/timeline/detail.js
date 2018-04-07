import React from 'react';
import { View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import appStyles from 'appStyles';
import CountDown from 'common/countDown';
import I18n from 'i18n';
import theme from 'theme';
import CountdownCircle from 'common/countDownCircle';
import styles from './styles';
import PictureSwitch from './pictureSwitch';
import { TIME_STATUS } from '../../data';

class Detail extends React.Component {
  state = {
    isOpen: false,
    animate: false,
  };

  componentDidMount() { }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rowData.hasNotif) {
      this.setState((state) => ({
        ...state,
        isOpen: nextProps.rowData.hasNotif,
      }));
    }

    if (nextProps.animate !== this.props.animate && nextProps.animate) {
      Animated.delay(nextProps.rowId * 500).start(() => {
        this.setState(
          (state) => ({ ...state, animate: true }),
          () => {
            this.setState((state) => ({ ...state, animate: false }));
          },
        );
      });
    }
  }
  renderHourGlass() {
    if (this.props.nextEventIn > 0) {
      return (<CountDown
        digitTxtColor={theme.colors.primaryDark}
        digitBgColor={theme.colors.primaryLight}
        daysLabel={I18n.t('days')}
        hoursLabel={I18n.t('hours')}
        minLabel={I18n.t('minutes')}
        secLabel={I18n.t('seconds')}
        until={this.props.nextEventIn}
        timeToShow={['M', 'S']}
              />);

      /*  return (
          <CountdownCircle
            seconds={this.props.nextEventIn}
            radius={30}
            borderWidth={10}
            color="#ff003f"
            bgColor={theme.colors.primaryDark}
            textStyle={styles.countDownInner}
            updateText={(elapsedSeconds, totalSeconds) =>
              Math.floor((totalSeconds - elapsedSeconds) / 60).toString()}
            onTimeElapsed={() => console.log('Elapsed!')}
          />
        ); */
    }
    return null;
  }
  render() {
    const { rowData, setNotifForEvent } = this.props;
    const { isOpen, animate } = this.state;

    if (rowData.status === TIME_STATUS[1]) {
      return (
        <View style={styles.currentEvent}>
          <Text
            style={[
              styles.title,
              {
                color: rowData.lineColor,
              },
            ]}
          >
            {rowData.title}
          </Text>
          {this.renderHourGlass()}
        </View>
      );
    }

    if (rowData.status === TIME_STATUS[0]) {
      return (
        <View style={styles.eventPast}>
          <Text
            style={[
              styles.title,
              {
                color: rowData.lineColor,
              },
            ]}
          >
            {rowData.title}
          </Text>
        </View>
      );
    }
    return (
      <View style={styles.nextEvent}>
        <Text
          style={[
            styles.title,
            {
              color: rowData.lineColor,
            },
          ]}
        >
          {rowData.title}
        </Text>
        <PictureSwitch
          action={setNotifForEvent}
          picture={rowData.picture}
          icon={rowData.icon}
          isOpen={isOpen}
          value={rowData.key}
          enabled={rowData.status === TIME_STATUS[2]}
          animate={animate}
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  nextEventIn: state.timeline.nextEventIn,
});

Detail.defaultProps = {
  animate: false,
};

Detail.propTypes = {
  rowData: PropTypes.shape({
    hasNotif: PropTypes.bool.isRequired,
  }).isRequired,
  rowId: PropTypes.number.isRequired,
  animate: PropTypes.bool,
  setNotifForEvent: PropTypes.func.isRequired,
  nextEventIn: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Detail);
