import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated, AppState } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import { updateTimeLine, setNotifForEvent, setNextEventTime } from 'actions/timeline';
import { TIME_STATUS } from 'data';
import styles from './styles';
import theme from '../../theme';
import Detail from './detail';

class TimeLine extends React.Component {
  state = {
    animateEvent: false,
    appState: AppState.currentState,

  };

  componentDidMount() {
    const nbOfEventPast = this.numberOfPastEvent;
    this.updateAtTheNextHours();
    Animated.delay(2000).start(() => {
      this.scrollTimeLine.scrollTo({
        x: 0,
        y: nbOfEventPast * (theme.size.pastEventHeight + 20),
        Animated: true,
      });
    });
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.isOpen !== nextProps.isOpen && nextProps.isOpen) {
      if (this.numberOfNotif === 0) {
        this.setState((state) => ({ ...state, animateEvent: true }));
      }
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }


  handleAppStateChange = (nextAppState) => {
    if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      this.updateAtTheNextHours();
    }
    this.setState({ appState: nextAppState });
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

  render() {
    const { timeLineData } = this.props;

    return (
      <View style={styles.mainContainer}>
        <Timeline
          data={timeLineData}
          style={styles.list}
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
};

const mapStateToProps = (state) => ({
  timeLineData: state.timeline.data,
});

const mapDispatchToProps = (dispatch) => ({
  updateTimeLine: () => {
    dispatch(updateTimeLine());
  },
  setNotifForEvent: (eventId) => {
    dispatch(setNotifForEvent(eventId));
  },
  setNextEventTime: (seconds) => {
    dispatch(setNextEventTime(seconds));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
