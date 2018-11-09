import { configs, startUrl } from '../EditForm/configs';

export const MUSEUM_CFG = 'museum';
export const FEED_CFG = 'feed';
export const LOCATION_CFG = 'location';
export const QUEST_CFG = 'quest';

export const settings = {
  museum: configs.museum.description,
  feed: configs.feed.description,
  location: configs.location.description,
  quest: configs.quest.description,
};

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
    getProps: ['image', 'logo', 'location'],
    updProps: ['image', 'logo', 'location'],
    addProps: ['image', 'logo', 'location'],
  },
  feed: {
    fields: ['title', 'desc', 'text'],
    noLocales: [],
    locales: ['title', 'desc', 'text'],
    getProps: ['image', 'priority'],
    updProps: ['image', 'priority'],
    addProps: ['image', 'priority'],
  },
  location: {
    fields: ['name', 'latitude', 'longitude'],
    noLocales: ['name', 'latitude', 'longitude'],
    locales: [],
    getProps: [],
    updProps: [],
    addProps: [],
  },
  quest: {
    fields: ['name', 'desc'],
    noLocales: [],
    locales: ['name', 'desc'],
    getProps: ['image', 'scenario'],
    updProps: ['image'],
    addProps: ['image', 'game'],
  },
};
