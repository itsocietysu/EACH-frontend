/* eslint-disable no-param-reassign,guard-for-in,no-restricted-syntax */
import { call, put, select, takeLatest } from 'redux-saga/effects';
import { DELETE_DATA, LOAD_DATA, SEND_DATA } from './constants';
import {
  dataDeleted,
  dataDeletingError,
  dataLoaded,
  dataLoadingError,
  dataSendingError,
  dataSent,
} from './actions';

import requestAuth from '../../utils/requestAuth';

import {
  makeSelectContent,
  makeSelectCount,
  makeSelectData,
  makeSelectDataToPost,
  makeSelectEid,
  makeSelectPage,
  makeSelectPostMod,
  makeSelectRequestProps,
} from './selectors';

import {
  FEED_CFG,
  getValues,
  LOCATION_CFG,
  MUSEUM_CFG,
  QUEST_CFG,
  settings,
  urls,
} from './configs';
import {
  changedData,
  getItemForPost,
  getItemFromResp,
  getDataFromResp,
} from '../../utils/utils';
import { toDataURL } from '../../toBase64';

const getDataFromLoad = {
  museum: resp => ({
    data: getDataFromResp(resp.result, MUSEUM_CFG),
    count: resp.count,
    page: resp.page,
  }),
  feed: resp => ({
    data: getDataFromResp(resp.result, FEED_CFG),
    count: resp.count,
    page: resp.page,
  }),
  location: resp => ({
    data: getDataFromResp(resp.result, LOCATION_CFG),
    count: resp.count,
    page: resp.page,
  }),
  quest: resp => ({
    data: getDataFromResp(resp, QUEST_CFG),
    count: 1,
    page: 1,
  }),
};

/**
 * Data load handler
 */
export function* loadData() {
  const content = yield select(makeSelectContent());
  const reqProps = yield select(makeSelectRequestProps());
  const page = yield select(makeSelectPage());
  const requestURL = urls[content].tape(
    reqProps,
    (page - 1) * 10,
    page * 10 - 1,
  );
  try {
    const resp = yield call(requestAuth, requestURL);
    const data = getDataFromLoad[content](resp);
    yield put(dataLoaded(data.data, data.count, data.page));
  } catch (err) {
    yield put(dataLoadingError(err));
  }
}

/**
 * Data send handler
 */
export function* sendData() {
  const content = yield select(makeSelectContent());
  const mod = yield select(makeSelectPostMod());
  const formData = yield select(makeSelectDataToPost());
  const reqProps = yield select(makeSelectRequestProps());
  const data = yield select(makeSelectData());
  const page = yield select(makeSelectPage());
  let count = yield select(makeSelectCount());
  const {
    fields,
    updProps,
    getProps,
    locales,
    noLocales,
    addProps,
  } = getValues[content];
  const setting = settings[content];
  let requestURL = urls[content].add;
  let body = {};
  let method = 'POST';
  let dataToPost = formData;
  if (reqProps) dataToPost = Object.assign(formData, reqProps);
  if (mod === 'add') body = getItemForPost(dataToPost, fields, addProps);
  else if (mod === 'edit') {
    method = 'PUT';
    requestURL = urls[content].update;
    body.id = dataToPost.eid;
    const oldData = data.filter(item => item.eid === dataToPost.eid)[0];
    const oldDataWithBase64 = Object.assign({}, oldData);
    if (Object.keys(setting).includes('images')) {
      const { images } = setting;
      for (let i = 0; i < images.length; i += 1)
        oldDataWithBase64[images[i].field] = yield call(
          toDataURL,
          oldData[images[i].field],
        );
    }
    body = changedData(
      body,
      locales,
      noLocales,
      updProps,
      dataToPost,
      oldDataWithBase64,
    );
    if (!body) {
      yield put(dataSent());
      return;
    }
  } else throw new Error('Incorrect mod supplied');
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
      newData = [getItemFromResp(resp, fields, getProps)].concat(data || []);
      count += 1;
    } else {
      newData = data.map(element => {
        if (element.eid === resp.eid) {
          return getItemFromResp(resp, fields, getProps);
        }
        return element;
      }, resp);
    }
    yield put(dataLoaded(newData, count, page));
    yield put(dataSent());
  } catch (err) {
    yield put(dataSendingError(err));
  }
}

/**
 * Data delete handler
 */
export function* deleteData() {
  const content = yield select(makeSelectContent());
  const eid = yield select(makeSelectEid());
  const requestURL = urls[content].delete(eid);
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
      dataLoaded(data.filter(element => element.eid !== eid), count - 1, page),
    );
  } catch (err) {
    yield put(dataDeletingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* editData() {
  yield takeLatest(LOAD_DATA, loadData);
  yield takeLatest(DELETE_DATA, deleteData);
  yield takeLatest(SEND_DATA, sendData);
}
