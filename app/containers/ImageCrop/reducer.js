/*
 * ImageCropReducer
 *
 * Example:
 * case YOUR_ACTION_CONSTANT:
 *   return state.set('yourStateVariable', true);
 */

import { fromJS } from 'immutable';

import { CHANGE_CROP, IMAGE_LOADED } from './constants';

export const initialState = fromJS({
  crop: {
    x: 10,
    y: 10,
    width: 80,
    height: 80,
    aspect: 1,
  },
  pixelCrop: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  },
  sizes: {
    maxWidth: 100,
    maxHeight: 100,
    minWidth: 0,
    minHeight: 0,
  },
  image: null,
});

function imageCropReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CROP:
      return state.set('crop', action.crop).set('pixelCrop', action.pixelCrop);
    case IMAGE_LOADED:
      return state
        .set('crop', action.crop)
        .set('pixelCrop', action.pixelCrop)
        .set('sizes', action.sizes)
        .set('image', action.image);
    default:
      return state;
  }
}

export default imageCropReducer;
