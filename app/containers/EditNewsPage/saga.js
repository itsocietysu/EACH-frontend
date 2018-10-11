/* eslint-disable no-param-reassign */
import { select, call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_DATA, SEND_DATA } from './constants';
import {
  dataDeleted,
  dataDeletingError,
  dataSendingError,
  dataSent,
} from './actions';

import requestAuth from '../../utils/requestAuth';
import { makeSelectEid } from './selectors';

import { LOAD_FEEDS } from '../HomePage/constants';
import { loadFeeds } from '../HomePage/saga';
import {
  makeSelectData,
  makeSelectPage,
  makeSelectCount,
} from '../HomePage/selectors';
import { feedsLoaded } from '../HomePage/actions';
import { toDataURL } from '../../toBase64';
import {
  makeSelectFormData,
  makeSelectMod,
  makeSelectCrop,
} from '../EditForm/selectors';

import { changedData } from '../../utils/utils';

/**
 * Feed data send handler
 */
export function* sendFeed() {
  const mod = yield select(makeSelectMod());
  const newsData = yield select(makeSelectFormData());
  const crop = yield select(makeSelectCrop());
  const data = yield select(makeSelectData());
  const page = yield select(makeSelectPage());
  let count = yield select(makeSelectCount());
  const requestURL = `http://each.itsociety.su:4201/each/feed`;
  let body = {};
  let method = 'POST';
  if (mod === 'add')
    body = {
      id: newsData.eid,
      title: newsData.title,
      text: newsData.text,
      desc: newsData.desc,
      prop: {
        image: crop.image,
        priority: newsData.priority,
      },
    };
  else {
    method = 'PUT';
    body.id = newsData.eid;
    newsData.image = crop.image;
    const oldData = data.filter(feed => feed.eid === newsData.eid)[0];
    const oldImage = yield call(toDataURL, oldData.image);
    const oldDataWithBase64 = {};
    Object.keys(oldData).forEach(k => {
      if (k === 'image')
        oldDataWithBase64[k] = oldImage.replace(
          /^data:image\/(png|jpg|jpeg);base64,/,
          '',
        );
      else oldDataWithBase64[k] = oldData[k];
    });
    body = changedData(
      body,
      ['title', 'text', 'desc'],
      [],
      ['image', 'priority'],
      newsData,
      oldDataWithBase64,
    );
    if (!body) {
      yield put(dataSent());
      return;
    }
  }
  const options = {
    method,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  try {
    const resp = (yield call(requestAuth, requestURL, options))[0];
    let newData = data;
    if (mod === 'add') {
      newData = [
        {
          eid: resp.eid,
          title: resp.title,
          text: resp.text,
          desc: resp.desc,
          image: `http://${resp.image[0].url}`,
          priority: `${resp.priority[0]}`,
        },
      ].concat(data);
      count += 1;
    } else {
      newData = data.map(element => {
        if (element.eid === resp.eid) {
          return {
            eid: resp.eid,
            title: resp.title,
            text: resp.text,
            desc: resp.desc,
            image: `http://${resp.image[0].url}`,
            priority: `${resp.priority[0]}`,
          };
        }
        return element;
      }, resp);
    }
    yield put(feedsLoaded(newData, count, page));
    yield put(dataSent());
  } catch (err) {
    yield put(dataSendingError(err));
  }
}

/**
 * Feed data delete handler
 */
export function* deleteFeed() {
  const eid = yield select(makeSelectEid());
  const requestURL = `http://each.itsociety.su:4201/each/feed/${eid}?hard=true`;
  const page = yield select(makeSelectPage());
  const count = yield select(makeSelectCount());
  const options = {
    method: 'DELETE',
  };
  try {
    yield call(requestAuth, requestURL, options);
    yield put(dataDeleted());
    const data = yield select(makeSelectData());
    yield put(
      feedsLoaded(data.filter(element => element.eid !== eid), count - 1, page),
    );
  } catch (err) {
    yield put(dataDeletingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* deleteData() {
  yield takeLatest(LOAD_FEEDS, loadFeeds);
  yield takeLatest(DELETE_DATA, deleteFeed);
  yield takeLatest(SEND_DATA, sendFeed);
}
