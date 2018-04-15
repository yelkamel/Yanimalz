import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import theme from 'theme';
import I18n from 'i18n';
import LargeSlider from 'common/largeSlider';
import TouchableRipple from 'common/touchableRipple';
import styles from './styles';


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
        <View style={{
          width: 80,
          height: 160,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
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
        <View style={{
          width: 120,
          height: 40,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 30,
          borderColor: theme.colors.accent,
          borderWidth: 1,
          backgroundColor: theme.colors.primaryLight,
        }}
        >
          <TouchableRipple
            onPress={() => {
              this.props.action(Math.floor(minToWait));
            }}
          >
            <View style={{
              width: 120,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 30,
              overflow: 'hidden',
            }}
            >


              <Text style={{
                color: theme.colors.primaryDark,
              }}
              >
                {I18n.t('share')}
              </Text>
            </View>

          </TouchableRipple>
        </View>

      </View>

    );
  }
}

/*

<View style={{ flex: 1 }}>
      <Text style={styles.shareModalText}>
        Ta couleur sur sa carte ?
      </Text>

      <ColorPicker
        //  onColorSelected={(color) => alert(`Color selected: ${color}`)}
        style={{ flex: 1 }}
        color={color}
        onColorChange={this.onColorChange}
        hideSliders
      />

      <Button
        onPress={() => {
          this.props.action(minToWait, fromHsv(color));
        }}
        title="test"
      />
    </View>


    <View style={styles.sliderColorContainer}>
      <HueSlider
        style={styles.sliderColorRow}
        gradientSteps={20}
        value={color.h}
        onValueChange={this.onColorChange}
      />
    </View>
    */


ShareModal.defaultProps = {
  action: () => { },
};

ShareModal.propTypes = {
  action: PropTypes.func,
};

export default ShareModal;

