import React from 'react';
import { View, StyleSheet } from 'react-native';
import Timeline from 'react-native-timeline-listview';
import { string, instanceOf, func, shape, number } from 'prop-types';
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
          innerCircle={'dot'}
        />
      </View>
    );
  }
}

TimeLine.propTypes = {
  navigation: shape({
    dispatch: func.isRequired,
    goBack: func.isRequired,
    navigate: func.isRequired,
    setParams: func.isRequired,
    state: shape({
      key: string.isRequired,
      routeName: string.isRequired,
    }).isRequired,
  }).isRequired,
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
