/*
 * HomePageReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import {
  LOAD_DATA,
  LOAD_DATA_SUCCESS,
  LOAD_DATA_ERROR,
  CHANGE_HOME_CONTENT,
} from './constants';
import { FEED_CFG } from '../../utils/constants';

export const initialState = fromJS({
  loading: false,
  error: false,
  data: false,
  homeContent: FEED_CFG,
  header: false,
});

function homeReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA:
      return state
        .set('loading', true)
        .set('error', false)
        .set('data', false);
    case LOAD_DATA_SUCCESS:
      return state
        .set('loading', false)
        .set('data', action.data)
        .set('header', action.header);
    case LOAD_DATA_ERROR:
      return state.set('error', action.error).set('loading', false);
    case CHANGE_HOME_CONTENT:
      return state.set('homeContent', action.content);
    default:
      return state;
  }
}

export default homeReducer;
