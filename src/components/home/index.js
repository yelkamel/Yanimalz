import React from 'react';
import {
  Dimensions,
  View,
  Animated,
  PanResponder,
  Easing,
  AppState,
} from 'react-native';
import store from 'react-native-simple-store';
import { loadTimeLine, updateTimeLine } from 'actions/timeline';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Loading from './loading';
import TimeLine from '../timeline';
import Banner from './banner';
import MapStage from '../mapStage';
import appStyles from '../../appStyles';
import styles from './styles';

const { height } = Dimensions.get('window');
const TOP_MARGIN = 70;
const BOTTOM_MARGIN = 100;
const BOTTOM_POSITION = height - TOP_MARGIN - BOTTOM_MARGIN;
const TOP_POSITION = 0;

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      animeLineUpPosition: new Animated.Value(TOP_POSITION),
      isLoading: true,
      isTop: true,
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
    store.get('notifList').then((notifList) => {
      this.props.loadTimeLine(notifList);
    });
    AppState.addEventListener('change', this.handleAppStateChange);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading !== this.props.isLoading && !nextProps.isLoading) {
      this.props.updateTimeLine();
    }
    if (nextProps.isUpdated !== this.props.isUpdated && nextProps.isUpdated) {
      this.setState((state) => ({ ...state, isLoading: false }));
    }
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange = (nextAppState) => {
    // if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
    // console.log('App has come to the foreground!');
    // }
  }

  animeLineUp = () => {
    if (this.state.isTop) {
      Animated.timing(this.state.animeLineUpPosition, {
        toValue: BOTTOM_POSITION,
        easing: Easing.linear(),
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
        easing: Easing.elastic(),
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
      <View style={appStyles.flexOne} >
        <MapStage onFinishAnimation={() => { }} isFirstTime={!isLoading} />
        <Animated.View
          style={[styles.absoluteBlack, {
            opacity: animeLineUpPosition.interpolate({
              inputRange: [TOP_POSITION, BOTTOM_POSITION],
              outputRange: [0.7, 0],
            }),
          }]}
        />
        {!isLoading &&
          <View style={styles.hideBottom} />}
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
          {!isLoading && <TimeLine />}
        </Animated.View>
        <Loading onFinish={this.animeLineUp} isLoading={isLoading} />
      </View>
    );
  }
}


Home.propTypes = {
  loadTimeLine: PropTypes.func.isRequired,
  updateTimeLine: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isUpdated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  isLoading: state.timeline.isLoading,
  isUpdated: state.timeline.isUpdated,
});


const mapDispatchToProps = (dispatch) => ({
  loadTimeLine: (notifList) => {
    dispatch(loadTimeLine(notifList));
  },
  updateTimeLine: () => {
    dispatch(updateTimeLine());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);

