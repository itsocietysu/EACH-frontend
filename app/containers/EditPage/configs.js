import { configs } from '../EditForm/configs';

export const settings = {
  museum: configs.museum.description,
  feed: configs.feed.description,
  location: configs.location.description,
  quest: configs.quest.description,
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
