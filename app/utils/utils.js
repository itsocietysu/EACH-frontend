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
