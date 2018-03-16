import React from 'react';
import {
  PanResponder,
  Dimensions,
  View,
  Button,
  StyleSheet,
  Animated,
} from 'react-native';
import Loading from './loading';
import TimeLine from './timeline';
import SubHeader from './subheader';
import Map from '../map'

const { width, height } = Dimensions.get('window');
const TOP_MARGIN = 70;
const BOTTOM_MARGIN = 100
const BOTTOM_POSITION = height - TOP_MARGIN - BOTTOM_MARGIN
const TOP_POSITION = 0

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.isTop = false;
    this.state = {
      animeLineUpPosition: new Animated.Value(BOTTOM_POSITION),
      isLoading: true
    };
  }

  componentDidMount() {
    Animated.delay(3000).start(() => {
      this.setState(state => ({ ...state, isLoading: false }),
        () => {
          Animated.timing(this.state.animeLineUpPosition, {
            toValue: TOP_POSITION,
            delay: 9000
          }).start(() => {
            this.isTop = true
          })
        })
    })
  }

  animeLineUp = () => {
    if (this.isTop) {
      Animated.timing(this.state.animeLineUpPosition, {
        toValue: BOTTOM_POSITION,
      }).start(() => {
        this.isTop = false
      })
    } else {
      Animated.timing(this.state.animeLineUpPosition, {
        toValue: TOP_POSITION,
      }).start(() => {
        this.isTop = true
      })
    }
  }

  render() {
    const { navigation } = this.props;
    const { animeLineUpPosition, isLoading } = this.state;

    return (
      <View style={styles.mainContainer}>
        <Map isFirstTime={!isLoading}></Map>
        <Animated.View
          style={{
            marginTop: TOP_MARGIN,
            flex: 1,
            transform: [{ translateY: animeLineUpPosition }]
          }}
        >
          <SubHeader onPress={this.animeLineUp} />

          <TimeLine navigation={navigation} />
        </Animated.View>
        <Loading isLoading={isLoading} />

      </View>
    );
  }
}

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

export default Home;
