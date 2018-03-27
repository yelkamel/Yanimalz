export const updateTimeLine = () => ({
  type: 'UPDATE',
});

export const setNotifForEvent = (eventId) => ({
  type: 'SET_NOTIF',
  payload: {
    eventId,
  },
});
