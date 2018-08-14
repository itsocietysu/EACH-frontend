/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import PropTypes from 'prop-types';
import ReactCrop, { makeAspectCrop, getPixelCrop } from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { File2Base64 } from 'toBase64';

import injectReducer from 'utils/injectReducer';
import { changeCrop, imageLoaded } from './actions';
import { makeSelectCrop, makeSelectSizes } from './selectors';
import reducer from './reducer';

const MIN_IMAGE_SIDE = 256;

export const bigImage = (base64, callback) => {
  const img = new Image();
  img.src = base64;
  img.onload = () => {
    if (
      img.naturalHeight >= MIN_IMAGE_SIDE &&
      img.naturalWidth >= MIN_IMAGE_SIDE
    )
      callback();
  };
};

export async function getCroppedImg(image, pixelCrop, callback) {
  if (
    pixelCrop.height < MIN_IMAGE_SIDE ||
    pixelCrop.width < MIN_IMAGE_SIDE ||
    pixelCrop.width !== pixelCrop.height
  ) {
    callback(null);
    return;
  }
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

  const blob = await new Promise(resolve => {
    canvas.toBlob(file => {
      resolve(file);
    }, 'image/jpeg');
  });
  File2Base64(blob, res =>
    callback(res.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')),
  );
}

export class ImageCrop extends React.Component {
  render() {
    return (
      <div style={this.props.style}>
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
      const minWidth = 25600 / image.naturalWidth;
      const minHeight = 25600 / image.naturalHeight;
      const crop = makeAspectCrop(
        {
          x: (100 - minWidth) / 2,
          y: (100 - minHeight) / 2,
          aspect: 1,
          width: minWidth,
        },
        image.naturalWidth / image.naturalHeight,
      );
      const pixelCrop = getPixelCrop(image, crop);
      dispatch(
        imageLoaded(image, crop, pixelCrop, {
          maxWidth: 102400 / image.naturalWidth,
          maxHeight: 102400 / image.naturalHeight,
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
