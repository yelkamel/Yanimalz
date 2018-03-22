import React from 'react';
import {
  Dimensions,
  View,
  StyleSheet,
  Animated,
  PanResponder,
} from 'react-native';
import Loading from './loading';
import TimeLine from './timeline';
import Banner from './banner';
import MapStage from '../mapStage';

const { height } = Dimensions.get('window');
const TOP_MARGIN = 70;
const BOTTOM_MARGIN = 100;
const BOTTOM_POSITION = height - TOP_MARGIN - BOTTOM_MARGIN;
const TOP_POSITION = 0;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animeLineUpPosition: new Animated.Value(BOTTOM_POSITION),
      isLoading: true,
      isTop: false,
      isAnimate: false,
    };
  }

  componentWillMount() {
    this.panResponder = PanResponder.create({
      onMoveShouldSetResponderCapture: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderMove: (event, gestureState) => {
        const { dy } = gestureState;
        if ((dy >= 5 || dy <= -5) && !this.state.isAnimate) {
          this.setState((state) =>
            ({ ...state, isAnimate: true }),
          () => {
            this.animeLineUp();
          });
        }
        return true;
      },
    });
  }

  componentDidMount() {
    Animated.delay(2500).start(() => {
      this.setState((state) => ({ ...state, isLoading: false }));
    });
  }

  animeLineUp = () => {
    if (this.state.isTop) {
      Animated.timing(this.state.animeLineUpPosition, {
        toValue: BOTTOM_POSITION,
      }).start(() => {
        this.setState((state) => ({
          ...state,
          isTop: false,
          isAnimate: false,
        }));
      });
    } else {
      Animated.timing(this.state.animeLineUpPosition, {
        toValue: TOP_POSITION,
      }).start(() => {
        this.setState((state) => ({
          ...state,
          isTop: true,
          isAnimate: false,
        }));
      });
    }
  }

  render() {
    const {
      animeLineUpPosition,
      isLoading,
      isTop,
      isAnimate,
    } = this.state;

    return (
      <View style={styles.mainContainer} >
        <MapStage onFinishAnimation={this.animeLineUp} isFirstTime={!isLoading} />
        <Animated.View
          style={{
            marginTop: TOP_MARGIN,
            flex: 1,
            transform: [{ translateY: animeLineUpPosition }],
          }}
        >
          <Animated.View
            {...this.panResponder.panHandlers}
          >
            <Banner
              isTop={isTop}
              isAnimate={isAnimate}
            />
          </Animated.View>


          <TimeLine />
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
