/*
 * EditForm Messages
 *
 * This contains all the text for the EditForm component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  title: {
    id: 'each.containers.EditForm.title',
    defaultMessage: 'Title',
  },
  text: {
    id: 'each.containers.EditForm.text',
    defaultMessage: 'Text',
  },
  name: {
    id: 'each.containers.EditForm.name',
    defaultMessage: 'Name',
  },
  desc: {
    id: 'each.containers.EditForm.desc',
    defaultMessage: 'Description',
  },
  priority: {
    id: 'each.containers.EditForm.priority',
    defaultMessage: 'Priority',
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
});
