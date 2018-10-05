/* eslint-disable react/prefer-stateless-function,no-param-reassign */
/*
 *
 * Component for cropping image
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import ReactCrop, { makeAspectCrop, getPixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from '../../utils/injectReducer';
import { changeCrop, imageLoaded } from './actions';
import { makeSelectCrop, makeSelectSizes } from './selectors';
import reducer from './reducer';

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

export function getCroppedImg(image, pixelCrop) {
  if (
    pixelCrop.width !== pixelCrop.height &&
    Math.abs(pixelCrop.width - pixelCrop.height) === 1
  ) {
    pixelCrop.width = Math.min(pixelCrop.width, pixelCrop.height);
    pixelCrop.height = Math.min(pixelCrop.width, pixelCrop.height);
  }
  if (
    pixelCrop.height < MIN_IMAGE_SIDE ||
    pixelCrop.width < MIN_IMAGE_SIDE ||
    pixelCrop.width !== pixelCrop.height
  )
    return null;
  if (
    pixelCrop.width === image.naturalWidth &&
    pixelCrop.height === image.naturalHeight
  )
    return image.src.replace(/^data:image\/jpeg;base64,/, '');
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

  const base64 = canvas.toDataURL('image/jpeg');
  return base64.replace(/^data:image\/jpeg;base64,/, '');
}

export function getCroppedMaxImg(image) {
  if (
    image.naturalWidth === MAX_IMAGE_SIDE &&
    image.naturalHeight === MAX_IMAGE_SIDE
  )
    return image.src.replace(/^data:image\/jpeg;base64,/, '');
  let width = Math.min(100, (MAX_IMAGE_SIDE * 100) / image.naturalWidth);
  let height = Math.min(100, (MAX_IMAGE_SIDE * 100) / image.naturalHeight);
  if (height === 100 && width !== 100)
    width = (image.naturalHeight * 100) / image.naturalWidth;
  if (width === 100 && height !== 100)
    height = (image.naturalWidth * 100) / image.naturalHeight;
  const crop = makeAspectCrop(
    {
      x: (100 - width) / 2,
      y: (100 - height) / 2,
      aspect: 1,
      width,
    },
    image.naturalWidth / image.naturalHeight,
  );
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

  const base64 = canvas.toDataURL('image/jpeg');
  return base64.replace(/^data:image\/jpeg;base64,/, '');
}

export class ImageCrop extends React.Component {
  render() {
    return (
      <div>
        {this.props.image && (
          <ReactCrop
            src={this.props.image}
            crop={this.props.crop}
            onImageLoaded={image => this.props.onImageLoaded(image)}
            onChange={(crop, pixelCrop) =>
              this.props.onCropChange(crop, pixelCrop)
            }
            maxWidth={this.props.sizes.maxWidth}
            minWidth={this.props.sizes.minWidth}
            maxHeight={this.props.sizes.maxHeight}
            minHeight={this.props.sizes.minHeight}
            style={this.props.style}
          />
        )}
      </div>
    );
  }
}

ImageCrop.propTypes = {
  image: PropTypes.string,
  style: PropTypes.object,
  onImageLoaded: PropTypes.func,
  onCropChange: PropTypes.func,
  crop: PropTypes.object,
  sizes: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onImageLoaded: image => {
      const minWidth = (MIN_IMAGE_SIDE * 100) / image.naturalWidth;
      const minHeight = (MIN_IMAGE_SIDE * 100) / image.naturalHeight;
      const maxWidth = (MAX_IMAGE_SIDE * 100) / image.naturalWidth;
      const maxHeight = (MAX_IMAGE_SIDE * 100) / image.naturalHeight;
      let width = Math.min(100, maxWidth);
      let height = Math.min(100, maxHeight);
      if (height === 100 && width !== 100)
        width = (image.naturalHeight * 100) / image.naturalWidth;
      if (width === 100 && height !== 100)
        height = (image.naturalWidth * 100) / image.naturalHeight;
      const crop = makeAspectCrop(
        {
          x: (100 - width) / 2,
          y: (100 - height) / 2,
          aspect: 1,
          width,
        },
        image.naturalWidth / image.naturalHeight,
      );
      const pixelCrop = getPixelCrop(image, crop);
      dispatch(
        imageLoaded(image, crop, pixelCrop, {
          maxWidth,
          maxHeight,
          minWidth,
          minHeight,
        }),
      );
    },
    onCropChange: (crop, pixelCrop) => dispatch(changeCrop(crop, pixelCrop)),
  };
}

const mapStateToProps = createStructuredSelector({
  crop: makeSelectCrop(),
  sizes: makeSelectSizes(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'imageCrop', reducer });

export default compose(
  withReducer,
  withConnect,
)(ImageCrop);
