/*
 * EditForm Messages
 *
 * This contains all the text for the EditForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    locale: {
      RU: {
        id: 'each.containers.EditForm.titleRU',
        defaultMessage: 'Title ru',
      },
      EN: {
        id: 'each.containers.EditForm.titleEN',
        defaultMessage: 'Title en',
      },
    },
  },
  text: {
    locale: {
      RU: {
        id: 'each.containers.EditForm.textRU',
        defaultMessage: 'Text ru',
      },
      EN: {
        id: 'each.containers.EditForm.textEN',
        defaultMessage: 'Text en',
      },
    },
  },
  name: {
    locale: {
      RU: {
        id: 'each.containers.EditForm.nameRU',
        defaultMessage: 'Name ru',
      },
      EN: {
        id: 'each.containers.EditForm.nameEN',
        defaultMessage: 'Name en',
      },
    },
    id: 'each.containers.EditForm.name',
    defaultMessage: 'Name',
  },
  desc: {
    locale: {
      RU: {
        id: 'each.containers.EditForm.descRU',
        defaultMessage: 'Description ru',
      },
      EN: {
        id: 'each.containers.EditForm.descEN',
        defaultMessage: 'Description en',
      },
    },
  },
  priority: {
    id: 'each.containers.EditForm.priority',
    defaultMessage: 'Priority',
  },
  latitude: {
    id: 'each.containers.EditForm.latitude',
    defaultMessage: 'Latitude',
  },
  longitude: {
    id: 'each.containers.EditForm.longitude',
    defaultMessage: 'Longitude',
  },
  crop: {
    id: 'each.containers.EditForm.crop',
    defaultMessage: 'Crop',
  },
  close: {
    id: 'each.containers.EditForm.close',
    defaultMessage: 'Close',
  },
  confirm: {
    id: 'each.containers.EditForm.confirm',
    defaultMessage: 'Confirm',
  },
  imageSize: {
    id: 'each.containers.EditForm.imageSize',
    defaultMessage:
      'Selection area is small or not square. Change the selection area and try not to go beyond the image.',
  },
  imageSmall: {
    id: 'each.containers.EditForm.imageSmall',
    defaultMessage: 'Small image. Minimum size is 256x256.',
  },
  empty: {
    id: 'each.containers.EditForm.empty',
    defaultMessage: 'There are empty fields',
  },
  sure: {
    id: 'each.containers.EditForm.sure',
    defaultMessage:
      'Are you sure you want to close? All unsaved changes will be lost.',
  },
});
