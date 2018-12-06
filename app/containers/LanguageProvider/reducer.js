/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';

import { setLocale, getLocale } from 'cookieManager';

import { CHANGE_LOCALE } from './constants';

export const initialState = fromJS({
  locale: getLocale(),
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      setLocale(action.locale);
      return state.set('locale', action.locale);
    default:
      return state;
  }
}

export default languageProviderReducer;
