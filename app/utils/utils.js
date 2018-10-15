/* eslint-disable no-param-reassign,prettier/prettier */

import { appLocales } from '../i18n';

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

const setPropsToUpdate = {
  image: (data, oldData, newData) => {
    if (newData.image !== oldData.image) {
      if (!data.prop) data.prop = {};
      data.prop.image = newData.image;
      return true;
    }
    return false;
  },
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

const getProps = {
  image: i => `${i.image[0] ? `http://${i.image[0].url}` : '/Photo.png'}`,
  priority: p => `${p.priority[0] ? p.priority[0] : 0}`,
  location: l => l.location ? l.location : [],
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

const setPropsToAdd = {
  image: (data, item, crop) => {
    data.prop.image = crop.image;
  },
  priority: (data, item) => {
    data.prop.priority = item.priority;
  },
  location: (data, item) => {
    data.prop.location = { add: [], delete: [] };
    item.location.forEach(location => {
      data.prop.location.add.push(location.eid);
    });
  },
};

export function getItemForPost(item, fields, propFields, crop) {
  const data = { id: item.eid };
  fields.forEach(v => {
    data[v] = item[v];
  });
  if (propFields.length) {
    data.prop = {};
    propFields.forEach(v => {
      setPropsToAdd[v](data, item, crop);
    });
  }
  return data;
}
