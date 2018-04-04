import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { string, number } from 'prop-types';

export default class PulseAnimation extends Component {
  state = {
    top: this.props.top,
    color: this.props.color,
    numPulses: this.props.numPulses,
    maxDiameter: this.props.diameter,
    speed: this.props.speed,
    duration: this.props.duration,
    pulses: [],
  };


  componentDidMount() {
    this.started = true;

    let a = 0;
    while (a < this.state.numPulses) {
      setTimeout(() => {
        this._createPulse();
      }, a * this.state.duration);
      a += 1;
    }

    this.timer = setInterval(() => {
      this._updatePulse();
    }, this.state.speed);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  started = false;

  _createPulse() {
    const { pulses } = this.state;

    const pulse = {
      pulseKey: pulses.length + 1,
      diameter: 0,
      opacity: 0.5,
    };

    pulses.push(pulse);

    this.setState({
      pulses,
    });
  }

  _updatePulse() {
    const pulses = this.state.pulses.map((p, i) => {
      const { maxDiameter } = this.state;
      const newDiameter = p.diameter > maxDiameter ? 0 : p.diameter + 2;
      const centerOffset = (maxDiameter - newDiameter) / 2;
      const opacity = Math.abs(newDiameter / maxDiameter - 1);

      const pulse = {
        pulseKey: i + 1,
        diameter: newDiameter,
        opacity: opacity > 0.5 ? 0.5 : opacity,
        centerOffset,
      };

      return pulse;
    });

    this.setState({
      pulses,
    });
  }

  render() {
    if (this.started) {
      return (
        <View style={[styles.container, { top: this.state.top }]}>
          <View
            style={[
              styles.pulseContainer,
              {
                width: this.state.maxDiameter,
                height: this.props.marginTop + this.state.maxDiameter / 2,
              },
            ]}
          >
            {this.state.pulses.map((pulse) => (
              <View
                key={pulse.pulseKey}
                style={[
                  styles.pulse,
                  {
                    backgroundColor: this.state.color,
                    width: pulse.diameter,
                    height: pulse.diameter,
                    opacity: pulse.opacity,
                    borderRadius: pulse.diameter / 2,
                    top: this.props.marginTop,
                    left: pulse.centerOffset,
                  },
                ]}
              />
            ))}
          </View>
        </View>
      );
    }
    return <View style={styles.container} />;
  }
}

PulseAnimation.propTypes = {
  top: number,
  color: string,
  numPulses: number,
  diameter: number,
  speed: number,
  duration: number,
  marginTop: number,
};

PulseAnimation.defaultProps = {
  top: 150,
  color: 'blue',
  numPulses: 3,
  diameter: 400,
  speed: 10,
  duration: 1000,
  marginTop: 10,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  pulse: {
    position: 'absolute',
    flex: 1,
  },
});
