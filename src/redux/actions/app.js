
export const setNotifBefore = (min) => ({
  type: 'NOTIF_BEFORE',
  payload: {
    min,
  },
});

export const loadTimeBeforeNotif = (min) => ({
  type: 'LOAD_APP',
  payload: {
    min,
  },
});

