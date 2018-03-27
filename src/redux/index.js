import { createStore } from '../../node_modules/redux';

import rootReducer from './reducers/index';

const store = createStore(rootReducer);

export default store;
