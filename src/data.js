import theme from 'theme';
import moment from 'moment';
import { Platform } from 'react-native';
import I18n from 'i18n';

import drum from 'assets/image/dnb.png';
import dubstep from 'assets/image/dubstep.png';
import borgore from 'assets/dj/borgore.jpg';
import camokrooked from 'assets/dj/camo&krooked.jpg';
import downlink from 'assets/dj/downlink.jpg';
import edrushoptical from 'assets/dj/edrushoptical.jpg';
import megamidnight from 'assets/dj/megamidnight.jpg';
import AMCTurno from 'assets/dj/AMCTurno.jpg';
import agressorbunxpythius from 'assets/dj/agressorbunxpythius.jpg';
import soltan from 'assets/dj/soltan.jpg';
import cookerzcrew from 'assets/dj/cookerzcrew.jpg';
import fourhorsement from 'assets/dj/fourhorsement.jpg';

export const INIT_TIME_LINE = [
  {
    time: '21:00',
    fakeTime: 'X1:$0',
    key: 'BGR',
    title: 'BORGORE',
    description: 'BORGORE',
    picture: borgore,
    lineColor: 'white',
    icon: dubstep,
  },
  {
    time: '22:00',
    fakeTime: '0§:0?',
    key: 'CAK',
    title: 'CAMO & KROOKED',
    description: 'CAMO & KROOKED',
    picture: camokrooked,
    lineColor: theme.colors.accent,
    icon: drum,
  },
  {
    time: '23:00',
    fakeTime: '3!:#0',
    key: 'DLK',
    title: 'DOWNLINK',
    description: 'DOWNLINK',
    picture: downlink,
    circleColor: theme.colors.primaryLight,
    icon: dubstep,
  },
  {
    time: '00:00',
    fakeTime: '0X:9X',
    key: 'EDO',
    title: 'ED RUSH x OPTICAL',
    description: 'ED RUSH x OPTICAL',
    picture: edrushoptical,
    icon: drum,
  },
  {
    time: '01:00',
    fakeTime: '99:99',
    key: 'MMT',
    title: 'MEGALODON x M.TYRANNOSAURUS',
    description: 'MEGALODON x MIDNIGHT TYRANNOSAURUS',
    picture: megamidnight,
    icon: dubstep,
  },
  {
    time: '02:00',
    fakeTime: '3*:??',
    key: 'AAT',
    title: 'A.M.C & TURNO',
    description: 'A.M.C & TURNO',
    picture: AMCTurno,
    icon: drum,
  },
  {
    time: '03:00',
    fakeTime: '2$:€0',
    key: 'FHT',
    title: 'Four Horsemen Tour World',
    description: 'IVORY x ECRAZE x GRAPHYT x SAMPLIFIRE',
    picture: fourhorsement,
    icon: dubstep,

  },
  {
    time: '04:00',
    fakeTime: '0%:18',
    key: 'ABP',
    title: 'AGRESSOR BUNX x PYTHIUS',
    description: 'AGRESSOR BUNX x PYTHIUS',
    picture: agressorbunxpythius,
    icon: drum,

  },
  {
    time: '05:00',
    fakeTime: 'XX:XX',
    key: 'SLN',
    title: 'SOLTAN',
    description: 'SOLTAN',
    picture: soltan,
    icon: dubstep,

  },
  {
    time: '06:00',
    fakeTime: '??:??',
    key: 'CCW',
    title: 'COOKERZ CREW',
    description: 'ANSWERD x JIQZY x NACHA x PLAYFULL',
    picture: cookerzcrew,
    icon: dubstep,

  },
  {
    time: '07:00',
    key: 'END',
  },
];

export const COEF_ZOOM = Platform.OS === 'ios' ? 0.5 : 0.55;

export const AREA_LOC_GPS = {
  longitudeDelta: 0.0026429008518391583 * COEF_ZOOM,
  latitudeDelta: 0.0012644995249289082 * COEF_ZOOM,
  longitude: 2.3650113,
  latitude: 48.9034989,
};

export const INIT_ALERT = {
  title: '',
  subtitle: '',
  theme: 'default',
  show: false,
  type: 'info',
};

export const SHARE_OPTION = {
  title: 'Animalz',
  subtitle: I18n.t('titleNotif'),
  message: I18n.t('msgNotif'),

}; // I18n.t('seconds')

export const TIME_UNTIL_PARTY = moment('2018-04-21 21:00:00', 'YYYY-MM-DD').diff(
  moment(),
  'seconds',
);
export const TIME_STATUS = ['before', 'now', 'after'];
export const GOOGLE_MAP_API_KEY = 'AIzaSyAR0yOHihuJLQhfAYhH8C4uuoC6VvAiYOU';
