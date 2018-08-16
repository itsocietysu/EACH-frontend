/* eslint-disable prettier/prettier,react/prefer-stateless-function,react/no-children-prop */
import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { URL2Base64, File2Base64 } from 'toBase64';

import ImageCrop, { bigImage, getCroppedImg } from 'containers/ImageCrop';
import { makeSelectPixelCrop, makeSelectImageElement } from 'containers/ImageCrop/selectors';
import MsgBox from 'components/MsgBox';
import TextArea from 'components/TextArea';
import LabelFile from 'components/LabelFile';
import LabelInput from 'components/LabelInput';
import Button from 'containers/UserPanel/Button';
import CenteredDiv from 'components/MsgBox/CenteredDiv';
import Close from 'components/MsgBox/Cross';
import BorderTopImage from 'components/MsgBox/Img';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { DAEMON } from 'utils/constants';
import {
  makeSelectText,
  makeSelectTitle,
  makeSelectImage,
  makeSelectPriority,
  makeSelectMessage,
  makeSelectOpenMsg,
} from './selectors';
import messages from './messages';
import Img from './Img';
import {
  changeImg,
  changeTitle,
  changeText,
  changePriority,
  changeData,
  sendData,
  changeOpenMsg,
} from './actions';
import reducer from './reducer';
import saga from './saga';

const PopupStyle = {
  width: '40em',
  padding: '0',
  border: '1px solid rgb(217, 146, 92)',
  borderRadius: '5px',
  maxHeight: '100%',
  overflow: 'auto',
};

const ImageCropStyle = {
  maxWidth: '256px',
  maxHeight: '256px',
  margin: 'auto',
  backgroundColor: 'transparent',
};

class EditForm extends React.Component {
  render() {
    return (
      <Popup
        trigger={this.props.trigger}
        modal
        closeOnDocumentClick
        lockScroll
        contentStyle={PopupStyle}
        onOpen={() => {this.props.init(this.props.item, this.props.mod)}}
      >
        {close => (
          <CenteredDiv>
            <BorderTopImage />
            <Close onClick={close} />
            <form>
              <div style={{ marginBottom: '0.5em' }}>
                {this.props.image ?
                  <ImageCrop
                    image={`data:image/jpeg;base64,${this.props.image}`}
                    style={ImageCropStyle}/>
                  : <Img src="/Photo.png" alt={`Feed-${this.props.item.eid}`}/>
                }
              </div>
              <div style={{ marginBottom: '0.5em' }}>
                <LabelFile id="fileNews" change={this.props.onChangeFile} accept="image/*" />
              </div>
              <LabelInput
                id={`priority-${this.props.item.eid}`}
                type="text"
                value={this.props.priority}
                change={this.props.onChangePriority}
                message={messages.priority}
              />
              <TextArea
                name={`title-${this.props.item.eid}`}
                value={this.props.title}
                message={messages.title}
                rows="2"
                change={this.props.onChangeTitle}
              />
              <TextArea
                name={`text-${this.props.item.eid}`}
                value={this.props.text}
                message={messages.text}
                rows="15"
                change={this.props.onChangeText}
              />
            </form>
            <div>
              <Button
                children={<FormattedMessage {...messages.confirm} />}
                onClick={() => {
                  const base64 = getCroppedImg(this.props.imageByCrop, this.props.pixelCrop);
                  if (base64 === null) {
                    this.props.onChangeOpenMsg(messages.imageSize);
                  } else {
                    this.props.onSubmit(base64);
                    close();
                  }
                }}
              />
              <Button
                children={<FormattedMessage {...messages.close} />}
                onClick={close}
              />
            </div>
            <MsgBox message={this.props.message} open={this.props.isOpenMessage} onSubmit={this.props.onChangeOpenMsg}/>
          </CenteredDiv>
        )}
      </Popup>
    );
  }
}

EditForm.propTypes = {
  trigger: PropTypes.object,
  eid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  image: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
  priority: PropTypes.string,
  item: PropTypes.shape({
    eid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    priority: PropTypes.string,
  }),
  mod: PropTypes.oneOf(['add', 'edit']),
  onChangeUrl: PropTypes.func,
  onChangeFile: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onChangeText: PropTypes.func,
  onChangePriority: PropTypes.func,
  init: PropTypes.func,
  onSubmit: PropTypes.func,
  isOpenMessage: PropTypes.bool,
  message: PropTypes.object,
  onChangeOpenMsg: PropTypes.func,
  imageByCrop: PropTypes.object,
  pixelCrop: PropTypes.object,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeFile: evt => {
      if (evt.target.files[0])
        File2Base64(evt.target.files[0], res => {
          bigImage(res,
            () => dispatch(changeImg(res.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''))),
            () => dispatch(changeOpenMsg(messages.imageSmall))
          );
        });
    },
    onChangeTitle: evt => dispatch(changeTitle(evt.target.value)),
    onChangeText: evt => dispatch(changeText(evt.target.value)),
    onChangePriority: evt => dispatch(changePriority(evt.target.value)),
    init: (item, mod) => {
      if (item.image === '/Photo.png') {
        const i = {};
        Object.keys(item).forEach(k => {if (k === 'image') i[k] = ''; else i[k] = item[k];});
        dispatch(changeData(i, mod));
      } else
        URL2Base64(item.image, res => {
          dispatch(changeData(item, mod));
          if (mod === 'edit')
            dispatch(changeImg(res.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')));
        });
    },
    onChangeOpenMsg: message => dispatch(changeOpenMsg(message)),
    onSubmit: base64 => {
      dispatch(changeImg(base64));
      dispatch(sendData());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  image: makeSelectImage(),
  title: makeSelectTitle(),
  text: makeSelectText(),
  priority: makeSelectPriority(),
  message: makeSelectMessage(),
  isOpenMessage: makeSelectOpenMsg(),
  imageByCrop: makeSelectImageElement(),
  pixelCrop: makeSelectPixelCrop(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editNews', reducer });
const withSaga = injectSaga({ key: 'editNews', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EditForm);
