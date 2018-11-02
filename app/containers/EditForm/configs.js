import requestAuth from '../../utils/requestAuth';
import { startUrl } from '../EditFormD/configs';

export const selectRequest = {
  location: value => requestAuth(`${startUrl}location?startswith=${value}`),
};

export const selectField = {
  location: 'name',
};
