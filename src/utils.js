import moment from 'moment/moment';
import { AsyncStorage } from 'react-native';

import theme from './theme';
import { TIME_STATUS, QUESTION_LIST } from './data';

export const getRandomQuestion = () => {
  const questionObject = QUESTION_LIST[Math.floor(Math.random() * QUESTION_LIST.length)];
  const answers = [
    {
      buttonLabel: questionObject.buttonLabel1,
      nextAlert: {
        title: 'Bonne Réponse',
        subtitle: questionObject.question,
        scltheme: 'success',
        show: true,
        type: 'question',
        answers: [],
      },
    },
    {
      buttonLabel: questionObject.buttonLabel2,
      nextAlert: {
        title: 'Mauvaise Réponse',
        subtitle: questionObject.question,
        scltheme: 'danger',
        show: true,
        type: 'question',
        answers: [],
      },
    },
  ].sort(() => 0.5 - Math.random());


  return ({
    title: questionObject.title,
    subtitle: questionObject.question,
    scltheme: 'default',
    show: true,
    type: 'question',
    answers,
  });
};

export const setAsyncStorage = async (key, value, callback) => {
  try {
    const res = await AsyncStorage.setItem(key, value, callback);
    console.log('storageSet:', key, value, res);
  } catch (error) {
    console.log(error);
  }
};

export const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max));

export const getAsyncStorage = async (key, callback) => {
  try {
    const value = await AsyncStorage.getItem(key, callback);
    if (value !== null) {
      console.log(`storageGet ${key}: ${value}`);
      return value;
    }
  } catch (error) {
    console.log(error);
  }
  return null;
};

export const getTimeStatus = (momentTime) => {
  const currentTime = moment();
  //  const currentTime = moment('23:30', 'HH:mm');
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
