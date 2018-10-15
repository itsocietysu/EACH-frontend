export const settings = {
  museum: {
    locales: [
      {
        field: 'name',
        rows: '2',
      },
      {
        field: 'desc',
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
    title: 'name',
    isUpdate: true,
    addModal: true,
  },
  feed: {
    locales: [
      {
        field: 'title',
        rows: '2',
      },
      {
        field: 'desc',
        rows: '2',
      },
      {
        field: 'text',
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
    title: 'title',
    isUpdate: true,
    addModal: true,
  },
  location: {
    texts: [
      {
        field: 'name',
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
};

export const startUrl = 'http://each.itsociety.su:4201/each/';

export const urls = {
  museum: {
    add: `${startUrl}add`,
    update: `${startUrl}update`,
    delete: eid => `${startUrl}museum/${eid}?hard=true`,
    tape: (firstM, lastM) =>
      `${startUrl}museum/tape?FirstMuseum=${firstM}&LastMuseum=${lastM}`,
  },
  feed: {
    add: `${startUrl}feed`,
    update: `${startUrl}feed`,
    delete: eid => `${startUrl}feed/${eid}?hard=true`,
    tape: (firstF, lastF) =>
      `${startUrl}feed/tape?FirstFeed=${firstF}&LastFeed=${lastF}`,
  },
  location: {
    add: `${startUrl}location`,
    update: '',
    delete: eid => `${startUrl}location/${eid}?hard=true`,
    tape: (firstL, lastL) =>
      `${startUrl}location/tape?FirstLocation=${firstL}&LastLocation=${lastL}`,
  },
};

export const getValues = {
  museum: {
    fields: ['name', 'desc'],
    noLocales: [],
    locales: ['name', 'desc'],
    props: ['image', 'location'],
  },
  feed: {
    fields: ['title', 'desc', 'text'],
    noLocales: [],
    locales: ['title', 'desc', 'text'],
    props: ['image', 'priority'],
  },
  location: {
    fields: ['name', 'latitude', 'longitude'],
    noLocales: ['name', 'latitude', 'longitude'],
    locales: [],
    props: [],
  },
};
