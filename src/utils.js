import moment from 'moment/moment';
import theme from './theme';
import { TIME_STATUS } from './data';

const BEFORE_MD_START = moment('12:00:00', 'HH:mm');
const BEFORE_MD_END = moment('23:59:59 ', 'HH:mm');

export const parseTimeLine = (timeLine) => timeLine.reduce((results, event) => {
  const currentTime = moment();
  const startTime = moment(event.time, 'HH:mm');
  if (!startTime.isBetween(BEFORE_MD_START, BEFORE_MD_END)) {
    startTime.add(1, 'day');
  }
  if (!currentTime.isBetween(BEFORE_MD_START, BEFORE_MD_END)) {
    startTime.subtract(1, 'day');
  }


  results.push({ ...event, momentTime: startTime });
  return results;
}, []);

export const getTimeStatus = (momentTime) => {
  const currentTime = moment();
  // const currentTime = moment('02:30', 'HH:mm').add(1, 'day');
  const endTime = momentTime.clone().add(1, 'hours');

  // Because when we 1 hour in this case it's return 03:00  -_-
  if (momentTime.format('HH:mm') === '01:00') {
    endTime.set({ hour: '02' });
  }
  /*
  console.log('===========');
  console.log(' startTime:   ', momentTime.format('HH:mm > Do'));
  console.log(' currentTime: ', currentTime.format('HH:mm > Do'));
  console.log(' endTime:     ', endTime.format('HH:mm > Do'));
  console.log('===========');
  */
  if (currentTime.isBetween(momentTime, endTime)) {
    return TIME_STATUS[1];
  }
  if (currentTime.isAfter(endTime)) {
    return TIME_STATUS[0];
  }
  return TIME_STATUS[2];
};

export const getColorFromStatus = (status) => {
  switch (status) {
    case TIME_STATUS[0]:
      return theme.colors.white;
    case TIME_STATUS[1]:
      return theme.colors.accent;
    case TIME_STATUS[2]:
      return theme.colors.primaryLight;
    default:
      return theme.colors.red;
  }
};

