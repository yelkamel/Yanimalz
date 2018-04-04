import { combineReducers } from '../../../node_modules/redux';

import timeline from './timeline';
import app from './app';

const rootReducer = combineReducers({
  timeline,
  app,
});

export default rootReducer;
