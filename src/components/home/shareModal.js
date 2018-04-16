import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';
import I18n from 'i18n';
import LargeSlider from 'common/largeSlider';
import Button from 'common/button';
import styles from './styles';

const FBSDK = require('react-native-fbsdk');

const {
  AppEventsLogger,
} = FBSDK;

class ShareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      minToWait: 20,
    };
  }

  componentDidMount() {

  }
  componentWillUnmount() { }


  onValueChange = (val) => {
    this.setState((state) => ({ ...state, minToWait: val }));
  }

  onPressShare = (minToWait) => {
    this.props.action(Math.floor(minToWait));
  }

  renderText = (onTop) => {
    const { minToWait } = this.state;
    const min = I18n.t('minutes');

    if (onTop) {
      return (
        <Text style={[styles.sliderText, { color: theme.colors.primaryLight, marginTop: 20 }]}>
          {`${Math.floor(minToWait)} \n${min}`}
        </Text>
      );
    }
    return <Text style={styles.sliderText}>{`${Math.floor(minToWait)} \n${min}`}</Text>;
  };

  render() {
    const { minToWait } = this.state;
    return (
      <View style={styles.sharedModalContainer}>
        <Text style={styles.shareModalText}>
          {I18n.t('howLong')}
        </Text>
        <View style={styles.largeSliderContainer}>
          <LargeSlider
            horizontal
            value={minToWait}
            onValueChange={this.onValueChange}
            style={styles.sliderNotif}
            renderLabel={this.renderText}
            trackStyle={{ backgroundColor: theme.colors.primaryLight }}
            minimumValue={3}
            maximumValue={30}
          />
        </View>
        <Button
          onPress={() => {
            this.props.action(Math.floor(minToWait));
          }}
          label={I18n.t('share')}
        />
      </View>

    );
  }
}

ShareModal.defaultProps = {
  action: () => { },
};

ShareModal.propTypes = {
  action: PropTypes.func,
};

export default ShareModal;

