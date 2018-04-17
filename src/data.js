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

const saturdayDateStr = '20180421';
const sundayDateStr = '20180422';

export const INIT_TIME_LINE = [
  {
    time: `21:00 ${saturdayDateStr}`,
    fakeTime: 'X̴̗̱͉̄̈́̓1̸̛̆:̨̦̟͘0̵͚̽̒',
    key: 'BGR',
    title: 'BORGORE',
    description: 'BORGORE',
    picture: borgore,
    lineColor: 'white',
    icon: dubstep,
  },
  {
    time: `22:00 ${saturdayDateStr}`,
    fakeTime: '0̷̺̑͑͠§̶͍͖̣̈́:0̵̰́̚?̸͕̻̓',
    key: 'CAK',
    title: 'CAMO & KROOKED',
    description: 'CAMO & KROOKED',
    picture: camokrooked,
    lineColor: theme.colors.accent,
    icon: drum,
  },
  {
    time: `23:00 ${saturdayDateStr}`,
    fakeTime: '3̷̝͂!̴̽͝:0#̶̙̝̤͆̏̿',
    key: 'DLK',
    title: 'DOWNLINK',
    description: 'DOWNLINK',
    picture: downlink,
    circleColor: theme.colors.primaryLight,
    icon: dubstep,
  },
  {
    time: `00:00 ${sundayDateStr}`,
    fakeTime: '0̸̩͐̐X̶̹̻̙́̽̀:̵̡̃͜9̶͎͎̬̆̍X̸̺͎͠',
    key: 'EDO',
    title: 'ED RUSH x OPTICAL',
    description: 'ED RUSH x OPTICAL',
    picture: edrushoptical,
    icon: drum,
  },
  {
    time: `01:00 ${sundayDateStr}`,
    fakeTime: '9̴̻̫̠͆̎9̴̠͝:̸͍̳̘̍9̷͚̍̌9̸̼͙̘͋',
    key: 'MMT',
    title: 'MEGALODON x M.TYRANNOSAURUS',
    description: 'MEGALODON x MIDNIGHT TYRANNOSAURUS',
    picture: megamidnight,
    icon: dubstep,
  },
  {
    time: `02:00 ${sundayDateStr}`,
    fakeTime: '03̵͚̣̿*̶̢̛̄̚::̢̭̟̒́?̸̥̞̫̌̚',
    key: 'AAT',
    title: 'A.M.C & TURNO',
    description: 'A.M.C & TURNO',
    picture: AMCTurno,
    icon: drum,
  },
  {
    time: `03:00 ${sundayDateStr}`,
    fakeTime: '2̴̼͉̏$̷̬̤̬̾:̶̤̜€̶̘͚̱̓̈́0̸͚̮͖͗̓̓',
    key: 'FHT',
    title: 'Four Horsemen Tour World',
    description: 'IVORY x ECRAZE x GRAPHYT x SAMPLIFIRE',
    picture: fourhorsement,
    icon: dubstep,

  },
  {
    time: `04:00 ${sundayDateStr}`,
    fakeTime: '0̸̙̘̕͝4̸̢̨̞͛͠:̸̩͊͂̄?0̴̛̹͋̀',
    key: 'ABP',
    title: 'AGRESSOR BUNX x PYTHIUS',
    description: 'AGRESSOR BUNX x PYTHIUS',
    picture: agressorbunxpythius,
    icon: drum,

  },
  {
    time: `05:00 ${sundayDateStr}`,
    fakeTime: 'X̷̜̝̺͝X̷̱͆̈͆:̴̲͎̊͗X̴̢̥̑͗X̴̓',
    key: 'SLN',
    title: 'SOLTAN',
    description: 'SOLTAN',
    picture: soltan,
    icon: dubstep,

  },
  {
    time: `06:00 ${sundayDateStr}`,
    fakeTime: '?̸̫̈́͂?̷͎̫̮̚̚:̴͔͇̌̑?̷̩̜̈́̈́?̷͎̦̦̌',
    key: 'CCW',
    title: 'COOKERZ CREW',
    description: 'ANSWERD x JIQZY x NACHA x PLAYFULL',
    picture: cookerzcrew,
    icon: dubstep,

  },
  {
    time: `07:00 ${sundayDateStr}`,
    key: 'END',
  },
];

export const COEF_ZOOM = Platform.OS === 'ios' ? 0.5 : 0.55;

export const AREA_LOC_GPS = {
  longitudeDelta: 0.0026429008518391583 * COEF_ZOOM,
  latitudeDelta: 0.0012644995249289082 * COEF_ZOOM,
  longitude: 2.3649730785215297,
  latitude: 48.903397521970504,
};

export const INIT_ALERT = {
  title: '',
  subtitle: '',
  scltheme: 'default',
  show: false,
  type: 'info',
  answers: [],
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

export const QUESTION_LIST = [
  {
    title: 'Bogore',
    question: 'Quel est son style de musique ?',
    buttonLabel1: 'Dubstep',
    buttonLabel2: 'Drum and bass',
  },
  {
    title: 'Camo & Krooked',
    question: 'Quel est son style de musique ?',
    buttonLabel1: 'Drum and bass',
    buttonLabel2: 'Dubstep',
  },
  {
    title: 'Downlink',
    question: 'Quel est son style de musique ?',
    buttonLabel1: 'Dubstep',
    buttonLabel2: 'Drum and bass',
  },
  {
    title: 'Ed Rush x Optical',
    question: 'Quel est leur style de musique ?',
    buttonLabel1: 'Drum and bass',
    buttonLabel2: 'Dubstep',
  },
  {
    title: 'Megalodon x Midnight Tyrannosaurus',
    question: 'Quel est leur style de musique ?',
    buttonLabel1: 'Dubstep',
    buttonLabel2: 'Drum and bass',
  },
  {
    title: 'A.M.C & Turno',
    question: 'Quel est leur style de musique ?',
    buttonLabel1: 'Drum and bass',
    buttonLabel2: 'Dubstep',
  },
  {
    title: 'Ivory x Ecraze x Graphyt x Samplifire',
    question: 'Quel est leur style de musique ?',
    buttonLabel1: 'Dubstep',
    buttonLabel2: 'Drum and bass',
  }, {
    title: 'Agressor Bunx x Pythius',
    question: 'Quel est leur style de musique ?',
    buttonLabel1: 'Drum and bass',
    buttonLabel2: 'Dubstep',
  },
  {
    title: 'Soltan',
    question: 'Quel est son style de musique ?',
    buttonLabel1: 'Dubstep',
    buttonLabel2: 'Drum and bass',
  },
  {
    title: 'Answerd x Jiqzy x Nacha x Playfull',
    question: 'Quel est son style de musique ?',
    buttonLabel1: 'Dubstep',
    buttonLabel2: 'Drum and bass',
  },
  {
    title: 'Drum and bass',
    question: 'Combien de BPM ?',
    buttonLabel1: '175',
    buttonLabel2: '140',
  },
  {
    title: 'Dubstep',
    question: 'Combien de BPM ?',
    buttonLabel1: '140',
    buttonLabel2: '175',
  },
  //
  {
    title: 'Ed Rush',
    question: 'Avec quel artiste a-t-il fondé Killbox ?',
    buttonLabel1: 'Audio',
    buttonLabel2: 'Gridlok',
  },
  {
    title: 'Pythius',
    question: 'Quelle chanson a-t-il produit ?',
    buttonLabel1: 'Nexus',
    buttonLabel2: 'If I Could',
  },
  {
    title: 'Camo and Krooked',
    question: 'Qui a remixé l\'une de leurs chansons ?',
    buttonLabel1: 'Dossa & Locuzzed',
    buttonLabel2: 'Mefjus',
  },
  {
    title: 'Pythius',
    question: 'Quelle genre de drum and bass ?',
    buttonLabel1: 'Neurofunk',
    buttonLabel2: 'Dancefloor/Liquid',
  },
  {
    title: 'Agressor Bunx',
    question: 'S\'est-il déjà produit à Paris ?',
    buttonLabel1: 'Oui',
    buttonLabel2: 'Jamais',
  },
  {
    title: 'Optical',
    question: 'De quel label fait-il parti ?',
    buttonLabel1: 'Virus Recordings',
    buttonLabel2: 'Never Say Die',
  },
];

export const COLOR_ARRAY = [
  '#9C27B0',
  '#E91E63',
  '#3F51B5',
  '#009688',
  '#8BC34A',
  '#795548',
  '#9E9E9E',
];
export const TIME_STATUS = ['before', 'now', 'after'];
export const GOOGLE_MAP_API_KEY = 'AIzaSyAR0yOHihuJLQhfAYhH8C4uuoC6VvAiYOU';
