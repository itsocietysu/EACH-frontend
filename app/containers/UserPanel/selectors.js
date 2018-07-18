/**
 * UserPanelPage selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserPanel = state => state.get('userPanel', initialState);

const makeSelectShow = () =>
  createSelector(selectUserPanel, userPanelState => userPanelState.get('show'));

export { selectUserPanel, makeSelectShow };
