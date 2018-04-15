import React from 'react';
import { View, Text, Platform } from 'react-native';

import OpacityGradientView from 'react-native-opacity-gradient';


import AndroidGradientOpacity from 'common/androidGradientOpacity';

import { styles } from './styles';

const gridLabelLegend = () => (
  <View style={styles.gridLegendView}>

    <Text style={styles.gridLegendText}>
      zone
    </Text>
  </View>
);

const infoLabelLegend = () => (
  <View style={styles.gridLegendView}>

    <Text style={styles.gridLegendText}>
      W.C
    </Text>
    <Text style={styles.gridLegendText}>
      Porte
    </Text>
  </View>
);

const MapLegend = (isGrid) => {
  if (isGrid) {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.legendView}>
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
              <View style={styles.gridLegendView}>
                <Text style={styles.gridLegendText}>
                  zone
                </Text>
              </View>
            </OpacityGradientView >
          </OpacityGradientView >
        </View>

      );
    }
    return (
      <View style={styles.legendView}>
        <AndroidGradientOpacity globaleOpacity={1}>
          <View style={styles.gridLegendView}>
            <Text style={styles.gridLegendText}>
              zone
            </Text>
          </View>
        </AndroidGradientOpacity>
      </View>

    );
  }


  return (
    null
  );
};


export default MapLegend;
