import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
// import RoundedMenu from 'common/roundedMenu';
import Icon from 'react-native-vector-icons/FontAwesome';
import theme from 'theme';
import ActionButton from 'react-native-circular-action-menu';

import styles from './styles';
import appStyles from '../../appStyles';

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

    return (<View style={styles.menuContainer}>

      <ActionButton
        onPress={this.props.onPressMenu}
        position="center"
        buttonColor={theme.colors.primaryLight}
        btnOutRange={theme.colors.primary}
        backdrop={<View
          style={[
            appStyles.absoluteBlack,
            { opacity: 0.6 },
          ]}
                  />}
      >
        <ActionButton.Item
          buttonColor={theme.colors.primaryLight}
          title="All Tasks"
          onPress={() => {
            onSelectItem('notif');
          }}
        >
          <Icon name="bell" size={22} color={theme.colors.primary} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor={theme.colors.primaryLight}
          title="New Task"
          onPress={() => {
            onSelectItem('map');
          }}
        >
          <Icon name="map-signs" size={22} color={theme.colors.primary} />
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor={theme.colors.primaryLight}
          title="All Tasks"
          onPress={() => {
            onSelectItem('userPosition');
          }}
        >
          <Icon name="street-view" size={22} color={theme.colors.primary} />
        </ActionButton.Item>

        <ActionButton.Item
          buttonColor={theme.colors.primaryLight}
          title="All Tasks"
          onPress={() => {
            onSelectItem('mapPosition');
          }}
        >
          <Icon name="map" size={22} color={theme.colors.primary} />
        </ActionButton.Item>


        <ActionButton.Item
          buttonColor={theme.colors.primaryLight}
          title="Notifications"
          onPress={() => {
            onSelectItem('share');
          }}
        >
          <Icon name="share-alt" size={22} color={theme.colors.primary} />
        </ActionButton.Item>
      </ActionButton>
            </View>);
    /*  return (
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
      ); */
  }
}

Menu.defaultProps = {
  onPressMenu: () => {},
};

Menu.propTypes = {
  onPressMenu: PropTypes.func,
  onSelectItem: PropTypes.func.isRequired,
};
