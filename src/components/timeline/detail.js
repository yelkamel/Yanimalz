import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import appStyles from 'appStyles';
import CountDown from 'common/countDown';
import I18n from 'i18n';
import theme from 'theme';
// import CountdownCircle from 'common/countDownCircle';
import styles from './styles';
import PictureSwitch from './pictureSwitch';
import { TIME_STATUS } from '../../data';

class Detail extends React.Component {
  state = {
    isOpen: false,
    //  animate: false,
    nextEventIn: this.props.nextEventIn,
  };

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rowData.hasNotif) {
      this.setState((state) => ({
        ...state,
        isOpen: nextProps.rowData.hasNotif,
      }));
    }

    if (nextProps.nextEventIn !== this.props.nextEventIn) {
      this.setState((state) => ({
        ...state,
        nextEventIn: nextProps.nextEventIn,
      }));
    }

    /*
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
     */
  }

  renderHourGlass() {
    const { currentEvent: { key }, rowData } = this.props;
    if (this.state.nextEventIn > 0 && rowData.key === key) {
      return (
        <CountDown
          digitTxtColor={theme.colors.primaryDark}
          digitBgColor={theme.colors.primaryLight}
          daysLabel={I18n.t('days')}
          hoursLabel={I18n.t('hours')}
          minLabel={I18n.t('minutes')}
          secLabel={I18n.t('seconds')}
          until={this.state.nextEventIn}
          timeToShow={['M', 'S']}
        />);
    }
    return null;
  }
  render() {
    const { rowData, setNotifForEvent } = this.props;
    const { isOpen } = this.state;

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
        />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  nextEventIn: state.app.nextEventIn,
  currentEvent: state.app.currentEvent,
});

Detail.defaultProps = {
  // animate: false,
};

Detail.propTypes = {
  rowData: PropTypes.shape({
    hasNotif: PropTypes.bool.isRequired,
  }).isRequired,

  // rowId: PropTypes.number.isRequired,
  //  animate: PropTypes.bool,
  setNotifForEvent: PropTypes.func.isRequired,
  nextEventIn: PropTypes.number.isRequired,
  currentEvent: PropTypes.any.isRequired,
};
export default connect(mapStateToProps)(Detail);
