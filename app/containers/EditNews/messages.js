/*
 * EditNews Messages
 *
 * This contains all the text for the EditNews component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'each.containers.EditNews.title',
    defaultMessage: 'Title',
  },
  text: {
    id: 'each.containers.EditNews.text',
    defaultMessage: 'Text',
  },
  priority: {
    id: 'each.containers.EditNews.priority',
    defaultMessage: 'Priority',
  },
  close: {
    id: 'each.containers.EditNews.close',
    defaultMessage: 'Close',
  },
  confirm: {
    id: 'each.containers.EditNews.confirm',
    defaultMessage: 'Confirm',
  },
  imageSize: {
    id: 'each.containers.EditNews.imageSize',
    defaultMessage:
      'Selection area is small or not square. Change the selection area and try not to go beyond the image.',
  },
  imageSmall: {
    id: 'each.containers.EditNews.imageSmall',
    defaultMessage: 'Small image. Minimum size is 256x256.',
  },
  empty: {
    id: 'each.containers.EditNews.empty',
    defaultMessage: 'There are empty fields',
  },
});
