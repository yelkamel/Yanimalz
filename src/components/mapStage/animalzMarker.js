import React from 'react';
import { View, Image, Platform } from 'react-native';
import OpacityGradientView from 'react-native-opacity-gradient';
import PropTypes from 'prop-types';

import { styles } from './styles';

class AnimalzMarker extends React.Component {
  state = {};

  shouldComponentUpdate(nextProps) {
    return nextProps.isHide !== this.props.isHide;
  }

  render() {
    const { animalzList, item, index, isHide } = this.props;

    if (isHide) {
      return null;
    }
    if (Platform.OS === 'ios') {
      return (
        <View
          style={[styles.gradient, { opacity: 0.6 }]}
        >
          <OpacityGradientView
            colors={['transparent', 'white', 'white', 'transparent']}
            locations={[0, 0.2, 0.80, 1.0]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
          >

            <OpacityGradientView
              colors={['transparent', 'white', 'white', 'transparent']}
              locations={[0, 0.2, 0.80, 1.0]}
              start={{ x: 1, y: 0.0 }}
              end={{ x: 0.0, y: 0.0 }}
            >
              <Image
                source={item.image}
                style={[
                  styles.animalzStyle,
                ]}
              />
            </OpacityGradientView>

          </OpacityGradientView>
          <OpacityGradientView
            colors={['transparent', 'white', 'white', 'transparent']}
            locations={[0, 0.2, 0.80, 1.0]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
          >

            <OpacityGradientView
              colors={['transparent', 'white', 'white', 'transparent']}
              locations={[0, 0.2, 0.80, 1.0]}
              start={{ x: 1, y: 0.0 }}
              end={{ x: 0.0, y: 0.0 }}
            >
              <Image
                source={animalzList[index + 1].image}
                style={[
                  styles.animalzStyle,
                ]}
              />
            </OpacityGradientView >
          </OpacityGradientView >
        </View >
      );
    }
    return (
      <View
        style={[styles.gradient, { opacity: 0.5 }]}
      >
        <Image
          source={item.image}
          style={[
            styles.animalzStyle,
          ]}
        />
        <Image
          source={animalzList[index + 1].image}
          style={[
            styles.animalzStyle,
          ]}
        />

      </View>
    );
  }
}

AnimalzMarker.propTypes = {
  animalzList: PropTypes.array.isRequired,
  item: PropTypes.any.isRequired,
  index: PropTypes.number.isRequired,
  isHide: PropTypes.bool.isRequired,
};

export default AnimalzMarker;
