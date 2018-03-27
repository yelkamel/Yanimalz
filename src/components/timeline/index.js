import React from 'react';
import PropTypes from 'prop-types';
import { View, Animated } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import { connect } from 'react-redux';
import moment from 'moment/moment';
import { updateTimeLine, setNotifForEvent } from 'actions/timeline';
import styles from './styles';
import theme from '../../theme';
import Detail from './detail';

class TimeLine extends React.Component {
  state= {
  }

  componentDidMount() {
    this.props.updateTimeLine();
    this.updateAtTheNextHours();
  }

  updateAtTheNextHours() {
    const currentTime = moment();
    const nextHoursTime = currentTime.clone().add(60, 'minutes');
    nextHoursTime.set({
      minute: '00',
      second: '00',
    });

    const diffInSeconds = nextHoursTime.diff(currentTime, 'seconds');

    Animated.delay((diffInSeconds + 1) * 1000).start(() => {
      this.props.updateTimeLine();
      this.updateAtTheNextHours();
    });
  }
    renderDetail = (rowData, sectionID, rowID) => {
      const intIndex = parseInt(rowID, 10);
      if (intIndex + 1 !== this.props.timeLine.length) {
        return (
          <Detail
            rowId={parseInt(rowID, 10)}
            setNotifForEvent={this.props.setNotifForEvent}
            rowData={rowData}
          />
        );
      }
      return null;
    }


    renderCircle = (rowData, sectionID, rowID) => null

    render() {
      const { timeLine, isUpdated } = this.props;
      return (
        <View style={styles.mainContainer}>
          {isUpdated && <Timeline
            data={timeLine}
            style={styles.list}
            timeStyle={styles.timeStyle}
            circleSize={20}
            circleColor={theme.colors.primaryLight}
            lineColor={theme.colors.primaryLight}
            innerCircle="dot"
            renderDetail={this.renderDetail}
            renderCircle={this.renderCircle}
            lineWidth={4}
            separator={false}
            enableEmptySections
                        />}
        </View>
      );
    }
}

TimeLine.propTypes = {
  timeLine: PropTypes.array.isRequired,
  isUpdated: PropTypes.bool.isRequired,
  updateTimeLine: PropTypes.func.isRequired,
  setNotifForEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  timeLine: state.timeline.data,
  isUpdated: state.timeline.isUpdated,
});

const mapDispatchToProps = (dispatch) => ({
  updateTimeLine: () => {
    dispatch(updateTimeLine());
  },
  setNotifForEvent: (eventId) => {
    dispatch(setNotifForEvent(eventId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
