
import React, { Component } from 'react';
import {
  Animated,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';


export default class LargeSlider extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorValue: props.value,
      value: props.value,
      height: 360, // provisional value
    };


    this.range = props.maximumValue - props.minimumValue;
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.props.onSlidingStart();
        this.setState({ anchorValue: this.state.value });
      },
      onPanResponderMove: Animated.event([null, {}], { listener: this.handleSlide }),
      onPanResponderRelease: () => { this.props.onSlidingComplete(); },
    });
  }

  onLayout = ({ nativeEvent }) => {
    this.setState((state) => ({
      ...state,
      // width: nativeEvent.layout.width,
      height: nativeEvent.layout.height,
    }));
  }

  slideTo = (value) => {
    this.setState({ value });
  }

  handleSlide = (evt, gestureState) => {
    const { maximumValue, minimumValue } = this.props;
    const valueIncrement = (-gestureState.dy * this.range) / this.state.height;
    let nextValue = this.state.anchorValue + valueIncrement;
    nextValue = nextValue >= maximumValue ? maximumValue : nextValue;
    nextValue = nextValue <= minimumValue ? minimumValue : nextValue;


    this.props.onValueChange(nextValue);
    this.setState({ value: nextValue });
  }


  render() {
    const { value } = this.state;
    const unitValue = (value - this.props.minimumValue) / this.range;
    const { renderLabel, style, trackStyle, label, inSidelabel, maximumValue } = this.props;
    const onTop = value < (maximumValue / 2);
    return (
      <View
        onLayout={this.onLayout}
        style={[styles.container, style]}
        {...this.panResponder.panHandlers}
      >
        {
          onTop && renderLabel(onTop)
        }
        <View style={[styles.pendingTrack, { flex: 1 - unitValue, justifyContent: 'center', alignItems: 'center' }]} >
          <Text style={styles.trackLabelText}>
            {inSidelabel}
          </Text>
        </View>
        <View style={[styles.track, { flex: unitValue }, trackStyle]}>
          <View style={styles.thumb} />
          {!onTop && renderLabel(onTop)
          }
        </View>
      </View>
    );
  }
}

LargeSlider.propTypes = {
  value: PropTypes.number,
  maximumValue: PropTypes.number,
  minimumValue: PropTypes.number,
  onSlidingStart: PropTypes.func,
  onValueChange: PropTypes.func,
  onSlidingComplete: PropTypes.func,
  renderLabel: PropTypes.func,
  style: PropTypes.any,
  trackStyle: PropTypes.any,
  label: PropTypes.string,
  inSidelabel: PropTypes.string,
};

LargeSlider.defaultProps = {
  value: 40,
  maximumValue: 100,
  minimumValue: 0,
  onSlidingStart: () => { },
  onValueChange: () => { },
  onSlidingComplete: () => { },
  renderLabel: () => { },
  style: {},
  trackStyle: {},
  label: '',
  inSidelabel: '',
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgb(241, 242, 247)',
    borderRadius: 12,
    overflow: 'hidden',
    width: 120,
  },
  pendingTrack: {
  },
  track: {
    flex: 1,
    backgroundColor: 'rgb(1, 160, 188)',
    borderRadius: 12,
    alignSelf: 'stretch',
  },
  trackLabel: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackLabelText: {
    color: 'white',
    fontWeight: '600',
  },
  thumb: {
    backgroundColor: 'rgba(0,0,0,.5)',
    borderRadius: 12,
    height: 3,
    width: 24,
    marginTop: 6,
    alignSelf: 'center',
  },
});


function formatNumber(x) {
  return x.toFixed(1).replace(/\.?0*$/, '');
}
