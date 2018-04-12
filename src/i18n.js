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
    howLong: 'How long will you waiting for ?',
    beforeTime: 'Alert how many minutes before the event ?',
    share: 'Share',
    msgNotif: 'I\'m Here !',
    titleNotif: 'the mobile app',
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
    howLong: 'Combien de temps veux-tu attendre ici ?',
    beforeTime: 'Alerter combien de minute avant l\'event ?',
    share: 'Partager',
    msgNotif: 'Je suis la !',
    titleNotif: 'l\'appli mobile',
  },
};

export default I18n;
