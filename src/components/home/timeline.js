import React from 'react';
import { View, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import { TIME_LINE } from 'data';

class TimeLine extends React.Component {
  render() {
    return (
      <View style={styles.mainContainer}>
        <Timeline
          data={TIME_LINE}
          style={styles.list}
          circleSize={20}
          circleColor="rgb(45,156,219)"
          lineColor="rgb(45,156,219)"
          innerCircle="dot"
        />
      </View>
    );
  }
}

TimeLine.propTypes = {

};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  list: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
});

export default TimeLine;
