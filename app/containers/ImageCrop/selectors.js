/**
 * ImageCrop selectors
 */

import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectImageCrop = state => state.get('imageCrop', initialState);

const makeSelectCrop = () =>
  createSelector(selectImageCrop, imageCropState => imageCropState.get('crop'));

const makeSelectPixelCrop = () =>
  createSelector(selectImageCrop, imageCropState =>
    imageCropState.get('pixelCrop'),
  );

const makeSelectImageElement = () =>
  createSelector(selectImageCrop, imageCropState =>
    imageCropState.get('image'),
  );

const makeSelectBase64 = () =>
  createSelector(selectImageCrop, imageCropState =>
    imageCropState.get('complete'),
  );

const makeSelectSizes = () =>
  createSelector(selectImageCrop, imageCropState =>
    imageCropState.get('sizes'),
  );

export {
  selectImageCrop,
  makeSelectCrop,
  makeSelectPixelCrop,
  makeSelectImageElement,
  makeSelectBase64,
  makeSelectSizes,
};
