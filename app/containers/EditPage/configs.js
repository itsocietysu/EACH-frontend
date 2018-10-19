export const settings = {
  museum: {
    locales: [
      {
        field: 'name',
        maxLength: '256',
        rows: '2',
      },
      {
        field: 'desc',
        maxLength: '4000',
        rows: '2',
      },
    ],
    selects: [
      {
        field: 'location',
      },
    ],
    image: true,
    content: 'museum',
    isUpdate: true,
    addModal: true,
  },
  feed: {
    locales: [
      {
        field: 'title',
        maxLength: '256',
        rows: '2',
      },
      {
        field: 'desc',
        maxLength: '256',
        rows: '2',
      },
      {
        field: 'text',
        maxLength: '4000',
        rows: '5',
      },
    ],
    image: true,
    numbers: [
      {
        field: 'priority',
        format: 'int',
      },
    ],
    content: 'feed',
    isUpdate: true,
    addModal: true,
  },
  location: {
    texts: [
      {
        field: 'name',
        maxLength: '256',
        rows: '1',
      },
    ],
    numbers: [
      {
        field: 'latitude',
        format: 'double',
      },
      {
        field: 'longitude',
        format: 'double',
      },
    ],
    image: false,
    content: 'location',
    isUpdate: false,
    addModal: false,
  },
  quest: {
    locales: [
      {
        field: 'name',
        maxLength: '256',
        rows: '2',
      },
      {
        field: 'desc',
        maxLength: '60',
        rows: '2',
      },
    ],
    image: true,
    content: 'quest',
    isUpdate: true,
    addModal: true,
  },
};

export const emptyItems = {
  museum: {
    eid: '0',
    image: '',
    name: { RU: '', EN: '' },
    desc: { RU: '', EN: '' },
    location: [],
  },
  feed: {
    eid: '0',
    image: '',
    title: { RU: '', EN: '' },
    text: { RU: '', EN: '' },
    desc: { RU: '', EN: '' },
    priority: '0',
  },
  location: {
    eid: '0',
    name: '',
    latitude: '',
    longitude: '',
  },
  quest: {
    eid: '0',
    image: '',
    name: { RU: '', EN: '' },
    desc: { RU: '', EN: '' },
  },
};

export const startUrl = 'http://each.itsociety.su:4201/each/';

export const urls = {
  museum: {
    add: `${startUrl}add`,
    update: `${startUrl}update`,
    delete: eid => `${startUrl}museum/${eid}?hard=true`,
    tape: (reqProps, firstM, lastM) =>
      `${startUrl}museum/tape?FirstMuseum=${firstM}&LastMuseum=${lastM}`,
  },
  feed: {
    add: `${startUrl}feed`,
    update: `${startUrl}feed`,
    delete: eid => `${startUrl}feed/${eid}?hard=true`,
    tape: (reqProps, firstF, lastF) =>
      `${startUrl}feed/tape?FirstFeed=${firstF}&LastFeed=${lastF}`,
  },
  location: {
    add: `${startUrl}location`,
    update: '',
    delete: eid => `${startUrl}location/${eid}?hard=true`,
    tape: (reqProps, firstL, lastL) =>
      `${startUrl}location/tape?FirstLocation=${firstL}&LastLocation=${lastL}`,
  },
  quest: {
    add: `${startUrl}game`,
    update: `${startUrl}game`,
    delete: eid => `${startUrl}game/${eid}?hard=true`,
    tape: reqProps => `${startUrl}game/all/museum/${reqProps.museumId}`,
  },
};

export const getValues = {
  museum: {
    fields: ['name', 'desc'],
    noLocales: [],
    locales: ['name', 'desc'],
    props: ['image', 'location'],
    addProps: ['image', 'location'],
  },
  feed: {
    fields: ['title', 'desc', 'text'],
    noLocales: [],
    locales: ['title', 'desc', 'text'],
    props: ['image', 'priority'],
    addProps: ['image', 'priority'],
  },
  location: {
    fields: ['name', 'latitude', 'longitude'],
    noLocales: ['name', 'latitude', 'longitude'],
    locales: [],
    props: [],
    addProps: [],
  },
  quest: {
    fields: ['name', 'desc'],
    noLocales: [],
    locales: ['name', 'desc'],
    props: ['image'],
    addProps: ['image', 'game'],
  },
};
