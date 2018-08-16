/* eslint-disable import/first */
import { select, call, put, takeLatest } from 'redux-saga/effects';
import { SEND_DATA } from './constants';
import { dataSent, dataSendingError } from './actions';

import requestAuth from 'utils/requestAuth';
import { makeSelectNewsData, makeSelectMod } from './selectors';

import { makeSelectData } from 'containers/HomePage/selectors';
import { feedsLoaded } from 'containers/HomePage/actions';

/**
 * Feed data send handler
 */
export function* sendFeed() {
  const mod = yield select(makeSelectMod());
  const newsData = yield select(makeSelectNewsData());
  const requestURL = `http://each.itsociety.su:4201/each/feed`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: newsData.get('eid'),
      title: newsData.get('title'),
      text: newsData.get('text'),
      prop: {
        image: newsData.get('image'),
        priority: newsData.get('priority'),
      },
    }),
  };
  if (mod === 'edit') options.method = 'PUT';
  try {
    const resp = yield call(requestAuth, requestURL, options);
    const data = yield select(makeSelectData());
    let newData = data;
    if (mod === 'add') {
      newData = data.concat([
        {
          eid: resp[0].eid,
          title: resp[0].title,
          text: resp[0].text,
          image: `http://${resp[0].image[0].url}`,
          priority: `${resp[0].priority[0]}`,
        },
      ]);
    } else {
      newData = data.map(element => {
        if (element.eid === resp[0].eid) {
          return {
            eid: resp[0].eid,
            title: resp[0].title,
            text: resp[0].text,
            image: `http://${resp[0].image[0].url}`,
            priority: `${resp[0].priority[0]}`,
          };
        }
        return element;
      }, resp);
    }
    yield put(feedsLoaded(newData));
    yield put(dataSent());
  } catch (err) {
    yield put(dataSendingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sendFeedData() {
  yield takeLatest(SEND_DATA, sendFeed);
}
