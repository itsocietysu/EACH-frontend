/* eslint-disable react/prefer-stateless-function,no-restricted-syntax,no-unused-expressions,react/no-children-prop */
/*
 *
 * Component with form for editing
 *
 */
import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { URL2Base64, File2Base64 } from '../../toBase64';

import { bigImage, getCroppedMaxImg } from '../ImageCrop';
import PopupImageCrop, { PopupStyle } from '../PopupImageCrop';
import MsgBox from '../../components/MsgBox';
import TextArea from '../../components/TextArea';
import LabelFile from '../../components/LabelFile';
import LabelInput from '../../components/LabelInput';
import Button from '../UserPanel/Button';
import injectReducer from '../../utils/injectReducer';
import {
  makeSelectFormData,
  makeSelectMsgData,
  makeSelectCrop,
} from './selectors';
import messages from './messages';
import Img from './Img';
import {
  changeImg,
  changeText,
  changeNumber,
  changeData,
  changeOpenMsg,
  changeTextLocale,
  changeCrop,
} from './actions';
import reducer from './reducer';

import { appLocales } from '../../i18n';
import BorderTopImage from '../../components/MsgBox/Img';
import Close from '../../components/MsgBox/Cross';
import CenteredDiv from '../../components/MsgBox/CenteredDiv';

const ImageCropStyle = {
  maxWidth: '256px',
  maxHeight: '256px',
  margin: 'auto',
};

const isEmpty = (data, crops, settings) => {
  let empty = [];
  const keys = Object.keys(settings);
  if (keys.includes('locales'))
    empty = empty.concat(
      appLocales.map(locale => {
        let res = true;
        settings.locales.forEach(localeText => {
          res = res && !!data[localeText.field][locale];
        });
        return res;
      }),
    );
  if (keys.includes('texts')) {
    let res = true;
    settings.texts.forEach(text => {
      res = res && !!data[text.field];
    });
    empty.push(res);
  }
  if (keys.includes('numbers')) {
    let res = true;
    settings.numbers.forEach(number => {
      res = res && !!data[number.field];
    });
    empty.push(res);
  }
  if (keys.includes('images')) {
    let res = true;
    settings.images.forEach(image => {
      res = res && !!crops[image.field];
    });
    empty.push(res);
  }
  for (const key in empty) {
    if (!empty[key]) return true;
  }
  return false;
};

const Form = ({
  images,
  texts,
  localeTexts,
  numbers,
  funcs,
  message,
  data,
  crops,
  settings,
}) => (
  <div>
    <form>
      {images}
      {numbers}
      {localeTexts}
      {texts}
    </form>
    <div>
      <Button
        onClick={() => {
          if (isEmpty(data, crops, settings))
            funcs.onChangeOpenMsg(messages.empty, () => {}, false, () => {
              funcs.onChangeOpenMsg();
            });
          else {
            funcs.onSubmit();
            funcs.close && funcs.close();
          }
        }}
      >
        <FormattedMessage {...messages.confirm} />
      </Button>
      {funcs.close && (
        <Button
          onClick={() =>
            funcs.onChangeOpenMsg(
              messages.sure,
              () => {
                funcs.close();
              },
              true,
              funcs.onChangeOpenMsg,
            )
          }
        >
          <FormattedMessage {...messages.close} />
        </Button>
      )}
    </div>
    <MsgBox
      message={message.message}
      open={message.isOpenMsg}
      onSubmit={message.onSubmit}
      cancel={message.isCancelMsg}
      onClose={message.onClose}
    />
  </div>
);

Form.propTypes = {
  images: PropTypes.array,
  texts: PropTypes.array,
  localeTexts: PropTypes.array,
  numbers: PropTypes.array,
  funcs: PropTypes.object,
  message: PropTypes.object,
  data: PropTypes.object,
  crops: PropTypes.object,
  settings: PropTypes.object,
};

class EditDForm extends React.Component {
  constructor(props) {
    super(props);
    const { settings } = props;
    const item = {};
    const keys = Object.keys(settings);
    if (keys.includes('locales'))
      settings.locales.forEach(localeText => {
        item[localeText.field] = {};
        appLocales.forEach(locale => {
          item[localeText.field][locale] = '';
        });
      });
    if (keys.includes('texts'))
      settings.texts.forEach(text => {
        item[text.field] = '';
      });
    if (keys.includes('numbers'))
      settings.numbers.forEach(number => {
        item[number.field] = 0;
      });
    if (keys.includes('images'))
      settings.images.forEach(image => {
        item[image.field] = '';
      });
    this.state = { item };
    props.init(item, props.mod, settings);
  }
  render() {
    const { crops, message, settings } = this.props;
    const data =
      Object.keys(this.props.data).length === 0
        ? this.state.item
        : this.props.data;
    const images = [];
    const texts = [];
    const localeTexts = [];
    const numbers = [];
    const keys = Object.keys(settings);
    if (keys.includes('locales')) {
      settings.locales.forEach(localeText => {
        appLocales.forEach(locale => {
          localeTexts.push(
            <TextArea
              key={`${localeText.field}-${this.props.item.eid}-${locale}`}
              name={`${localeText.field}-${this.props.item.eid}-${locale}`}
              value={data[localeText.field][locale]}
              message={messages[localeText.field][locale]}
              rows={localeText.rows}
              change={evt =>
                this.props.onChangeTextLocale(evt, locale, localeText.field)
              }
            />,
          );
        });
      });
    }
    if (keys.includes('texts')) {
      settings.texts.forEach(text => {
        texts.push(
          <TextArea
            key={`${text.field}-${this.props.item.eid}`}
            name={`${text.field}-${this.props.item.eid}`}
            value={data[text.field]}
            message={messages[text.field]}
            rows={text.rows}
            change={evt => this.props.onChangeText(evt, text.field)}
          />,
        );
      });
    }
    if (keys.includes('numbers')) {
      settings.numbers.forEach(number => {
        numbers.push(
          <LabelInput
            key={`${number.field}-${this.props.item.eid}`}
            id={`${number.field}-${this.props.item.eid}`}
            type="number"
            value={data[number.field]}
            change={evt =>
              this.props.onChangeNumber(evt, number.field, number.format)
            }
            message={messages[number.field]}
          />,
        );
      });
    }
    if (keys.includes('images')) {
      settings.images.forEach(image => {
        images.push(
          <div key={`${image.field}-${this.props.item.eid}`}>
            <div style={{ marginBottom: '0.5em' }}>
              {crops[image.field] ? (
                <Img
                  src={`data:image/jpeg;base64,${crops[image.field]}`}
                  alt={`${this.props.item.eid}`}
                />
              ) : (
                <Img src="/Photo.png" alt={`${this.props.item.eid}`} />
              )}
            </div>
            <div style={{ marginBottom: '0.5em' }}>
              <LabelFile
                id={`file-${image.field}-${this.props.item.eid}`}
                change={evt => this.props.onChangeFile(evt, image.field)}
                accept="image/*"
              />
            </div>
            {crops[image.field] && (
              <div>
                <PopupImageCrop
                  src={`data:image/jpeg;base64,${data[image.field]}`}
                  styleCrop={ImageCropStyle}
                  onSubmit={base64 =>
                    this.props.onChangeCrop(base64, image.field)
                  }
                  trigger={
                    <Button type="button" style={{ margin: '0.5em' }}>
                      <FormattedMessage {...messages.crop} />
                    </Button>
                  }
                />
              </div>
            )}
          </div>,
        );
      });
    }
    if (this.props.isPopup)
      return (
        <Popup
          trigger={this.props.trigger}
          modal
          closeOnDocumentClick
          lockScroll
          contentStyle={PopupStyle}
          onOpen={() => {
            this.props.init(this.props.item, this.props.mod, settings);
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
                    this.props.onChangeOpenMsg,
                  )
                }
              />
              <Form
                images={images}
                texts={texts}
                localeTexts={localeTexts}
                message={message}
                numbers={numbers}
                funcs={{
                  close,
                  onChangeOpenMsg: this.props.onChangeOpenMsg,
                  onSubmit: this.props.onSubmit,
                }}
                data={data}
                crops={crops}
                settings={settings}
              />
            </CenteredDiv>
          )}
        </Popup>
      );
    return (
      <Form
        images={images}
        texts={texts}
        localeTexts={localeTexts}
        message={message}
        numbers={numbers}
        funcs={{
          onChangeOpenMsg: this.props.onChangeOpenMsg,
          onSubmit: this.props.onSubmit,
        }}
        data={data}
        crops={crops}
        settings={settings}
      />
    );
  }
}

EditDForm.propTypes = {
  isPopup: PropTypes.bool,
  trigger: PropTypes.object,
  data: PropTypes.object,
  crops: PropTypes.object,
  item: PropTypes.object,
  settings: PropTypes.object,
  mod: PropTypes.oneOf(['add', 'edit']),
  onChangeFile: PropTypes.func,
  onChangeText: PropTypes.func,
  onChangeTextLocale: PropTypes.func,
  onChangeNumber: PropTypes.func,
  onChangeCrop: PropTypes.func,
  init: PropTypes.func,
  onSubmit: PropTypes.func,
  message: PropTypes.object,
  onChangeOpenMsg: PropTypes.func,
  onClose: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeFile: (evt, field) => {
      if (evt.target.files[0])
        File2Base64(evt.target.files[0], res => {
          bigImage(
            res,
            img => {
              const crop = getCroppedMaxImg(img);
              dispatch(
                changeImg(
                  res.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
                  field,
                ),
              );
              dispatch(changeCrop(crop, field));
            },
            () =>
              dispatch(
                changeOpenMsg(
                  messages.imageSmall,
                  false,
                  () => {},
                  this.onChangeOpenMsg(),
                ),
              ),
          );
        });
    },
    onChangeCrop: (base64, field) => {
      if (base64 === null)
        dispatch(
          changeOpenMsg(
            messages.imageSmall,
            false,
            () => {},
            this.onChangeOpenMsg(),
          ),
        );
      else dispatch(changeCrop(base64, field));
    },
    onChangeTextLocale: (evt, locale, field) =>
      dispatch(changeTextLocale(evt.target.value, locale, field)),
    onChangeText: (evt, field) => dispatch(changeText(evt.target.value, field)),
    onChangeNumber: (evt, field, format) =>
      dispatch(changeNumber(evt.target.value, field, format)),
    init: (item, mod, settings) => {
      const keys = Object.keys(settings);
      if (!keys.includes('images')) dispatch(changeData(item, mod));
      else {
        const i = Object.assign({}, item);
        settings.images.forEach(image => {
          if (item[image.field] === '/Photo.png') {
            i[image.field] = '';
          } else if (item[image.field] === '') {
            dispatch(changeCrop('', image.field));
          } else
            URL2Base64(item[image.field], res => {
              const base64 = res.replace(
                /^data:image\/(png|jpg|jpeg);base64,/,
                '',
              );
              dispatch(changeImg(base64, image.field));
              dispatch(changeCrop(base64, image.field));
            });
        });
        dispatch(changeData(i, mod));
      }
    },
    onChangeOpenMsg: (message, onSubmit, cancel, onClose) =>
      dispatch(changeOpenMsg(message, cancel, onSubmit, onClose)),
  };
}

const mapStateToProps = createStructuredSelector({
  data: makeSelectFormData(),
  message: makeSelectMsgData(),
  crops: makeSelectCrop(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editDForm', reducer });

export default compose(
  withReducer,
  withConnect,
)(EditDForm);
