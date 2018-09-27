/* eslint-disable no-param-reassign,prettier/prettier */

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
