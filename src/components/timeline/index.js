import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated, Text } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import Button from 'common/button';
import {
  updateTimeLine,
  setNotifForEvent,
  setNextEventTime,
  setAlert,
} from 'actions/app';
import { getRandomQuestion } from 'utils';
import { TIME_STATUS } from 'data';
import styles from './styles';
import theme from '../../theme';
import Detail from './detail';

class TimeLine extends React.Component {
  state = {
    animateEvent: false,
  };

  componentDidMount() {
    const nbOfEventPast = this.numberOfPastEvent;
    this.updateAtTheNextHours();
    Animated.delay(2000).start(() => {
      if (nbOfEventPast < 10) {
        this.scrollTimeLine.scrollTo({
          x: 0,
          y: nbOfEventPast * (theme.size.pastEventHeight + 20),
          Animated: true,
        });
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen && nextProps.isOpen) {
      if (this.numberOfNotif === 0) {
        this.setState((state) => ({ ...state, animateEvent: true }));
      }
    }

    this.handleAppStateChange(this.props.appState, nextProps.appState);
  }


  handleAppStateChange = (currentAppState, nextAppState) => {
    if (currentAppState.match(/inactive|background/) && nextAppState === 'active') {
      console.log('==IS FROM BACKGROUND==');
      this.updateAtTheNextHours();
    }
  };


  numberOfNotif = 0;
  numberOfPastEvent = 0;
  scrollTimeLine = null;

  updateAtTheNextHours() {
    const currentTime = moment();
    const nextHoursTime = currentTime.clone().add(60, 'minutes');
    nextHoursTime.set({
      minute: '00',
      second: '00',
    });

    const diffInSeconds = nextHoursTime.diff(currentTime, 'seconds');
    this.props.setNextEventTime(diffInSeconds);
    Animated.delay((diffInSeconds + 1) * 1000).start(() => {
      this.props.updateTimeLine();
      this.updateAtTheNextHours();
    });
  }


  onPressQuestion = () => {
    this.props.setAlert(getRandomQuestion());
  }

  renderDetail = (rowData, sectionID, rowID) => {
    const intIndex = parseInt(rowID, 10);
    const { animateEvent } = this.state;

    if (rowData.hasNotif) {
      this.numberOfNotif += 1;
    }

    if (rowData.status === TIME_STATUS[0]) {
      this.numberOfPastEvent += 1;
    }

    if (intIndex + 1 !== this.props.timeLineData.length) {
      return (
        <Detail
          rowId={parseInt(rowID, 10)}
          setNotifForEvent={this.props.setNotifForEvent}
          rowData={rowData}
          animate={animateEvent}
        />
      );
    }
    return null;
  };

  renderCircle = () => null

  renderTime = (rowData, sectionID, rowID) => {
    const timeArray = rowData.time.split(/\s+/);

    return (
      <View style={{
        alignItems: 'flex-end',
      }}
      >
        <View style={{
          minWidth: 45,
        }}
        >
          <Text style={{
            textAlign: 'right',
            color: theme.colors.primaryLight,
          }}
          >
            {this.props.untilEvent > 1 ? rowData.fakeTime : timeArray[0]}
          </Text>
        </View>
      </View>
    );
  }

  render() {
    const { timeLineData } = this.props;

    return (
      <View style={styles.mainContainer}>
        <Timeline
          data={timeLineData}
          style={styles.list}
          renderTime={this.renderTime}
          timeStyle={styles.timeStyle}
          circleSize={20}
          circleColor={theme.colors.primaryLight}
          lineColor={theme.colors.primaryLight}
          renderDetail={this.renderDetail}
          renderCircle={this.renderCircle}
          lineWidth={4}
          enableEmptySections
          options={{
            ref: (scroll) => this.scrollTimeLine = scroll,
            contentContainerStyle: { paddingTop: 20 },
          }}
        />
        <View style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}
        >
          <Button onPress={this.onPressQuestion} label="Quiz" />
        </View>
      </View>
    );
  } //          renderCircle={() => null}
}

TimeLine.propTypes = {
  timeLineData: PropTypes.array.isRequired,
  updateTimeLine: PropTypes.func.isRequired,
  setNotifForEvent: PropTypes.func.isRequired,
  setNextEventTime: PropTypes.func.isRequired,
  isOpen: PropTypes.bool.isRequired,
  untilEvent: PropTypes.number.isRequired,
  appState: PropTypes.string.isRequired,
  setAlert: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timeLineData: state.app.timeline,
  untilEvent: state.app.untilEvent,
  appState: state.app.appState,
});

const mapDispatchToProps = (dispatch) => ({
  updateTimeLine: () => {
    dispatch(updateTimeLine());
  },
  setNotifForEvent: (eventId, addNotif) => {
    dispatch(setNotifForEvent(eventId, addNotif));
  },
  setNextEventTime: (seconds) => {
    dispatch(setNextEventTime(seconds));
  },
  setAlert: (alert) => {
    dispatch(setAlert(alert));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
