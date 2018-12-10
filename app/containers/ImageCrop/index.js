/* eslint-disable react/prefer-stateless-function,no-param-reassign,no-underscore-dangle */
/*
 *
 * Component for cropping image
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactCrop, { getPixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const MIN_IMAGE_SIDE = 256;
const MAX_IMAGE_SIDE = 1024;

export const bigImage = (base64, callback, callbackSmall) => {
  const img = new Image();
  img.src = base64;
  img.onload = () => {
    if (
      img.naturalHeight >= MIN_IMAGE_SIDE &&
      img.naturalWidth >= MIN_IMAGE_SIDE
    )
      callback(img);
    else callbackSmall();
  };
};

function getPixelCropComplete(pixelCrop, ratio) {
  const { width, height } = pixelCrop;
  const cropRatio = Math.max(width, height) / Math.min(width, height);
  if (cropRatio <= ratio) return;
  const newT = Math.floor(Math.min(width, height) * ratio);
  if (width > height) pixelCrop.width = newT;
  else pixelCrop.height = newT;
}

export function getCroppedImg(image, pixelCrop, ratio) {
  getPixelCropComplete(pixelCrop, ratio);
  if (pixelCrop.height < MIN_IMAGE_SIDE || pixelCrop.width < MIN_IMAGE_SIDE)
    return null;
  if (
    pixelCrop.width === image.naturalWidth &&
    pixelCrop.height === image.naturalHeight
  )
    return image.src;
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return canvas.toDataURL('image/jpeg');
}

function getMaxCrop(image, ratio) {
  const width = Math.min(
    (Math.min(ratio * image.naturalHeight, MAX_IMAGE_SIDE) * 100) /
      image.naturalWidth,
    100,
  );
  const height = Math.min(
    (Math.min(ratio * image.naturalWidth, MAX_IMAGE_SIDE) * 100) /
      image.naturalHeight,
    100,
  );
  return {
    x: (100 - width) / 2,
    y: (100 - height) / 2,
    width,
    height,
  };
}

export function getCroppedMaxImg(image, ratio) {
  if (
    image.naturalWidth === MAX_IMAGE_SIDE &&
    image.naturalWidth === image.naturalHeight
  )
    return image.src;
  const crop = getMaxCrop(image, ratio);
  const pixelCrop = getPixelCrop(image, crop);
  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext('2d');

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height,
  );

  return canvas.toDataURL('image/jpeg');
}

export class ImageCrop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crop: {
        x: 10,
        y: 10,
        width: 80,
        height: 80,
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
    };

    this._onImageLoaded = this._onImageLoaded.bind(this);
    this._onCropChange = this._onCropChange.bind(this);
    this._onCropComplete = this._onCropComplete.bind(this);
    this._getResult = this._getResult.bind(this);
  }

  _getResult() {
    return getCroppedImg(
      this.state.image,
      this.state.pixelCrop,
      this.props.ratio,
    );
  }

  _onImageLoaded(image) {
    const minWidth = (MIN_IMAGE_SIDE * 100) / image.naturalWidth;
    const minHeight = (MIN_IMAGE_SIDE * 100) / image.naturalHeight;
    const maxWidth = (MAX_IMAGE_SIDE * 100) / image.naturalWidth;
    const maxHeight = (MAX_IMAGE_SIDE * 100) / image.naturalHeight;
    const { ratio } = this.props;
    const crop = getMaxCrop(image, ratio);
    const pixelCrop = getPixelCrop(image, crop);
    this.setState({
      crop,
      pixelCrop,
      sizes: {
        maxWidth,
        maxHeight,
        minWidth,
        minHeight,
      },
      image,
    });
  }

  _onCropChange(crop, pixelCrop) {
    const { state } = this;
    state.crop = crop;
    state.pixelCrop = pixelCrop;
    this.setState(state);
  }

  _onCropComplete(crop, pixelCrop) {
    const { state } = this;
    getPixelCropComplete(pixelCrop, this.props.ratio);
    crop.width = (pixelCrop.width / state.image.naturalWidth) * 100;
    crop.height = (pixelCrop.height / state.image.naturalHeight) * 100;
    state.crop = crop;
    state.pixelCrop = pixelCrop;
    this.setState(state);
  }

  render() {
    return (
      <div>
        {this.props.image && (
          <ReactCrop
            src={this.props.image}
            crop={this.state.crop}
            onImageLoaded={image => this._onImageLoaded(image)}
            onChange={(crop, pixelCrop) => this._onCropChange(crop, pixelCrop)}
            maxWidth={this.state.sizes.maxWidth}
            minWidth={this.state.sizes.minWidth}
            maxHeight={this.state.sizes.maxHeight}
            minHeight={this.state.sizes.minHeight}
            style={this.props.style}
            onComplete={(crop, pixelCrop) =>
              this._onCropComplete(crop, pixelCrop)
            }
          />
        )}
      </div>
    );
  }
}

ImageCrop.propTypes = {
  image: PropTypes.string,
  ratio: PropTypes.number,
  style: PropTypes.object,
};

export default ImageCrop;
