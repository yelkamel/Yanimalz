import store from 'react-native-simple-store';
import { TIME_UNTIL_PARTY } from 'data';

function setTimeBefore(state, payload) {
  const { min } = payload;
  store.save('timeBeforeNotif', min);
  return {
    ...state,
    timeBeforeNotif: min !== null ? min : 10,
  };
}


const defaultState = {
  timeBeforeNotif: 10,
  untilEvent: TIME_UNTIL_PARTY,
};

export default function app(state = defaultState, action) {
  const { payload, type } = action;

  switch (type) {
    case 'LOAD_APP':
      return ({ ...state, timeBeforeNotif: payload.min });
    case 'NOTIF_BEFORE':
      return setTimeBefore(state, payload);
    default:
      return state;
  }
}
