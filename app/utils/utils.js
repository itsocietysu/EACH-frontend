/* eslint-disable no-param-reassign,prettier/prettier */

import { appLocales } from '../i18n';
import { getValues } from '../containers/EditPage/configs';

export const BASE64_RE = /^data:image\/(png|jpg|jpeg);base64,/;

export const parseQueryString = str => {
  if (!str) return {};
  const arr = str.split('&');
  arr.forEach((v, i, _arr) => {
    _arr[i] = `"${v.replace('=', '":"')}"`;
  });
  return str
    ? JSON.parse(
      `{${arr.join()}}`,
      (key, value) => (key === '' ? value : decodeURIComponent(value)),
    )
    : {};
};

function differenceOfArrays(oldArray, newArray, propField) {
  const diffArray = { add: [], delete: [] };
  let it1 = 0;
  let it2 = 0;
  while (it1 < oldArray.length && it2 < newArray.length) {
    while (
      it1 < oldArray.length &&
      oldArray[it1][propField] < newArray[it2][propField]
    ) {
      diffArray.delete.push(oldArray[it1][propField]);
      it1 += 1;
    }
    while (
      it1 < oldArray.length &&
      it2 < newArray.length &&
      oldArray[it1][propField] === newArray[it2][propField]
    ) {
      it1 += 1;
      it2 += 1;
    }
    while (
      it1 < oldArray.length &&
      it2 < newArray.length &&
      oldArray[it1][propField] > newArray[it2][propField]
    ) {
      diffArray.add.push(newArray[it2][propField]);
      it2 += 1;
    }
  }
  while (it1 < oldArray.length) {
    diffArray.delete.push(oldArray[it1][propField]);
    it1 += 1;
  }
  while (it2 < newArray.length) {
    diffArray.add.push(newArray[it2][propField]);
    it2 += 1;
  }
  return diffArray;
}

const setImageToUpdate = (data, oldData, newData, field) => {
  if (newData[field] !== oldData[field]) {
    if (!data.prop) data.prop = {};
    data.prop[field] = newData[field].replace(BASE64_RE, '');
    return true;
  }
  return false;
};

const setPropsToUpdate = {
  image: (data, oldData, newData) => setImageToUpdate(data, oldData, newData, 'image'),
  logo: (data, oldData, newData) => setImageToUpdate(data, oldData, newData, 'logo'),
  priority: (data, oldData, newData) => {
    if (newData.priority !== oldData.priority) {
      if (!data.prop) data.prop = {};
      data.prop.priority = newData.priority;
      return true;
    }
    return false;
  },
  location: (data, oldData, newData) => {
    const oldLocation = oldData.location;
    const newLocation = newData.location;
    oldLocation.sort((a, b) => a.eid - b.eid);
    newLocation.sort((a, b) => a.eid - b.eid);
    const location = differenceOfArrays(oldLocation, newLocation, 'eid');
    if (location.add.length > 0 || location.delete.length > 0) {
      if (!data.prop) data.prop = {};
      data.prop.location = location;
      return true;
    }
    return false;
  },
};

export function changedData(
  data,
  localeFields,
  fields,
  propFields,
  newData,
  oldData,
) {
  let change = false;
  localeFields.forEach(field => {
    appLocales.forEach(locale => {
      if (newData[field][locale] !== oldData[field][locale]) {
        if (!data[field]) data[field] = {};
        data[field][locale] = newData[field][locale];
        change = true;
      }
    });
  });
  fields.forEach(field => {
    if (newData[field] !== oldData[field]) {
      if (!data[field]) data[field] = {};
      data[field] = newData[field];
      change = true;
    }
  });
  propFields.forEach(field => {
    if (setPropsToUpdate[field](data, oldData, newData))
      change = true;
  });
  return change ? data : false;
}

const getImage = (data, field) => `${data[field][0] ? `http://${data[field][0].url}` : '/photo.png'}`;

const getProps = {
  image: i => getImage(i, 'image'),
  logo: l => getImage(l, 'logo'),
  priority: p => `${p.priority[0] ? p.priority[0] : 0}`,
  location: l => l.location ? l.location : [],
  scenario: s => `${s.scenario[0] ? s.scenario[0].eid : 0}`,
};

export function getItemFromResp(item, fields, propFields) {
  const data = { eid: item.eid };
  fields.forEach(v => {
    data[v] = item[v];
  });
  propFields.forEach(v => {
    data[v] = getProps[v](item);
  });
  return data;
}

export function getDataFromResp(resp, content) {
  const { fields } = getValues[content];
  const props = getValues[content].getProps;
  if (resp.length) {
    return resp.map(item => getItemFromResp(item, fields, props));
  }
  return [];
}

const setImageToAdd = (data, item, field) => {
  data.prop[field] = item[field].replace(BASE64_RE, '');
};

const setPropsToAdd = {
  image: (data, item) => setImageToAdd(data, item, 'image'),
  logo: (data, item) => setImageToAdd(data, item, 'logo'),
  priority: (data, item) => {
    data.prop.priority = item.priority;
  },
  location: (data, item) => {
    data.prop.location = { add: [], delete: [] };
    item.location.forEach(location => {
      data.prop.location.add.push(location.eid);
    });
  },
  game: (data, item) => {
    data.prop.game = item.museumId;
  },
};

export function getItemForPost(item, fields, propFields) {
  const data = { id: item.eid };
  fields.forEach(v => {
    data[v] = item[v];
  });
  if (propFields.length) {
    data.prop = {};
    propFields.forEach(v => {
      setPropsToAdd[v](data, item);
    });
  }
  return data;
}
