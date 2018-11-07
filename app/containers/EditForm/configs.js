/* eslint-disable camelcase */
import requestAuth from '../../utils/requestAuth';

export const startUrl = 'http://each.itsociety.su:4201/each/';

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
      },
    ],
    texts: [
      {
        field: 'question',
        maxLength: '256',
        rows: '1',
      },
    ],
    images: [
      {
        field: 'avatar',
      },
    ],
  },
  empty: {
    avatar: '',
    choices: [],
    correct: '',
    question: '',
  },
};

const location_question = {
  name: 'location_question',
  type: 'form',
  flexDirection: 'column',
  isPlaceholder: false,
  description: {
    numbers: [
      {
        field: 'latitude',
        format: 'double',
      },
      {
        field: 'longitude',
        format: 'double',
      },
      {
        field: 'range',
        format: 'double',
      },
    ],
    texts: [
      {
        field: 'question',
        maxLength: '256',
        rows: '1',
      },
    ],
    images: [
      {
        field: 'avatar',
      },
    ],
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
    texts: [
      {
        field: 'question',
        maxLength: '256',
        rows: '1',
      },
    ],
    images: [
      {
        field: 'avatar',
      },
      {
        field: 'target',
      },
    ],
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
      selects: [text_question, location_question, ar_paint_question],
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
      numbers: [
        {
          field: 'difficulty_bounty',
          format: 'int',
        },
      ],
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
            texts: [
              {
                field: 'url',
                maxLength: '256',
                rows: '1',
              },
            ],
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
                  texts: [
                    {
                      field: 'url',
                      maxLength: '256',
                      rows: '1',
                    },
                  ],
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
                  images: [
                    {
                      field: 'image',
                    },
                  ],
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
            texts: [
              {
                field: 'text',
                maxLength: '256',
                rows: '1',
              },
            ],
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
      req_selects: [
        {
          field: 'location',
          select_field: 'name',
          req_uri: value =>
            requestAuth(`${startUrl}location?startswith=${value}`),
        },
      ],
      images: [
        {
          field: 'image',
        },
      ],
    },
    empty: {
      eid: '0',
      image: '',
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
      images: [
        {
          field: 'image',
        },
      ],
      numbers: [
        {
          field: 'priority',
          format: 'int',
        },
      ],
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
      images: [
        {
          field: 'image',
        },
      ],
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
