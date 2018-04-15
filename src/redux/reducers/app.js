import {
  INIT_TIME_LINE,
  TIME_STATUS,
  TIME_UNTIL_PARTY,
  INIT_ALERT,
} from 'data';
import { getTimeStatus, getColorFromStatus } from 'utils';
import moment from 'moment/moment';
import PushNotification from 'react-native-push-notification';
import store from 'react-native-simple-store';

const BEFORE_MD_START = moment('12:00:00', 'HH:mm');
const BEFORE_MD_END = moment('23:59:59 ', 'HH:mm');

function clearAndSetNotif(timeLine, timeBeforeNotif) {
  PushNotification.cancelAllLocalNotifications();

  timeLine.forEach((item) => {
    if (item.hasNotif && item.status === TIME_STATUS[2]) {
      const eventDateEpoch = item.momentTime.unix() * 1000;
      const triggerAt = new Date(eventDateEpoch - (timeBeforeNotif * 60 * 1000));

      console.log('===NOTIF===AT==');
      console.log(timeBeforeNotif);
      console.log(triggerAt);
      PushNotification.localNotificationSchedule({
        title: item.title,
        message: item.description,
        date: triggerAt,
      });
    }
  });
}
// new Date(eventDateEpoch - (timeBeforeNotif * 60)),
// Date.now() + index * 1000,

function setNotif(state, payload) {
  const { eventKey, addNotif } = payload;
  const timelineTmp = state.timeline;
  const eventObject = timelineTmp.find((item) => item.key === eventKey);
  let notifListTmp = [];

  if (state.notifList.includes(eventKey)) {
    const index = state.notifList.indexOf(eventKey);
    if (index > -1 && !addNotif) {
      state.notifList.splice(index, 1);
      notifListTmp = state.notifList;
    }
  } else if (addNotif) {
    notifListTmp = state.notifList.concat(eventObject.key);
  }

  console.log('==SAVE===NOTIFLIST====');
  console.log(notifListTmp);
  eventObject.hasNotif = addNotif;

  // Save timeline
  store.save('notifList', notifListTmp);

  // set Notif Push
  clearAndSetNotif(timelineTmp, state.timeBeforeNotif);

  return {
    ...state,
    timeline: timelineTmp,
    notifList: notifListTmp,
  };
}

function loadTimeLine(state, payload) {
  const { notifList } = payload;
  console.log('==GET===NOTIFLIST====');
  console.log(notifList);
  console.log('====================================');

  const timelineTmp = state.timeline.reduce((results, event) => {
    const currentTime = moment();
    // const currentTime = moment('23:30', 'HH:mm');

    const startTime = moment(event.time, 'HH:mm');
    let hasNotif = false;

    if (notifList.includes(event.key)) {
      hasNotif = true;
    }
    if (!startTime.isBetween(BEFORE_MD_START, BEFORE_MD_END)) {
      startTime.add(1, 'day');
    }
    if (!currentTime.isBetween(BEFORE_MD_START, BEFORE_MD_END)) {
      startTime.subtract(1, 'day');
    }

    results.push({
      ...event,
      hasNotif,
      momentTime: startTime,
    });
    return results;
  }, []);

  return {
    ...state,
    timeline: timelineTmp,
    isLoading: false,
    notifList: notifList === null ? [] : notifList,
  };
}

function setTimeBefore(state, payload) {
  const { min } = payload;
  store.save('timeBeforeNotif', min);
  clearAndSetNotif(state.timeline, min);

  return {
    ...state,
    timeBeforeNotif: min !== null ? min : 10,
  };
}


function updateTimeLine(state) {
  let currentEvent = INIT_TIME_LINE[INIT_TIME_LINE.length - 1];

  const timeline = state.timeline.reduce((results, item) => {
    const status = getTimeStatus(item.momentTime);

    if (status === TIME_STATUS[1]) {
      currentEvent = item;
    }
    results.push({
      ...item,
      status,
      lineColor: getColorFromStatus(status),
    });
    return results;
  }, []);

  return {
    ...state,
    timeline,
    currentEvent,
    isUpdated: true,
    isLoading: false,
  };
}

const defaultState = {
  timeline: INIT_TIME_LINE,
  currentEvent: INIT_TIME_LINE[INIT_TIME_LINE.length - 1],
  isUpdated: false,
  isLoading: true,
  nextEventIn: 0,
  notifList: [],
  timeBeforeNotif: 10,
  untilEvent: TIME_UNTIL_PARTY,
  alert: INIT_ALERT,
  appState: 'active',
};

export default function app(state = defaultState, action) {
  const { payload, type } = action;

  switch (type) {
    case 'LOAD_TIMELINE':
      return loadTimeLine(state, payload);
    case 'UPDATE_TIMELINE':
      return updateTimeLine(state);
    case 'SET_NOTIF':
      return setNotif(state, payload);
    case 'SET_NEXT_HOUR_TIME':
      return {
        ...state,
        nextEventIn: payload.inSecond,
      };
    case 'LOAD_NOTIF_BEFORE':
      return {
        ...state,
        timeBeforeNotif: payload.min === null ? 10 : payload.min,
      };
    case 'NOTIF_BEFORE':
      return setTimeBefore(state, payload);
    case 'SET_ALERT':
      return {
        ...state,
        alert: payload,
      };
    case 'SET_APPSTATE':
      return {
        ...state,
        appState: payload,
      };
    default:
      return state;
  }
}
