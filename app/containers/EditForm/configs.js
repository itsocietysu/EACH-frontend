/* eslint-disable camelcase */
import requestAuth from '../../utils/requestAuth';

export const startUrl = 'http://each.itsociety.su:4201/each/';

const getImage = (field, ratio) => ({
  field,
  ratio,
});

const avatar = getImage('avatar', 1);
const image = getImage('image', 1);

const getText = (field, maxLength, rows) => ({
  field,
  maxLength,
  rows,
});

const question = getText('question', '256', '2');
const hint = getText('hint', '256', '2');
const url = getText('url', '256', '2');

const getNumber = (field, format) => ({
  field,
  format,
});

const latitude = getNumber('latitude', 'double');
const longitude = getNumber('longitude', 'double');

const text_question = {
  name: 'text_question',
  type: 'form',
  flexDirection: 'column',
  isPlaceholder: false,
  description: {
    tag_selects: [
      {
        field_from: 'choices',
        field_to: 'correct',
        max_tags: 4,
      },
    ],
    texts: [question, hint],
    images: [avatar],
  },
  empty: {
    avatar: '',
    choices: [],
    correct: '',
    question: '',
  },
};

const free_question = {
  name: 'free_question',
  type: 'form',
  flexDirection: 'column',
  isPlaceholder: false,
  description: {
    tags: [
      {
        field: 'choices',
        max_tags: 50,
      },
    ],
    texts: [question, hint],
    images: [avatar],
  },
  empty: {
    avatar: '',
    choices: [],
    question: '',
  },
};

const location_question = {
  name: 'location_question',
  type: 'form',
  flexDirection: 'column',
  isPlaceholder: false,
  description: {
    numbers: [latitude, longitude, getNumber('range', 'double')],
    texts: [question, hint],
    images: [avatar],
  },
  empty: {
    avatar: '',
    latitude: '',
    longitude: '',
    range: '',
    question: '',
  },
};

const ar_paint_question = {
  name: 'ar_paint_question',
  type: 'form',
  flexDirection: 'column',
  isPlaceholder: false,
  description: {
    texts: [question, hint],
    images: [avatar, getImage('target', 1.7)],
  },
  empty: {
    avatar: '',
    target: '',
    question: '',
  },
};

export const PHOTO_BONUS = 'photo';

export const configs = {
  scenario_step: {
    name: 'scenario_step',
    type: 'depend-form',
    description: {
      selects: [
        text_question,
        location_question,
        ar_paint_question,
        free_question,
      ],
    },
    empty: {
      select: '',
    },
  },
  scenario: {
    name: 'scenario',
    type: 'form',
    flexDirection: 'column',
    isPlaceholder: false,
    description: {
      numbers: [getNumber('difficulty_bounty', 'int')],
    },
    empty: {
      difficulty_bounty: '',
    },
  },
  bonus: {
    name: 'bonus',
    type: 'depend-form',
    description: {
      selects: [
        {
          name: 'video',
          type: 'form',
          flexDirection: 'column',
          isPlaceholder: false,
          description: {
            texts: [url],
          },
          empty: {
            url: '',
          },
        },
        {
          name: PHOTO_BONUS,
          type: 'depend-form',
          description: {
            selects: [
              {
                name: 'uri',
                type: 'form',
                flexDirection: 'column',
                isPlaceholder: false,
                description: {
                  texts: [url],
                },
                empty: {
                  url: '',
                },
              },
              {
                name: 'image',
                type: 'form',
                flexDirection: 'column',
                isPlaceholder: false,
                description: {
                  images: [image],
                },
                empty: {
                  image: '',
                },
              },
            ],
          },
          empty: {
            select: '',
          },
        },
        {
          name: 'text',
          type: 'form',
          flexDirection: 'column',
          isPlaceholder: false,
          description: {
            texts: [getText('text', '512', '2')],
          },
          empty: {
            text: '',
          },
        },
      ],
    },
    empty: {
      select: '',
    },
  },
  museum: {
    name: 'museum',
    type: 'form',
    flexDirection: 'column',
    isPlaceholder: false,
    description: {
      locales: [getText('name', '256', '2'), getText('desc', '4000', '3')],
      req_selects: [
        {
          field: 'location',
          select_field: 'name',
          req_uri: value =>
            requestAuth(`${startUrl}location?startswith=${value}`),
        },
      ],
      images: [image, getImage('logo', 1)],
    },
    empty: {
      eid: '0',
      image: '',
      logo: '',
      name: { RU: '', EN: '' },
      desc: { RU: '', EN: '' },
      location: [],
    },
  },
  feed: {
    name: 'feed',
    type: 'form',
    flexDirection: 'column',
    isPlaceholder: false,
    description: {
      locales: [
        getText('title', '256', '2'),
        getText('desc', '256', '2'),
        getText('text', '4000', '5'),
      ],
      images: [image],
      numbers: [getNumber('priority', 'int')],
    },
    empty: {
      eid: '0',
      image: '',
      title: { RU: '', EN: '' },
      text: { RU: '', EN: '' },
      desc: { RU: '', EN: '' },
      priority: '0',
    },
  },
  location: {
    name: 'location',
    type: 'form',
    flexDirection: 'row',
    isPlaceholder: true,
    description: {
      texts: [getText('name', '256', '1')],
      numbers: [latitude, longitude],
    },
    empty: {
      eid: '0',
      name: '',
      latitude: '',
      longitude: '',
    },
  },
  quest: {
    name: 'quest',
    type: 'form',
    flexDirection: 'column',
    isPlaceholder: false,
    description: {
      locales: [getText('name', '256', '2'), getText('desc', '4000', '3')],
      images: [image],
    },
    empty: {
      eid: '0',
      image: '',
      name: { RU: '', EN: '' },
      desc: { RU: '', EN: '' },
    },
  },
  text_question,
  location_question,
  ar_paint_question,
  free_question,
};

export const listConfigs = {
  museum: {
    isUpdate: true,
    addModal: true,
  },
  feed: {
    isUpdate: true,
    addModal: true,
  },
  location: {
    isUpdate: false,
    addModal: false,
  },
  quest: {
    isUpdate: true,
    addModal: true,
  },
};
