/**
 * EditMuseumsPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectEditMuseums = state => state.get('editMuseumsData', initialState);

const makeSelectEid = () =>
  createSelector(selectEditMuseums, editMuseumsState =>
    editMuseumsState.get('eid'),
  );

export { selectEditMuseums, makeSelectEid };
