import theme from 'theme';
import I18n from 'i18n';

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

export const TIME_LINE = [
  {
    time: '21:00',
    title: 'BORGORE',
    description: 'Event 1 Description',
    picture: borgore,
    lineColor: 'white',
    circleColor: 'white',
  },
  {
    time: '22:00',
    title: 'CAMO & KROOKED',
    description: 'Event 2 Description',
    picture: camokrooked,
    lineColor: theme.colors.accent,
    circleColor: theme.colors.accent,
  },
  {
    time: '23:00',
    title: 'DOWNLINK',
    description: 'Event 3 Description',
    picture: downlink,

    circleColor: theme.colors.primaryLight,

  },
  {
    time: '00:00',
    title: 'ED RUSH x OPTICAL',
    description: 'Event 4 Description',
    picture: edrushoptical,

    circleColor: theme.colors.primaryLight,

  },
  {
    time: '01:00',
    title: 'MEGALODON x M.TYRANNOSAURUS',
    description: 'Event 5 Description',
    circleColor: theme.colors.primaryLight,
    picture: megamidnight,
  },
  {
    time: '02:00',
    title: 'A.M.C & TURNO',
    description: 'Event 4 Description',
    picture: AMCTurno,

    circleColor: theme.colors.primaryLight,

  },
  {
    time: '03:00',
    title: 'Four Horsemen Tour World',
    description: 'IVORY x ECRAZE x GRAPHYT x SAMPLIFIRE',
    picture: fourhorsement,

    circleColor: theme.colors.primaryLight,

  },
  {
    time: '04:00',
    title: 'AGRESSOR BUNX x PYTHIUS',
    description: 'Event 4 Description',
    picture: agressorbunxpythius,

    circleColor: theme.colors.primaryLight,

  },
  {
    time: '05:00',
    title: 'SOLTAN',
    description: 'Event 5 Description',
    picture: soltan,

    circleColor: theme.colors.primaryLight,

  },
  {
    time: '06:00',
    title: 'COOKERZ CREW',
    description: 'ANSWERD x JIQZY x NACHA x PLAYFULL',
    picture: cookerzcrew,

    circleColor: theme.colors.primaryLight,

  },
  {
    time: '07:00',
  },
];

export const TIME_STATUS = ['before', 'now', 'after'];
export const GOOGLE_MAP_API_KEY = 'AIzaSyAR0yOHihuJLQhfAYhH8C4uuoC6VvAiYOU';
