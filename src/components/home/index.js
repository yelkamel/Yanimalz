import React from 'react';
import { View, Animated } from 'react-native';
import store from 'react-native-simple-store';
import { loadTimeLine, updateTimeLine } from 'actions/timeline';
import { loadTimeBeforeNotif } from 'actions/app';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';
import theme from 'theme';
import Share from 'react-native-share';

import Menu from '../menu';
import Loading from './loading';
import TimeLine from '../timeline';
import Banner from './banner';
import MapStage from '../mapStage';
import NotifModal from './notifModal';
import appStyles from '../../appStyles';
import styles from './styles';

const TOP_MARGIN = 70;

const TOP_POSITION = 0;


class Home extends React.Component {
  state = {
    animeLineUpPosition: new Animated.Value(TOP_POSITION),
    isLoading: true,
    isTop: true,
    isAnimate: false,
  };

  componentDidMount() {
    store.get('notifList').then((notifList) => {
      this.props.loadTimeLine(notifList);
      store.get('timeBeforeNotif').then((min) => {
        this.props.loadTimeBeforeNotif(min);
      });
    });
    this.bannerHeight = this.props.untilEvent > 0 ? theme.size.bannerHeight
      : theme.size.bannerHeightLight;

    // AppState.addEventListener('change', this.handleAppStateChange);
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
    //  AppState.removeEventListener('change', this.handleAppStateChange);
  }

  modal = null;
  bannerHeight = theme.size.bannerHeight;
  /*
  handleAppStateChange = (nextAppState) => {
     if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
     console.log('App has come to the foreground!');
    }
  };
  */

  bottomPosition = () => {
    const res = theme.size.screenHeight - this.bannerHeight - TOP_MARGIN;
    if (this.props.untilEvent > 0) {
      return res;
    }
    return res - 70;
  }


  selectedMenuItem = (type = 'notif') => {
    const shareOptions = {
      title: 'React Native',
      message: 'Hola mundo',
      url: 'http://facebook.github.io/react-native/',
      subject: 'Share Link', //  for email
    };

    switch (type) {
      case 'notif':
        this.modal.open();
        break;
      case 'share':
        Share.open(shareOptions).catch(() => { });
        break;

      default:
        break;
    }
  };

  animeLineUp = () => {
    this.setState(
      (state) => ({ ...state, isAnimate: true }),
      () => {
        if (this.state.isTop) {
          Animated.timing(this.state.animeLineUpPosition, {
            toValue: this.bottomPosition(),
            // easing: Easing.linear(),
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
            // easing: Easing.elastic(),
          }).start(() => {
            this.setState((state) => ({
              ...state,
              isTop: true,
              isAnimate: false,
            }));
          });
        }
      },
    );
  };

  render() {
    const { animeLineUpPosition, isLoading, isTop, isAnimate } = this.state;
    const { untilEvent } = this.props;
    return (
      <View style={appStyles.flexOne}>
        <Animated.View
          style={[
            styles.absoluteBlack,
            {
              opacity: animeLineUpPosition.interpolate({
                inputRange: [TOP_POSITION, this.bottomPosition()],
                outputRange: [0.7, 0],
              }),
            },
          ]}
        />
        <MapStage onFinishAnimation={() => { }} isFirstTime={!isLoading} />
        <Menu onSelectItem={this.selectedMenuItem} />

        <Animated.View
          style={{
            marginTop: TOP_MARGIN,
            flex: 1,
            transform: [{ translateY: animeLineUpPosition }],
          }}
        >
          <Banner
            isTop={isTop}
            isAnimate={isAnimate}
            animeLineUp={this.animeLineUp}
            untilEvent={untilEvent}
          />
          {!isLoading && <TimeLine isOpen={isTop} />}
        </Animated.View>
        <Loading onFinish={this.animeLineUp} isLoading={isLoading} />
        <Modal
          style={styles.topModal}
          entry="top"
          backdrop
          position="top"
          ref={(m) => (this.modal = m)}
        >
          <NotifModal />
        </Modal>
      </View>
    );
  }
}

Home.propTypes = {
  loadTimeLine: PropTypes.func.isRequired,
  updateTimeLine: PropTypes.func.isRequired,
  loadTimeBeforeNotif: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isUpdated: PropTypes.bool.isRequired,
  nextEventIn: PropTypes.number.isRequired,
  untilEvent: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => ({
  isLoading: state.timeline.isLoading,
  isUpdated: state.timeline.isUpdated,
  nextEventIn: state.timeline.nextEventIn,
  untilEvent: state.app.untilEvent,

});

const mapDispatchToProps = (dispatch) => ({
  loadTimeLine: (notifList) => {
    dispatch(loadTimeLine(notifList));
  },
  updateTimeLine: () => {
    dispatch(updateTimeLine());
  },
  loadTimeBeforeNotif: (min) => {
    dispatch(loadTimeBeforeNotif(min));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Home);
