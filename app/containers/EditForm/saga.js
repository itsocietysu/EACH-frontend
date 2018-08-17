/* eslint-disable import/first */
import { select, call, put, takeLatest } from 'redux-saga/effects';
import { SEND_FEED_DATA, SEND_MUSEUM_DATA } from './constants';
import { dataSent, dataSendingError } from './actions';

import requestAuth from 'utils/requestAuth';
import { makeSelectFormData, makeSelectMod } from './selectors';

import { makeSelectData as makeSelectNewsData } from 'containers/HomePage/selectors';
import { feedsLoaded } from 'containers/HomePage/actions';
import { makeSelectData as makeSelectMuseumsData } from 'containers/MuseumsPage/selectors';
import { museumsLoaded } from 'containers/MuseumsPage/actions';

/**
 * Feed data send handler
 */
export function* sendFeed() {
  const mod = yield select(makeSelectMod());
  const newsData = yield select(makeSelectFormData());
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
    const data = yield select(makeSelectNewsData());
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
 * Museum data send handler
 */
export function* sendMuseum() {
  const mod = yield select(makeSelectMod());
  const museumData = yield select(makeSelectFormData());
  let requestURL = `http://each.itsociety.su:4201/each/add`;
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: museumData.get('eid'),
      ownerid: 96,
      name: museumData.get('title'),
      desc: museumData.get('text'),
      prop: {
        image: museumData.get('image'),
      },
    }),
  };
  if (mod === 'edit') {
    options.method = 'PUT';
    requestURL = `http://each.itsociety.su:4201/each/update`;
  }
  try {
    const resp = yield call(requestAuth, requestURL, options);
    const data = yield select(makeSelectMuseumsData());
    let newData = data;
    if (mod === 'add') {
      newData = data.concat([
        {
          eid: resp[0].eid,
          name: resp[0].name,
          desc: resp[0].desc,
          image: `http://${resp[0].image[0].url}`,
        },
      ]);
    } else {
      newData = data.map(element => {
        if (element.eid === resp[0].eid) {
          return {
            eid: resp[0].eid,
            name: resp[0].name,
            desc: resp[0].desc,
            image: `http://${resp[0].image[0].url}`,
          };
        }
        return element;
      }, resp);
    }
    yield put(museumsLoaded(newData));
    yield put(dataSent());
  } catch (err) {
    yield put(dataSendingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* sendFeedData() {
  yield takeLatest(SEND_FEED_DATA, sendFeed);
  yield takeLatest(SEND_MUSEUM_DATA, sendMuseum);
}
