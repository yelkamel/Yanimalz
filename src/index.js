import React from 'react';
// import RootStack from 'routes/Router';
import { Provider } from 'react-redux';
import HomeHOC from 'components/home';
import configureStore from 'redux';


const store = configureStore();

class Root extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HomeHOC />
      </Provider>);
  }
}

export default Root;
