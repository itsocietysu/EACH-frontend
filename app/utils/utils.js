/* eslint-disable no-param-reassign,prettier/prettier */

import { appLocales } from '../i18n';

export const parseQueryString = str => {
  if (!str)
    return {};
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

export function changedData(data, localeFields, fields, propFields, newData, oldData) {
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
    if (newData[field] !== oldData[field]) {
      if (!data.prop) data.prop = {};
      data.prop[field] = newData[field];
      change = true;
    }
  });
  return change ? data : false;
}

const getProps = {
  image: i => `${i.image[0] ? `http://${i.image[0].url}` : '/Photo.png'}`,
  priority: p => `${p.priority[0] ? p.priority[0] : 0}`,
};

export function getItemFromResp(item, fields, propFields) {
  const data = { eid: item.eid };
  fields.forEach(v => {
    data[v] = item[v];
  });
  propFields.forEach(v => {data[v] = getProps[v](item)});
  return data;
}

export function getItemForPost(item, fields, propFields, crop) {
  const data = { id: item.eid };
  fields.forEach(v => {
    data[v] = item[v];
  });
  if (propFields.length) {
    data.prop = {};
    propFields.forEach(v => {
      if (Object.keys(crop).includes(v))
        data.prop[v] = crop[v];
      else
        data.prop[v] = item[v];
    });
  }
  return data;
}
