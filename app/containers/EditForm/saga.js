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
  const data = yield select(makeSelectNewsData());
  const requestURL = `http://each.itsociety.su:4201/each/feed`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: newsData.get('eid'),
      title: newsData.get('title'),
      text: newsData.get('text'),
      desc: newsData.get('desc'),
      prop: {
        image: newsData.get('image'),
        priority: newsData.get('priority'),
      },
    }),
  };
  if (mod === 'edit') options.method = 'PUT';
  try {
    const resp = yield call(requestAuth, requestURL, options);
    let newData = data;
    if (mod === 'add') {
      newData = [
        {
          eid: resp[0].eid,
          title: resp[0].title,
          text: resp[0].text,
          desc: resp[0].desc,
          image: `http://${resp[0].image[0].url}`,
          priority: `${resp[0].priority[0]}`,
        },
      ].concat(data);
    } else {
      newData = data.map(element => {
        if (element.eid === resp[0].eid) {
          return {
            eid: resp[0].eid,
            title: resp[0].title,
            text: resp[0].text,
            desc: resp[0].desc,
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
  const data = yield select(makeSelectMuseumsData());
  let requestURL = `http://each.itsociety.su:4201/each/add`;
  const options = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      id: museumData.get('eid'),
      name: museumData.get('title').get('RU'),
      desc: museumData.get('desc').get('RU'),
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
    let newData = data;
    if (mod === 'add') {
      newData = [
        {
          eid: resp[0].eid,
          name: { RU: resp[0].name, EN: resp[0].name },
          desc: { RU: resp[0].desc, EN: resp[0].desc },
          image: `http://${resp[0].image[0].url}`,
        },
      ].concat(data);
    } else {
      newData = data.map(element => {
        if (element.eid === resp[0].eid) {
          return {
            eid: resp[0].eid,
            name: { RU: resp[0].name, EN: resp[0].name },
            desc: { RU: resp[0].desc, EN: resp[0].desc },
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
