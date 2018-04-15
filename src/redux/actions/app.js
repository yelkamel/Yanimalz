export const updateTimeLine = () => ({
  type: 'UPDATE_TIMELINE',
});

export const loadTimeLine = (notifList) => ({
  type: 'LOAD_TIMELINE',
  payload: {
    notifList: notifList === null ? [] : notifList,
  },
});

export const setNotifForEvent = (eventKey, addNotif) => ({
  type: 'SET_NOTIF',
  payload: {
    eventKey,
    addNotif,
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


export const setAlert = (alert) => ({
  type: 'SET_ALERT',
  payload: alert,
});


export const setAppState = (nextAppState) => ({
  type: 'SET_APPSTATE',
  payload: nextAppState,
});

