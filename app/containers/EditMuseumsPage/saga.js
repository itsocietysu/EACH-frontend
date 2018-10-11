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

import { loadMuseums } from '../MuseumsPage/saga';
import { LOAD_MUSEUMS } from '../MuseumsPage/constants';
import {
  makeSelectData,
  makeSelectPage,
  makeSelectCount,
} from '../MuseumsPage/selectors';
import { museumsLoaded } from '../MuseumsPage/actions';
import {
  makeSelectFormData,
  makeSelectMod,
  makeSelectCrop,
} from '../EditForm/selectors';
import { toDataURL } from '../../toBase64';
import { changedData } from '../../utils/utils';

/**
 * Museum data delete handler
 */
export function* deleteMuseum() {
  const eid = yield select(makeSelectEid());
  const requestURL = `http://each.itsociety.su:4201/each/museum/${eid}?hard=true`;
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
      museumsLoaded(
        data.filter(element => element.eid !== eid),
        count - 1,
        page,
      ),
    );
  } catch (err) {
    yield put(dataDeletingError(err));
  }
}

/**
 * Museum data send handler
 */
export function* sendMuseum() {
  const mod = yield select(makeSelectMod());
  const museumData = yield select(makeSelectFormData());
  const crop = yield select(makeSelectCrop());
  const data = yield select(makeSelectData());
  const page = yield select(makeSelectPage());
  let count = yield select(makeSelectCount());
  let requestURL = `http://each.itsociety.su:4201/each/add`;
  let body = {};
  let method = 'POST';
  if (mod === 'add')
    body = {
      id: museumData.eid,
      name: museumData.name,
      desc: museumData.desc,
      prop: {
        image: crop.image,
      },
    };
  else {
    method = 'PUT';
    requestURL = `http://each.itsociety.su:4201/each/update`;
    body.id = museumData.eid;
    museumData.image = crop.image;
    const oldData = data.filter(museum => museum.eid === museumData.eid)[0];
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
      ['name', 'desc'],
      [],
      ['image'],
      museumData,
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
          name: resp.name,
          desc: resp.desc,
          image: `http://${resp.image[0].url}`,
        },
      ].concat(data);
      count += 1;
    } else {
      newData = data.map(element => {
        if (element.eid === resp.eid) {
          return {
            eid: resp.eid,
            name: resp.name,
            desc: resp.desc,
            image: `http://${resp.image[0].url}`,
          };
        }
        return element;
      }, resp);
    }
    yield put(museumsLoaded(newData, count, page));
    yield put(dataSent());
  } catch (err) {
    yield put(dataSendingError(err));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* editData() {
  yield takeLatest(LOAD_MUSEUMS, loadMuseums);
  yield takeLatest(DELETE_DATA, deleteMuseum);
  yield takeLatest(SEND_DATA, sendMuseum);
}
