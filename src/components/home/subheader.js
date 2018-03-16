import React from 'react';
import { View, StyleSheet, Text, Button, TouchableHighlight } from 'react-native';

class SubHeader extends React.Component {
  render() {
    return (
      <View  {...this.props} style={styles.mainContainer}>
        <Text>Home Screen</Text>
        <TouchableHighlight onPress={this.props.onPress}>
          <View style={{ height: 30, width: 30, backgroundColor: 'blue' }}></View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
});

export default SubHeader;
