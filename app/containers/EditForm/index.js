/* eslint-disable react/prefer-stateless-function,react/no-children-prop,no-restricted-syntax,no-unused-expressions */
import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { URL2Base64, File2Base64 } from '../../toBase64';

import ImageCrop, { bigImage, getCroppedImg } from '../ImageCrop';
import {
  makeSelectPixelCrop,
  makeSelectImageElement,
} from '../ImageCrop/selectors';
import MsgBox from '../../components/MsgBox';
import TextArea from '../../components/TextArea';
import LabelFile from '../../components/LabelFile';
import LabelInput from '../../components/LabelInput';
import Button from '../UserPanel/Button';
import CenteredDiv from '../../components/MsgBox/CenteredDiv';
import Close from '../../components/MsgBox/Cross';
import BorderTopImage from '../../components/MsgBox/Img';
import injectReducer from '../../utils/injectReducer';
import injectSaga from '../../utils/injectSaga';
import { DAEMON } from '../../utils/constants';
import { makeSelectFormData, makeSelectMsgData } from './selectors';
import messages from './messages';
import Img from './Img';
import {
  changeImg,
  changeText,
  changePriority,
  changeData,
  sendFeedData,
  sendMuseumData,
  changeOpenMsg,
} from './actions';
import reducer from './reducer';
import saga from './saga';

import { appLocales } from '../../i18n';

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
};

const FeedSet = {
  content: 'Feed',
  title: 'title',
  file: 'fileFeed',
  messages: {
    title: messages.title,
  },
};

const MuseumSet = {
  content: 'Museum',
  title: 'name',
  file: 'fileMuseum',
  messages: {
    title: messages.name,
  },
};

const isEmpty = props => {
  const { data, Feed } = props;
  const { title, text, image, desc, priority } = data;
  const empty = appLocales.map(
    locale =>
      !!(
        !title[locale] ||
        !desc[locale] ||
        (Feed && !text[locale]) ||
        !image ||
        (Feed && !priority)
      ),
  );
  for (const key in empty) {
    if (empty[key]) return true;
  }
  return false;
};

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    if (props.Feed) this.state = FeedSet;
    if (props.Museum) this.state = MuseumSet;
  }
  render() {
    const { data, message } = this.props;
    const { title, text, image, desc, priority } = data;
    const titles = [];
    const texts = [];
    const descs = [];
    appLocales.forEach(locale => {
      titles.push(
        <TextArea
          key={`${this.state.title}-${this.props.item.eid}-${locale}`}
          name={`${this.state.title}-${this.props.item.eid}-${locale}`}
          value={title[locale]}
          message={this.state.messages.title[locale]}
          rows="2"
          change={evt => this.props.onChangeText(evt, locale, 'title')}
        />,
      );
      descs.push(
        <TextArea
          key={`desc-${this.props.item.eid}-${locale}`}
          name={`desc-${this.props.item.eid}-${locale}`}
          value={desc[locale]}
          message={messages.desc[locale]}
          rows="2"
          change={evt => this.props.onChangeText(evt, locale, 'desc')}
        />,
      );
      this.props.Feed &&
        texts.push(
          <TextArea
            key={`text-${this.props.item.eid}-${locale}`}
            name={`text-${this.props.item.eid}-${locale}`}
            value={text[locale]}
            message={messages.text[locale]}
            rows="15"
            change={evt => this.props.onChangeText(evt, locale, 'text')}
          />,
        );
    });
    return (
      <Popup
        trigger={this.props.trigger}
        modal
        closeOnDocumentClick
        lockScroll
        contentStyle={PopupStyle}
        onOpen={() => {
          this.props.init(this.props.item, this.props.mod);
        }}
        onClose={() => {
          this.props.onClose && this.props.onClose();
        }}
      >
        {close => (
          <CenteredDiv>
            <BorderTopImage />
            <Close
              onClick={() =>
                this.props.onChangeOpenMsg(
                  messages.sure,
                  () => {
                    close();
                  },
                  true,
                  () => {
                    this.props.onChangeOpenMsg();
                  },
                )
              }
            />
            <form>
              <div style={{ marginBottom: '0.5em' }}>
                {image ? (
                  <ImageCrop
                    image={`data:image/jpeg;base64,${image}`}
                    style={ImageCropStyle}
                    mod={this.props.mod}
                  />
                ) : (
                  <Img
                    src="/Photo.png"
                    alt={`${this.state.content}-${this.props.item.eid}`}
                  />
                )}
              </div>
              <div style={{ marginBottom: '0.5em' }}>
                <LabelFile
                  id={`${this.state.file}-${this.props.item.eid}`}
                  change={this.props.onChangeFile}
                  accept="image/*"
                />
              </div>
              {this.props.Feed && (
                <LabelInput
                  id={`priority-${this.props.item.eid}`}
                  type="number"
                  value={priority}
                  change={this.props.onChangePriority}
                  message={messages.priority}
                />
              )}
              {titles}
              {descs}
              {this.props.Feed && texts}
            </form>
            <div>
              <Button
                children={<FormattedMessage {...messages.confirm} />}
                onClick={() => {
                  if (isEmpty(this.props))
                    this.props.onChangeOpenMsg(
                      messages.empty,
                      () => {},
                      false,
                      () => {
                        this.props.onChangeOpenMsg();
                      },
                    );
                  else {
                    const base64 = getCroppedImg(
                      this.props.imageByCrop,
                      this.props.pixelCrop,
                    );
                    if (base64 === null) {
                      this.props.onChangeOpenMsg(
                        messages.imageSize,
                        () => {},
                        false,
                        () => {
                          this.props.onChangeOpenMsg();
                        },
                      );
                    } else {
                      this.props.onSubmit(
                        base64,
                        this.props.Feed,
                        this.props.Museum,
                      );
                      close();
                    }
                  }
                }}
              />
              <Button
                children={<FormattedMessage {...messages.close} />}
                onClick={() =>
                  this.props.onChangeOpenMsg(
                    messages.sure,
                    () => {
                      close();
                    },
                    true,
                    () => {
                      this.props.onChangeOpenMsg();
                    },
                  )
                }
              />
            </div>
            <MsgBox
              message={message.message}
              open={message.isOpenMsg}
              onSubmit={message.onSubmit}
              cancel={message.isCancelMsg}
              onClose={message.onClose}
            />
          </CenteredDiv>
        )}
      </Popup>
    );
  }
}

EditForm.propTypes = {
  trigger: PropTypes.object,
  data: PropTypes.object,
  item: PropTypes.object,
  mod: PropTypes.oneOf(['add', 'edit']),
  onChangeFile: PropTypes.func,
  onChangeText: PropTypes.func,
  onChangePriority: PropTypes.func,
  init: PropTypes.func,
  onSubmit: PropTypes.func,
  message: PropTypes.object,
  onChangeOpenMsg: PropTypes.func,
  imageByCrop: PropTypes.object,
  pixelCrop: PropTypes.object,
  Feed: PropTypes.bool,
  Museum: PropTypes.bool,
  onClose: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeFile: evt => {
      if (evt.target.files[0])
        File2Base64(evt.target.files[0], res => {
          bigImage(
            res,
            () =>
              dispatch(
                changeImg(
                  res.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
                ),
              ),
            () => dispatch(changeOpenMsg(messages.imageSmall)),
          );
        });
    },
    onChangeText: (evt, locale, field) =>
      dispatch(changeText(evt.target.value, locale, field)),
    onChangePriority: evt => dispatch(changePriority(evt.target.value)),
    init: (item, mod) => {
      if (item.image === '/Photo.png') {
        const i = {};
        Object.keys(item).forEach(k => {
          if (k === 'image') i[k] = '';
          else i[k] = item[k];
        });
        dispatch(changeData(i, mod));
      } else
        URL2Base64(item.image, res => {
          dispatch(changeData(item, mod));
          if (mod === 'edit')
            dispatch(
              changeImg(res.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')),
            );
        });
    },
    onChangeOpenMsg: (message, onSubmit, cancel, onClose) =>
      dispatch(changeOpenMsg(message, cancel, onSubmit, onClose)),
    onSubmit: (base64, Feed, Museum) => {
      dispatch(changeImg(base64));
      if (Feed) dispatch(sendFeedData());
      if (Museum) dispatch(sendMuseumData());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectFormData(),
  message: makeSelectMsgData(),
  imageByCrop: makeSelectImageElement(),
  pixelCrop: makeSelectPixelCrop(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editForm', reducer });
const withSaga = injectSaga({ key: 'editForm', saga, mode: DAEMON });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EditForm);
