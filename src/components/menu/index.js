import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import RoundedMenu from 'common/roundedMenu';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'theme';

import styles from './styles';

export default class Menu extends Component {
  state = {};
  renderRoot() {
    return (
      <View style={[styles.item, styles.root]}>
        <Icon name="arrows-alt" size={30} color={theme.colors.primary} />
      </View>
    );
  }


  render() {
    const { onSelectItem } = this.props;
    return (
      <View style={styles.menuContainer}>
        <RoundedMenu
          spreadAngle={120}
          startAngle={-20}
          itemRadius={30}
          menuRadius={100}
          onOpen={() => { }}
          onClose={() => { }}
        >
          {this.renderRoot()}
          <View
            style={styles.safeBatteryView}
            onSelect={() => {
              onSelectItem('batery');
            }}
          >
            <View style={styles.menuItem1} />
            <Icon name="info-circle" size={30} color={theme.colors.primaryLight} />
          </View>
          <View
            onSelect={() => {
              onSelectItem('share');
            }}
            style={styles.shareView}
          >
            <View style={styles.menuItem2} />
            <Icon name="slideshare" size={30} color={theme.colors.primaryLight} />
          </View>
          <View
            style={styles.notifSettingView}
            onSelect={() => {
              onSelectItem('notif');
            }}
          >
            <View style={styles.menuItem3} />
            <Icon name="bell" size={30} color={theme.colors.primaryLight} />
          </View>

        </RoundedMenu>

      </View>
    );
  }
}

Menu.defaultProps = {};

Menu.propTypes = {
  onSelectItem: PropTypes.func.isRequired,
};
