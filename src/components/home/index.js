import React from 'react';
import { View, Animated } from 'react-native';
import store from 'react-native-simple-store';
import { loadTimeLine, updateTimeLine, loadTimeBeforeNotif } from 'actions/timeline';
import { connect } from 'react-redux';
import Modal from 'react-native-modalbox';
import PropTypes from 'prop-types';
import theme from 'theme';
import Share from 'react-native-share';
import { SHARE_OPTION } from 'data';
import {
  SCLAlert,
  SCLAlertButton,
} from 'react-native-scl-alert';

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


class Home extends React.Component {
  state = {
    animeLineUpPosition: new Animated.Value(TOP_POSITION),
    isLoading: true,
    isTop: true,
    isAnimate: false,
    hideAnimalz: false,
    alertMsg: null,

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
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.isLoading !== this.props.isLoading && !nextProps.isLoading) {
      this.props.updateTimeLine();
    }
    if (nextProps.isUpdated !== this.props.isUpdated && nextProps.isUpdated) {
      this.setState((state) => ({ ...state, isLoading: false }));
    }
  }


  modal = null;
  bannerHeight = theme.size.bannerHeight;
  shareModal = null

  bottomPosition = () => {
    const res = theme.size.screenHeight - this.bannerHeight - TOP_MARGIN;
    if (this.props.untilEvent > 0) {
      return res;
    }
    return res - 70;
  }

  shareLocalisation = (minToWait) => {
    const url = `Animalz://${minToWait}/${this.mapStage.state.userPosition.longitude}/${this.mapStage.state.userPosition.latitude}`;

    console.log('===SHARED URL====');
    console.log(url);
    console.log('====================================');

    if (this.mapStage && !this.mapStage.state.userPosition.isLoading) {
      Share.open({
        title: SHARE_OPTION.title,
        message: `${SHARE_OPTION.message}\n${url}`,
      }).catch(() => { });
    } else {
      /* alert.open({
         ...SHARE_OPTION,
       }).catch(() => { }); */
    }
  }

  selectedMenuItem = (type = 'notif') => {
    switch (type) {
      case 'notif':
        this.modal.open();
        break;
      case 'share':
        this.shareModal.open();
        // this.shareLocalisation();
        break;

      default:
        this.setState((state) => ({
          ...state,
          hideAnimalz: !state.hideAnimalz,
          alertMsg: 'TEST',
        }));

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
    const {
      animeLineUpPosition,
      isLoading,
      isTop,
      hideAnimalz,
      isAnimate,
    } = this.state;
    const { untilEvent } = this.props;
    return (
      <View style={appStyles.flexOne}>

        <MapStage
          ref={(map) => this.mapStage = map}
          onFinishAnimation={() => { }}
          isFirstTime={!isLoading}
          hideAnimalz={hideAnimalz}
        />

        <Animated.View
          style={[
            styles.absoluteBlack,
            {
              opacity: animeLineUpPosition.interpolate({
                inputRange: [TOP_POSITION, this.bottomPosition()],
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
        <SCLAlert
          onRequestClose={() => this.setState({ alertMsg: null })}
          theme="info"
          show={this.state.alertMsg !== null}
          title={this.state.alertMsg ? this.state.alertMsg : ''}
          subtitle="Lorem ipsum dolor"
        >
          <SCLAlertButton theme="info" onPress={() => this.setState({ alertMsg: 'TETETER' })}>Done</SCLAlertButton>
        </SCLAlert>
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
  isLoading: state.timeline.isLoading,
  isUpdated: state.timeline.isUpdated,
  nextEventIn: state.timeline.nextEventIn,
  untilEvent: state.timeline.untilEvent,

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
