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
import SelectSearch from '../SelectSearch';
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
  changeField,
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
import './index.css';

import { selectField, selectRequest } from './configs';

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
  if (keys.includes('selects')) {
    let res = true;
    settings.selects.forEach(select => {
      res = res && !!data[select.field].length;
    });
    empty.push(res);
  }
  if (settings.image) empty.push(!!crops.image);
  for (const key in empty) {
    if (!empty[key]) return true;
  }
  return false;
};

const Form = ({
  images,
  selects,
  texts,
  localeTexts,
  numbers,
  funcs,
  message,
  data,
  crops,
  settings,
  flexDirection,
}) => (
  <div className={`editForm-${flexDirection}`}>
    <form>
      {images}
      {numbers}
      {selects}
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
  selects: PropTypes.array,
  texts: PropTypes.array,
  localeTexts: PropTypes.array,
  numbers: PropTypes.array,
  funcs: PropTypes.object,
  message: PropTypes.object,
  data: PropTypes.object,
  crops: PropTypes.object,
  settings: PropTypes.object,
  flexDirection: PropTypes.oneOf(['column', 'row']),
};

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    const { emptyItem, settings, mod } = props;
    props.init(emptyItem, mod, settings);
    this.state = { content: props.settings.content };
  }
  componentWillUnmount() {
    this.props.onUnmount();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.settings.content !== this.props.settings.content)
      this.props.init(
        this.props.emptyItem,
        this.props.mod,
        this.props.settings,
      );
  }
  render() {
    const { crops, message, settings } = this.props;
    const { content } = settings;
    let { data } = this.props;
    if (content !== this.state.content) {
      this.state.content = content;
      data = {};
    }
    if (Object.keys(data).length === 0) data = this.props.emptyItem;
    const images = [];
    const texts = [];
    const localeTexts = [];
    const numbers = [];
    const selects = [];
    const keys = Object.keys(settings);
    if (keys.includes('locales')) {
      settings.locales.forEach(localeText => {
        appLocales.forEach(locale => {
          localeTexts.push(
            <TextArea
              key={`${localeText.field}-${this.props.item.eid}-${locale}`}
              name={`${localeText.field}-${this.props.item.eid}-${locale}`}
              value={data[localeText.field][locale]}
              message={messages[localeText.field].locale[locale]}
              rows={localeText.rows}
              maxLength={localeText.maxLength}
              change={evt =>
                this.props.onChangeTextLocale(evt, locale, localeText.field)
              }
              isPlaceholder={this.props.isPlaceholder}
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
            maxLength={text.maxLength}
            change={evt =>
              this.props.onChangeField(evt.target.value, text.field)
            }
            isPlaceholder={this.props.isPlaceholder}
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
            isPlaceholder={this.props.isPlaceholder}
          />,
        );
      });
    }
    if (keys.includes('selects')) {
      settings.selects.forEach(select => {
        selects.push(
          <SelectSearch
            key={`select-${select.field}-${this.props.item.eid}`}
            initValue={data[select.field].map(v => ({
              key: v.eid,
              field: v[selectField[select.field]],
            }))}
            renderField={selectField[select.field]}
            requestFunc={value => selectRequest[select.field](value)}
            onChange={value => this.props.onChangeField(value, select.field)}
          />,
        );
      });
    }
    if (settings.image) {
      images.push(
        <div key={`image-${this.props.item.eid}`}>
          <div style={{ marginBottom: '0.5em' }}>
            {crops.image ? (
              <Img
                src={`data:image/jpeg;base64,${crops.image}`}
                alt={`${this.props.item.eid}`}
              />
            ) : (
              <Img src="/Photo.png" alt={`${this.props.item.eid}`} />
            )}
          </div>
          <div style={{ marginBottom: '0.5em' }}>
            <LabelFile
              id={`file-image-${this.props.item.eid}`}
              change={evt => this.props.onChangeFile(evt, 'image')}
              accept="image/*"
            />
          </div>
          {crops.image && (
            <div>
              <PopupImageCrop
                src={`data:image/jpeg;base64,${data.image}`}
                styleCrop={ImageCropStyle}
                onSubmit={base64 => this.props.onChangeCrop(base64, 'image')}
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
            <div className={`editForm-${this.props.flexDirection}`}>
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
                selects={selects}
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
                flexDirection={this.props.flexDirection}
              />
            </div>
          )}
        </Popup>
      );
    return (
      <div className={`editDForm-${this.props.flexDirection}`}>
        <Form
          images={images}
          selects={selects}
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
          flexDirection={this.props.flexDirection}
        />
      </div>
    );
  }
}

EditForm.propTypes = {
  isPopup: PropTypes.bool,
  isPlaceholder: PropTypes.bool,
  flexDirection: PropTypes.oneOf(['column', 'row']),
  trigger: PropTypes.object,
  data: PropTypes.object,
  crops: PropTypes.object,
  item: PropTypes.object,
  emptyItem: PropTypes.object,
  settings: PropTypes.object,
  mod: PropTypes.oneOf(['add', 'edit']),
  onChangeFile: PropTypes.func,
  onChangeTextLocale: PropTypes.func,
  onChangeField: PropTypes.func,
  onChangeNumber: PropTypes.func,
  onChangeCrop: PropTypes.func,
  init: PropTypes.func,
  onSubmit: PropTypes.func,
  message: PropTypes.object,
  onChangeOpenMsg: PropTypes.func,
  onClose: PropTypes.func,
  onUnmount: PropTypes.func,
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
    onChangeField: (data, field) => dispatch(changeField(data, field)),
    onChangeNumber: (evt, field, format) =>
      dispatch(changeNumber(evt.target.value, field, format)),
    init: (item, mod, settings) => {
      if (!settings.image) dispatch(changeData(item, mod));
      else {
        const i = Object.assign({}, item);
        if (item.image === '/Photo.png') {
          i.image = '';
        } else if (item.image === '') {
          dispatch(changeCrop('', 'image'));
        } else
          URL2Base64(item.image, res => {
            const base64 = res.replace(
              /^data:image\/(png|jpg|jpeg);base64,/,
              '',
            );
            dispatch(changeImg(base64, 'image'));
            dispatch(changeCrop(base64, 'image'));
          });
        dispatch(changeData(i, mod));
      }
    },
    onChangeOpenMsg: (message, onSubmit, cancel, onClose) =>
      dispatch(changeOpenMsg(message, cancel, onSubmit, onClose)),
    onUnmount: () => dispatch(changeData({}, 'add')),
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

const withReducer = injectReducer({ key: 'editForm', reducer });

export default compose(
  withReducer,
  withConnect,
)(EditForm);
