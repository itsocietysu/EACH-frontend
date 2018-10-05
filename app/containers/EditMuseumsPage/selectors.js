/**
 * EditMuseumsPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectDeleteMuseums = state => state.get('editMuseumsData', initialState);

const makeSelectEid = () =>
  createSelector(selectDeleteMuseums, editMuseumsState =>
    editMuseumsState.get('eid'),
  );

export { selectDeleteMuseums, makeSelectEid };
