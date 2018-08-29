/* eslint-disable no-param-reassign */
import { select, call, put, takeLatest } from 'redux-saga/effects';
import { SEND_FEED_DATA, SEND_MUSEUM_DATA } from './constants';
import { dataSent, dataSendingError } from './actions';

import requestAuth from '../../utils/requestAuth';
import { makeSelectFormData, makeSelectMod } from './selectors';

import { makeSelectData as makeSelectNewsData } from '../HomePage/selectors';
import { feedsLoaded } from '../HomePage/actions';
import { makeSelectData as makeSelectMuseumsData } from '../MuseumsPage/selectors';
import { museumsLoaded } from '../MuseumsPage/actions';

import { appLocales } from '../../i18n';
import { toDataURL } from '../../toBase64';

function isChange(body, fields, propFields, newData, oldData) {
  let change = false;
  fields.forEach(field => {
    appLocales.forEach(locale => {
      if (newData[field][locale] !== oldData[field][locale]) {
        if (!body[field]) body[field] = {};
        body[field][locale] = newData[field][locale];
        change = true;
      }
    });
  });
  propFields.forEach(field => {
    if (newData[field] !== oldData[field]) {
      if (!body.prop) body.prop = {};
      body.prop[field] = newData[field];
      change = true;
    }
  });
  return change ? body : false;
}

/**
 * Feed data send handler
 */
export function* sendFeed() {
  const mod = yield select(makeSelectMod());
  const newsData = yield select(makeSelectFormData());
  const data = yield select(makeSelectNewsData());
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
        image: newsData.image,
        priority: newsData.priority,
      },
    };
  else {
    method = 'PUT';
    body.id = newsData.eid;
    const oldData = data.map(feed => feed.eid === newsData.eid && feed)[0];
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
    body = isChange(
      body,
      ['title', 'text', 'desc'],
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
      id: museumData.eid,
      name: museumData.title.RU,
      desc: museumData.desc.RU,
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
