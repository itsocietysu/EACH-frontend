/* eslint-disable no-param-reassign,guard-for-in,no-restricted-syntax */
import { select, call, put, takeLatest } from 'redux-saga/effects';
import { DELETE_DATA, SEND_DATA, LOAD_DATA } from './constants';
import {
  dataDeleted,
  dataDeletingError,
  dataSendingError,
  dataSent,
  dataLoaded,
  dataLoadingError,
} from './actions';

import requestAuth from '../../utils/requestAuth';

import {
  makeSelectEid,
  makeSelectData,
  makeSelectPage,
  makeSelectCount,
  makeSelectContent,
  makeSelectRequestProps,
} from './selectors';
import {
  makeSelectCrop,
  makeSelectFormData,
  makeSelectMod,
} from '../EditForm/selectors';

import { urls, getValues, settings } from './configs';
import {
  changedData,
  getItemFromResp,
  getItemForPost,
} from '../../utils/utils';
import { toDataURL } from '../../toBase64';

function getData(resp, content) {
  const { fields, props } = getValues[content];
  if (resp.length) {
    return resp.map(item => getItemFromResp(item, fields, props));
  }
  return [];
}

const getDataFromLoad = {
  museum: resp => ({
    data: getData(resp.result, 'museum'),
    count: resp.count,
    page: resp.page,
  }),
  feed: resp => ({
    data: getData(resp.result, 'feed'),
    count: resp.count,
    page: resp.page,
  }),
  location: resp => ({
    data: getData(resp.result, 'location'),
    count: resp.count,
    page: resp.page,
  }),
  quest: resp => ({
    data: getData(resp, 'quest'),
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
 * Locations data send handler
 */
export function* sendData() {
  const content = yield select(makeSelectContent());
  const mod = yield select(makeSelectMod());
  const formData = yield select(makeSelectFormData());
  const reqProps = yield select(makeSelectRequestProps());
  const crop = yield select(makeSelectCrop());
  const data = yield select(makeSelectData());
  const page = yield select(makeSelectPage());
  let count = yield select(makeSelectCount());
  const { fields, props, locales, noLocales, addProps } = getValues[content];
  const setting = settings[content];
  let requestURL = urls[content].add;
  let body = {};
  let method = 'POST';
  let dataToPost = formData;
  if (reqProps) dataToPost = Object.assign(formData, reqProps);
  if (mod === 'add') body = getItemForPost(dataToPost, fields, addProps, crop);
  else if (mod === 'edit') {
    method = 'PUT';
    requestURL = urls[content].update;
    body.id = dataToPost.eid;
    const oldData = data.filter(item => item.eid === dataToPost.eid)[0];
    const oldDataWithBase64 = Object.assign({}, oldData);
    if (setting.image) {
      const oldImage = yield call(toDataURL, oldData.image);
      dataToPost.image = crop.image;
      oldDataWithBase64.image = oldImage.replace(
        /^data:image\/(png|jpg|jpeg);base64,/,
        '',
      );
    }
    body = changedData(
      body,
      locales,
      noLocales,
      props,
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
      newData = [getItemFromResp(resp, fields, props)].concat(data || []);
      count += 1;
    } else {
      newData = data.map(element => {
        if (element.eid === resp.eid) {
          return getItemFromResp(resp, fields, props);
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
 * Locations data delete handler
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
