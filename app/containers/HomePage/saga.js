import { call, select, put, takeLatest } from 'redux-saga/effects';
import { LOAD_FEEDS } from './constants';
import { feedsLoaded, feedsLoadingError } from './actions';
import { makeSelectPage } from './selectors';

import request from '../../utils/request';
import { getValues, urls } from '../EditPage/configs';
import { getItemFromResp } from '../../utils/utils';

/**
 * Feeds data load handler
 */
export function* loadFeeds() {
  const page = yield select(makeSelectPage());
  const requestURL = urls.feed.tape(false, (page - 1) * 10, page * 10 - 1);
  try {
    const feeds = yield call(request, requestURL);
    let data = false;
    const { fields, props } = getValues.feed;
    if (feeds.result.length) {
      data = feeds.result.map(item => getItemFromResp(item, fields, props));
    }
    yield put(feedsLoaded(data, feeds.count, feeds.page));
  } catch (err) {
    yield put(feedsLoadingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* loadFeedsData() {
  yield takeLatest(LOAD_FEEDS, loadFeeds);
}
