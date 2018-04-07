import I18n from 'react-native-i18n';

I18n.fallbacks = true;

I18n.translations = {
  en: {
    banner_title: 'Time Line',
    end: 'END',
    days: 'day',
    hours: 'hour',
    minutes: 'min',
    before: 'before',
    seconds: 'sec',
    notif: 'Notif',
  },
  fr: {
    banner_title: 'Line Up!',
    end: 'FIN',
    days: 'jour',
    hours: 'heure',
    minutes: 'min',
    seconds: 'sec',
    before: 'avant',
    notif: 'Notif',
  },
};

export default I18n;
