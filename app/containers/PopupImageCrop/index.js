/* eslint-disable react/no-children-prop,react/prefer-stateless-function,no-underscore-dangle */
/*
 *
 * Popup component for cropping image
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import Popup from 'reactjs-popup';
import { FormattedMessage } from 'react-intl';

import ImageCrop from '../ImageCrop';
import messages from '../EditForm/messages';
import Button from '../UserPanel/Button';

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
  constructor(props) {
    super(props);
    this.state = { cropRef: React.createRef() };
  }

  render() {
    const { src, aspect, trigger, styleCrop, onSubmit } = this.props;
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
            <ImageCrop
              image={src}
              aspect={aspect}
              style={styleCrop}
              ref={this.state.cropRef}
            />
            <div>
              <Button
                onClick={() => {
                  onSubmit(this.state.cropRef.current._getResult());
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
  aspect: PropTypes.number,
  onSubmit: PropTypes.func,
  styleCrop: PropTypes.object,
  trigger: PropTypes.node,
};

export default PopupImageCrop;
