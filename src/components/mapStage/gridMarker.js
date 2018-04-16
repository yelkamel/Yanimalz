import React from 'react';
import { View, Platform, Text } from 'react-native';
import OpacityGradientView from 'react-native-opacity-gradient';
import PropTypes from 'prop-types';
import { Marker } from 'react-native-maps';
import AndroidGradientOpacity from 'common/androidGradientOpacity';

import { styles } from './styles';

const GRID_MARKER_POSITION = {
  longitude: 2.36534,
  latitude: 48.90328,
};

const ROW_MARKER = [
  {
    id: 'buffle',
  },
  {
    id: 'elephant',
  },
  {
    id: 'hibou',
  },
  {
    id: 'cat',
  },
  {
    id: 'phaco',
  },
  {
    id: 'bear',
  },
  {
    id: 'wolf',
  },
  {
    id: 'monkey',
  },
  {
    id: 'lion',
  },
  {
    id: 'cosmo',
  },
];

const getAlpha = (index) => {
  switch (index) {
    case 0:
      return 'D';
    case 2:
      return 'O';
    case 4:
      return 'C';
    case 6:
      return 'K';
    case 8:
      return 'S';
    default:
      return '?';
  }
};

const markerView = (nb, isExt = false) => (
  <View style={styles.gridMarkerView}>
    <Text style={styles.gridMarkerText}>
      {isExt ? getAlpha(nb) : nb + 1}
    </Text>
  </View>
);
class GridMarker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tracksViewChanges: props.tracksViewChanges,
      isHide: props.isHide,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.tracksViewChanges !== this.props.tracksViewChanges) {
      this.setState((state) => ({
        ...state,
        tracksViewChanges: nextProps.tracksViewChanges,
        isHide: nextProps.isHide,
      }));
    }
  }


  renderMarker(item, index) {
    const { isHide } = this.state;

    if (isHide) {
      return (
        <View
          key={item.id}
          style={{ height: 5, width: 5, backgroundColor: 'transparent' }}
        />
      );
    }
    if (Platform.OS === 'ios') {
      return (
        <View
          key={item.id}
          style={[styles.gradient, { opacity: 0.6 }]}
        >
          <OpacityGradientView
            colors={['transparent', 'white', 'white', 'transparent']}
            locations={[0, 0.3, 0.70, 1.0]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
          >

            <OpacityGradientView
              colors={['transparent', 'white', 'white', 'transparent']}
              locations={[0, 0.3, 0.70, 1.0]}
              start={{ x: 1, y: 0.0 }}
              end={{ x: 0.0, y: 0.0 }}
            >
              {markerView(index, true)}

            </OpacityGradientView >
          </OpacityGradientView >
          <OpacityGradientView
            colors={['transparent', 'white', 'white', 'transparent']}
            locations={[0, 0.3, 0.70, 1.0]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
          >

            <OpacityGradientView
              colors={['transparent', 'white', 'white', 'transparent']}
              locations={[0, 0.3, 0.70, 1.0]}
              start={{ x: 1, y: 0.0 }}
              end={{ x: 0.0, y: 0.0 }}
            >

              {markerView(index)}

            </OpacityGradientView>

          </OpacityGradientView>
          <OpacityGradientView
            colors={['transparent', 'white', 'white', 'transparent']}
            locations={[0, 0.3, 0.70, 1.0]}
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0.0, y: 1.0 }}
          >

            <OpacityGradientView
              colors={['transparent', 'white', 'white', 'transparent']}
              locations={[0, 0.3, 0.70, 1.0]}
              start={{ x: 1, y: 0.0 }}
              end={{ x: 0.0, y: 0.0 }}
            >
              {markerView(index + 1)}

            </OpacityGradientView >
          </OpacityGradientView >
        </View >
      );
    }

    return (
      <View
        key={item.id}
        style={[styles.gradient]}
      >
        <AndroidGradientOpacity globaleOpacity={0.8}>
          {markerView(index, true)}
        </AndroidGradientOpacity>
        <AndroidGradientOpacity globaleOpacity={0.8}>
          {markerView(index)}
        </AndroidGradientOpacity>
        <AndroidGradientOpacity globaleOpacity={0.8}>
          {markerView(index + 1)}
        </AndroidGradientOpacity>
      </View >
    );
  }

  render() {
    return (
      <Marker
        tracksViewChanges={this.state.tracksViewChanges}
        anchor={{ x: 0.34, y: 0.8 }}
        coordinate={GRID_MARKER_POSITION}
      >

        {ROW_MARKER.map((item, index) => {
          if (index % 2 === 0) { return this.renderMarker(item, index); }

          return null;
        })}
      </Marker>
    );
  }
}

GridMarker.propTypes = {
  isHide: PropTypes.bool.isRequired,
  tracksViewChanges: PropTypes.bool.isRequired,
};

export default GridMarker;
