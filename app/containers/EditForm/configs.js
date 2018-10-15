import requestAuth from '../../utils/requestAuth';
import { startUrl } from '../EditPage/configs';

export const selectRequest = {
  location: value => requestAuth(`${startUrl}location?startswith=${value}`),
};

export const selectField = {
  location: 'name',
};
