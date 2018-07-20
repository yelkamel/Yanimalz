import React from 'react';
import { View, Animated } from 'react-native';
import store from 'react-native-simple-store';
import {
  loadTimeLine,
  updateTimeLine,
  loadTimeBeforeNotif,
} from 'actions/app';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';
import theme from 'theme';
import Share from 'react-native-share';
import { SHARE_OPTION } from 'data';

import RNViewShot from 'react-native-view-shot';

import Menu from '../menu';
import Loading from './loading';
import TimeLine from '../timeline';
import Banner from './banner';
import MapStage from '../mapStage';
import NotifModal from './notifModal';
import ShareModal from './shareModal';
import appStyles from '../../appStyles';
import styles from './styles';

const TOP_MARGIN = theme.size.screenHeight * 0.16;

const TOP_POSITION = 0;
const BOTTOM_POSITION = theme.size.screenHeight - theme.size.bannerHeight - TOP_MARGIN;


class Home extends React.Component {
  state = {
    animeLineUpPosition: new Animated.Value(TOP_POSITION),
    isLoading: true,
    isTop: true,
    isAnimate: false,
    isGridHide: true,
  };

  componentDidMount() {
    store.get('notifList').then((notifList) => {
      this.props.loadTimeLine(notifList);
      store.get('timeBeforeNotif').then((min) => {
        this.props.loadTimeBeforeNotif(min);
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading !== this.props.isLoading && !nextProps.isLoading) {
      this.props.updateTimeLine();
    }
    if (nextProps.isUpdated !== this.props.isUpdated && nextProps.isUpdated) {
      this.setState((state) => ({
        ...state,
        isLoading: false,
      }));
    }
  }


  modal = null;
  shareModal = null
  mapView = null;

  shareLocalisation = (minToWait) => {
    const urliOS = `Animalz://coord/${minToWait}/${this.mapStage.state.userPosition.longitude}/${this.mapStage.state.userPosition.latitude}`;
    const urlAndroid = `https://Animalz/coord/${minToWait}/${this.mapStage.state.userPosition.longitude}/${this.mapStage.state.userPosition.latitude}`;
    RNViewShot.captureRef(this.mapView, { result: 'data-uri' })
      .then((uri) => {
        Share.open({
          title: SHARE_OPTION.title,
          subject: SHARE_OPTION.subject,
          message: `${SHARE_OPTION.message}\n\nAndroid:\n${urlAndroid}\n\niPhone:\n${urliOS}`,
          url: uri,
          excludedActivityTypes: [
            'com.linkedin.LinkedIn.ShareExtension',
            'com.apple.UIKit.activity.PostToFacebook',
            'UIActivityTypePostToTwitter',
            'com.apple.reminders.RemindersEditorExtension',
            'com.apple.mobilenotes.SharingExtension',
            'com.facebook.orca',
          ],
        }).catch(() => { });
        this.shareModal.close();
      });
  }

  selectedMenuItem = (type = 'notif') => {
    switch (type) {
      case 'notif':
        this.modal.open();
        break;
      case 'share':
        this.shareModal.open();
        break;
      case 'mapPosition':
        this.mapStage.animateToArea();
        break;
      case 'userPosition':
        this.mapStage.animateToUser();
        break;
      case 'map':
        this.hideAnimalz();
        break;
      default:
        break;
    }
  };

  hideAnimalz = () => {
    this.setState((state) => ({
      ...state,
      isGridHide: !state.isGridHide,
    }));
  }

  animeLineUp = () => {
    this.setState(
      (state) => ({ ...state, isAnimate: true }),
      () => {
        if (this.state.isTop) {
          Animated.timing(this.state.animeLineUpPosition, {
            toValue: BOTTOM_POSITION,
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

  showMap = () => {
    if (this.state.isTop) {
      this.animeLineUp();
    }
  }

  render() {
    const {
      animeLineUpPosition,
      isLoading,
      isTop,
      isGridHide,
      isAnimate,
    } = this.state;
    const { untilEvent } = this.props;

    return (
      <View
        style={appStyles.flexOne}
      >

        <MapStage
          ref={(map) => this.mapStage = map}
          viewRef={(map) => this.mapView = map}
          showMap={this.showMap}
          isFirstTime={!isLoading}
          isGridHide={isGridHide}
          hideAnimalz={this.hideAnimalz}
        />
        <Animated.View
          style={[
            appStyles.absoluteBlack,
            {
              opacity: animeLineUpPosition.interpolate({
                inputRange: [TOP_POSITION, BOTTOM_POSITION],
                outputRange: [0.5, 0],
              }),
            },
          ]}
        />
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
        <Modal
          style={styles.shareModal}
          entry="top"
          backdrop
          position="top"
          ref={(m) => (this.shareModal = m)}
        >
          <ShareModal action={this.shareLocalisation} />
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
  untilEvent: PropTypes.number.isRequired,

};

const mapStateToProps = (state) => ({
  isLoading: state.app.isLoading,
  isUpdated: state.app.isUpdated,
  nextEventIn: state.app.nextEventIn,
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
