import React, { Component } from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  Easing,
  Image,
  I18nManager,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  button: { flexDirection: 'row', justifyContent: 'center', alignItems: 'center' },
  containerButton: {
    flexDirection: 'row', flex: 1, height: 40, justifyContent: 'center', alignItems: 'center',
  },
  animated: {
    borderRadius: 50,
    borderWidth: 0,
    position: 'absolute',
  },
});


export default class Switch extends Component {
  constructor(props) {
    super(props);

    const { initial, options } = this.props;
    this.state = {
      selected: initial || 0,
    };
    let initValue = 0;
    if (initial) {
      initValue = I18nManager.isRTL ? -(initial / options.length) : (initial / options.length);
    }

    this.animatedValue = new Animated.Value(initValue);
  }

  componentWillMount() {
  }


  getBgColor() {
    const { selected } = this.state;
    const { options, buttonColor } = this.props;
    return options[selected].activeColor || buttonColor;
  }

  _getSwipeDirection(gestureState) {
    const { dx, dy, vx } = gestureState;
    // 0.1 velocity
    if (Math.abs(vx) > 0.1 && Math.abs(dy) < 80) {
      return (dx > 0)
        ? 'RIGHT'
        : 'LEFT';
    }
    return null;
  }

  animate = (value, last) => {
    this.animatedValue.setValue(last);
    Animated.timing(
      this.animatedValue,
      {
        toValue: value,
        duration: 250,
        easing: Easing.cubic,
        useNativeDriver: true,
      },
    ).start();
  }

  toggleItem = (index) => {
    if (this.props.options.length <= 1) return;
    this.animate(
      I18nManager.isRTL ? -(index / this.props.options.length) :
        (index / this.props.options.length),
      I18nManager.isRTL ? -(this.state.selected / this.props.options.length) :
        (this.state.selected / this.props.options.length),
    );
    if (this.props.onPress) {
      this.props.onPress(this.props.options[index].value);
    } else {
      console.log('Call onPress with value: ', this.props.options[index].value);
    }
    this.setState({ selected: index });
  }

  render() {
    const {
      textColor,
      selectedColor,
      fontSize,
      backgroundColor,
      borderColor,
      hasPadding,
      options,
      height,
    } = this.props;

    const optionsTmp = options.map((element, index) =>
      (
        <View
          key={element.value}
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'center' }}
        >
          <TouchableOpacity style={styles.button} onPress={() => this.toggleItem(index)}>
            {element.customIcon}
            {element.imageIcon &&
              <Image
                source={element.imageIcon}
                style={{
                  height: 30,
                  width: 30,
                  tintColor: this.state.selected === index ? selectedColor : textColor,
                }}
              />}
            <Text style={{
              fontSize,
              textAlign: 'center',
              color: this.state.selected === index ? selectedColor : textColor,
              backgroundColor: 'transparent',
            }}
            >{element.label}
            </Text>
          </TouchableOpacity>
        </View>
      ));

    return (
      <View style={{ flexDirection: 'row' }}>
        <View
          style={{ flex: 1 }}
        >
          <View
            style={{ borderRadius: 50, backgroundColor, height }}
            onLayout={(event) => {
              const { width } = event.nativeEvent.layout;
              this.setState({ sliderWidth: (width - (hasPadding ? 2 : 0)) });
            }}
          >
            <View
              style={{
                flex: 1, flexDirection: 'row', borderColor: borderColor || '#c9c9c9', borderRadius: 60, borderWidth: hasPadding ? 1 : 0,
              }}
            >
              {this.state.sliderWidth && (
                <Animated.View
                  style={[
                    {
                      backgroundColor: this.getBgColor(),
                      width:
                        (this.state.sliderWidth / options.length) - (hasPadding ? 2 : 0),
                      transform: [
                        {
                          translateX: this.animatedValue.interpolate({
                            inputRange: [0, 1],
                            outputRange: [
                              hasPadding ? 2 : 0,
                              this.state.sliderWidth - (hasPadding ? 2 : 0),
                            ],
                          }),
                        },
                      ],
                      marginTop: hasPadding ? 2 : 0,
                      height,
                    },
                    styles.animated,
                  ]}
                />
              )}
              {optionsTmp}
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Switch.propTypes = {
  textColor: PropTypes.any,
  selectedColor: PropTypes.any,
  fontSize: PropTypes.number,
  backgroundColor: PropTypes.any,
  borderColor: PropTypes.any,
  hasPadding: PropTypes.bool,
  buttonColor: PropTypes.any,
  initial: PropTypes.number,
  options: PropTypes.array.isRequired,
  onPress: PropTypes.func,
  height: PropTypes.number,
};


Switch.defaultProps = {
  textColor: '#000000',
  selectedColor: '#FFFFFF',
  fontSize: 14,
  backgroundColor: '#FFFFFF',
  borderColor: '#C9C9C9',
  hasPadding: false,
  buttonColor: '#BCD635',
  initial: 0,
  onPress: () => { },
  height: 40,
};
