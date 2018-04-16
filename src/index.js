import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux';
import codePush from 'react-native-code-push';
import HomeHOC from 'components/home';

// import RootStack from 'routes/Router';


const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HomeHOC />
      </Provider>);
  }
}

export default codePush(Root);
