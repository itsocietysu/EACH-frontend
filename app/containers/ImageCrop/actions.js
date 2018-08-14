/*
 * ImageCrop Actions
 *
 * To add a new Action:
 * 1) Import your constant
 * 2) Add a function like this:
 *    export function yourAction(var) {
 *        return { type: YOUR_ACTION_CONSTANT, var: var }
 *    }
 */

import { CHANGE_CROP, IMAGE_LOADED, SET_COMPLETE } from './constants';

/**
 * Changes the crop of the image
 *
 * @param  {object} crop The new crop of the image
 * @param  {object} pixelCrop The new pixelCrop of the image
 *
 * @return {object}    An action object with a type of CHANGE_CROP passing the crop and pixelCrop
 */
export function changeCrop(crop, pixelCrop) {
  return {
    type: CHANGE_CROP,
    crop,
    pixelCrop,
  };
}

/**
 * Dispatched when image is loaded by ReactCrop component
 *
 * @param  {object} image The new image of ReactCrop component
 * @param  {object} crop The new crop of the image
 * @param  {object} pixelCrop The new pixelCrop of the image
 * @param  {object} sizes The new limiting sizes of the image
 *
 * @return {object}    An action object with a type of IMAGE_LOADED passing the image, crop, pixelCrop and sizes
 */
export function imageLoaded(image, crop, pixelCrop, sizes) {
  return {
    type: IMAGE_LOADED,
    image,
    crop,
    pixelCrop,
    sizes,
  };
}

/**
 * Set the complete base64
 *
 * @param  {string} base64 The new base64 of complete image
 *
 * @return {object}    An action object with a type of SET_COMPLETE passing the image
 */
export function setComplete(base64) {
  return {
    type: SET_COMPLETE,
    base64,
  };
}
