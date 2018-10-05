/* eslint-disable react/no-children-prop,react/prefer-stateless-function */
/*
 *
 * Popup component for cropping image
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { FormattedMessage } from 'react-intl';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';

import ImageCrop, { getCroppedImg } from '../ImageCrop';
import messages from '../EditDForm/messages';
import Button from '../UserPanel/Button';

import {
  makeSelectPixelCrop,
  makeSelectImageElement,
} from '../ImageCrop/selectors';
import BorderTopImage from '../../components/MsgBox/Img';
import Close from '../../components/MsgBox/Cross';
import CenteredDiv from '../../components/MsgBox/CenteredDiv';

export const PopupStyle = {
  width: '40em',
  padding: '0',
  border: '1px solid rgb(217, 146, 92)',
  borderRadius: '5px',
  maxHeight: '100%',
  overflow: 'auto',
};

export class PopupImageCrop extends React.Component {
  render() {
    const { src, trigger, styleCrop, image, pixelCrop, onSubmit } = this.props;
    return (
      <Popup
        modal
        closeOnDocumentClick
        trigger={trigger}
        lockScroll
        contentStyle={PopupStyle}
      >
        {close => (
          <CenteredDiv>
            <BorderTopImage />
            <Close onClick={close} />
            <ImageCrop image={src} style={styleCrop} />
            <div>
              <Button
                onClick={() => {
                  onSubmit(getCroppedImg(image, pixelCrop));
                  close();
                }}
              >
                <FormattedMessage {...messages.confirm} />
              </Button>
              <Button onClick={close}>
                <FormattedMessage {...messages.close} />
              </Button>
            </div>
          </CenteredDiv>
        )}
      </Popup>
    );
  }
}

PopupImageCrop.propTypes = {
  src: PropTypes.string,
  onSubmit: PropTypes.func,
  styleCrop: PropTypes.object,
  trigger: PropTypes.node,
  pixelCrop: PropTypes.object,
  image: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  pixelCrop: makeSelectPixelCrop(),
  image: makeSelectImageElement(),
});

export default connect(
  mapStateToProps,
  null,
)(PopupImageCrop);
