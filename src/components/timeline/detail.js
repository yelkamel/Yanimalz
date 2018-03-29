import React from 'react';
import { View, Text, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import styles from './styles';
import PictureSwitch from './pictureSwitch';
import { TIME_STATUS } from '../../data';


class Detail extends React.Component {
  state = {
    isOpen: false,
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      duration: this.props.nextEventIn * 1000,
      toValue: 250,
    }).start();
  }

  componentWillReceiveProps(nextProps) {
    this.setState((state) => ({
      ...state,
      isOpen: nextProps.rowData.hasNotif,
    }));
  }
  animatedValue = new Animated.Value(0);

  renderHourGlass() {
    return (
      <Animated.View style={{
        height: 30,
        width: this.animatedValue,
        backgroundColor: 'red',
      }}
      />
    );
  }
  render() {
    const { rowData, setNotifForEvent } = this.props;
    const { isOpen } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Text style={[styles.title, {
          color: rowData.lineColor,
        }]}
        >
          {rowData.title}
        </Text>
        {rowData.status === TIME_STATUS[1] && this.renderHourGlass()}
        <PictureSwitch
          action={setNotifForEvent}
          picture={rowData.picture}
          isOpen={isOpen}
          value={rowData.key}
          enabled={rowData.status === TIME_STATUS[2]}
        />
      </View>

    );
  }
}

const mapStateToProps = (state) => ({
  nextEventIn: state.timeline.nextEventIn,
});


Detail.propTypes = {
  rowData: PropTypes.shape({
    hasNotif: PropTypes.bool.isRequired,
  }).isRequired,
  setNotifForEvent: PropTypes.func.isRequired,
  nextEventIn: PropTypes.number.isRequired,
};
export default connect(mapStateToProps)(Detail);
