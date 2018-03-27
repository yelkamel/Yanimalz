import { TIME_LINE, TIME_STATUS } from 'data';
import { getTimeStatus, getColorFromStatus, parseTimeLine } from 'utils';

const defaultState = {
  data: parseTimeLine(TIME_LINE),
  currentEvent: TIME_LINE[TIME_LINE.length - 1],
  isUpdated: false,
};


function setNotif(state, eventId) {
  const dataTmp = state.data;
  dataTmp[eventId].hasNotif = !dataTmp[eventId].hasNotif;
  // console.log('eventId', eventId);
  // console.log('dataTmp', dataTmp);

  return ({
    ...state,
    data: dataTmp,
  });
}

function updateTimeLine(state) {
  let currentEvent = TIME_LINE[TIME_LINE.length - 1];

  const data = state.data.reduce((results, item) => {
    const status = getTimeStatus(item.momentTime);

    if (status === TIME_STATUS[1]) {
      currentEvent = item;
    }

    results.push({
      ...item,
      status,
      lineColor: getColorFromStatus(status),
      hasNotif: false,
    });
    return results;
  }, []);

  return ({
    ...state,
    data,
    currentEvent,
    isUpdated: true,
  });
}

export default function timeline(state = defaultState, action) {
  const { payload, type } = action;


  switch (type) {
    case 'UPDATE':
      return updateTimeLine(state);
    case 'SET_NOTIF':
      return setNotif(state, payload.eventId);
    default:
      return state;
  }
}
