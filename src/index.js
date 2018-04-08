import React from 'react';
import RootStack from 'routes/Router';
import { Provider } from 'react-redux';
import PushNotification from 'react-native-push-notification';
import configureStore from './redux';

const store = configureStore();


PushNotification.configure({
  onRegister(token) {
    console.log('TOKEN:', token);
  },
  onNotification(notification) {
    console.log('NOTIFICATION:', notification);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});


class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <RootStack />
      </Provider>);
  }
}

export default Root;
