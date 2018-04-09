export const updateTimeLine = () => ({
  type: 'UPDATE_TIMELINE',
});

export const loadTimeLine = (notifList) => ({
  type: 'LOAD_TIMELINE',
  payload: {
    notifList: notifList === null ? [] : notifList,
  },
});

export const setNotifForEvent = (eventKey) => ({
  type: 'SET_NOTIF',
  payload: {
    eventKey,
  },
});

export const setNextEventTime = (inSecond) => ({
  type: 'SET_NEXT_HOUR_TIME',
  payload: {
    inSecond,
  },
});


export const setNotifBefore = (min) => ({
  type: 'NOTIF_BEFORE',
  payload: {
    min,
  },
});

export const loadTimeBeforeNotif = (min) => ({
  type: 'LOAD_NOTIF_BEFORE',
  payload: {
    min,
  },
});

