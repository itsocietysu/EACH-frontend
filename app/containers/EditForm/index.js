/* eslint-disable react/prefer-stateless-function,no-restricted-syntax,no-unused-expressions,react/no-children-prop,no-underscore-dangle */
/*
 *
 * Component with form for editing
 *
 */
import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { URL2Base64, File2Base64 } from '../../toBase64';

import { bigImage, getCroppedMaxImg } from '../ImageCrop';
import PopupImageCrop, { PopupStyle } from '../PopupImageCrop';
import MsgBox from '../../components/MsgBox';
import TextArea from '../../components/TextArea';
import LabelFile from '../../components/LabelFile';
import LabelInput from '../../components/LabelInput';
import SelectSearch from '../SelectSearch';
import Button from '../UserPanel/Button';
import messages from './messages';
import Img from './Img';

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

const isEmpty = (data, settings) => {
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
  if (settings.image) empty.push(!!data.image);
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
          const dataToPost = JSON.parse(JSON.stringify(data));
          if (settings.image) dataToPost.image = crops.image;
          if (isEmpty(dataToPost, settings))
            funcs.onChangeOpenMsg(messages.empty, () => {}, false, () => {
              funcs.onChangeOpenMsg();
            });
          else {
            funcs.onSubmit(dataToPost);
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
    const { item } = props;
    this.state = {
      content: props.settings.content,
      formData: JSON.parse(JSON.stringify(item)),
      crops: {},
      msgData: {
        isOpenMsg: false,
        message: {},
        isCancelMsg: false,
        onSubmit: () => {},
        onClose: () => {},
      },
    };

    this._init = this._init.bind(this);
    this._onChangeData = this._onChangeData.bind(this);
    this._onChangeField = this._onChangeField.bind(this);
    this._onChangeTextLocale = this._onChangeTextLocale.bind(this);
    this._onChangeFile = this._onChangeFile.bind(this);
    this._onChangeCrop = this._onChangeCrop.bind(this);
    this._onChangeNumber = this._onChangeNumber.bind(this);
    this._onChangeOpenMsg = this._onChangeOpenMsg.bind(this);
  }

  _onChangeData(item) {
    this.setState({ formData: item });
  }

  _init(item, settings) {
    if (!settings.image) this._onChangeData(JSON.parse(JSON.stringify(item)));
    else {
      const i = JSON.parse(JSON.stringify(item));
      if (item.image === '/Photo.png') {
        i.image = '';
      } else if (item.image === '') {
        this._onChangeCrop('', 'image');
      } else
        URL2Base64(item.image, res => {
          const base64 = res.replace(/^data:image\/(png|jpg|jpeg);base64,/, '');
          this._onChangeField(base64, 'image');
          this._onChangeCrop(base64, 'image');
        });
      this._onChangeData(i);
    }
  }

  _onChangeTextLocale(evt, locale, field) {
    this.state.formData[field][locale] = evt.target.value;
    this.setState(this.state);
  }

  _onChangeField(data, field) {
    this.state.formData[field] = data;
    this.setState(this.state);
  }

  _onChangeFile(evt, field) {
    if (evt.target.files[0])
      File2Base64(evt.target.files[0], res => {
        bigImage(
          res,
          img => {
            const crop = getCroppedMaxImg(img);
            this._onChangeField(
              res.replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
              field,
            );
            this._onChangeCrop(crop, field);
          },
          () =>
            this._onChangeOpenMsg(
              messages.imageSmall,
              false,
              () => {},
              this.onChangeOpenMsg(),
            ),
        );
      });
  }

  _onChangeCrop(base64, field) {
    if (base64 === null)
      this._onChangeOpenMsg(
        messages.imageSmall,
        false,
        () => {},
        this.onChangeOpenMsg(),
      );
    else {
      this.state.crops[field] = base64;
      this.setState(this.state);
    }
  }

  _onChangeNumber(evt, field, format) {
    switch (format) {
      case 'int':
        this.state.formData[field] = parseInt(evt.target.value, 10).toString(
          10,
        );
        this.setState(this.state);
        break;
      case 'double':
        this.state.formData[field] = evt.target.value;
        this.setState(this.state);
        break;
      default:
        break;
    }
  }

  _onChangeOpenMsg(message, onSubmit, cancel, onClose) {
    this.state.msgData = {
      isOpenMsg: !this.state.msgData.isOpenMsg,
      message,
      isCancelMsg: cancel,
      onSubmit,
      onClose,
    };
    this.setState(this.state);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.content !== this.props.settings.content)
      this._init(this.props.item, this.props.settings);
  }

  render() {
    const { settings } = this.props;
    const { content } = settings;
    const message = this.state.msgData;
    const { crops } = this.state;
    let data = this.state.formData;
    if (content !== this.state.content) {
      this.state.content = content;
      data = {};
    }
    if (Object.keys(data).length === 0) data = this.props.item;
    const images = [];
    const texts = [];
    const localeTexts = [];
    const numbers = [];
    const selects = [];
    const keys = Object.keys(settings);
    const { eid } = this.props.item;
    if (keys.includes('locales')) {
      settings.locales.forEach(localeText => {
        appLocales.forEach(locale => {
          localeTexts.push(
            <TextArea
              key={`${localeText.field}-${eid}-${locale}`}
              name={`${localeText.field}-${eid}-${locale}`}
              value={data[localeText.field][locale]}
              message={messages[localeText.field].locale[locale]}
              rows={localeText.rows}
              maxLength={localeText.maxLength}
              change={evt =>
                this._onChangeTextLocale(evt, locale, localeText.field)
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
            key={`${text.field}-${eid}`}
            name={`${text.field}-${eid}`}
            value={data[text.field]}
            message={messages[text.field]}
            rows={text.rows}
            maxLength={text.maxLength}
            change={evt => this._onChangeField(evt.target.value, text.field)}
            isPlaceholder={this.props.isPlaceholder}
          />,
        );
      });
    }
    if (keys.includes('numbers')) {
      settings.numbers.forEach(number => {
        numbers.push(
          <LabelInput
            key={`${number.field}-${eid}`}
            id={`${number.field}-${eid}`}
            type="number"
            value={data[number.field]}
            change={evt =>
              this._onChangeNumber(evt, number.field, number.format)
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
            key={`select-${select.field}-${eid}`}
            initValue={data[select.field].map(v => ({
              key: v.eid,
              field: v[selectField[select.field]],
            }))}
            renderField={selectField[select.field]}
            requestFunc={value => selectRequest[select.field](value)}
            onChange={value => this._onChangeField(value, select.field)}
          />,
        );
      });
    }
    if (settings.image) {
      images.push(
        <div key={`image-${eid}`}>
          <div style={{ marginBottom: '0.5em' }}>
            {crops.image ? (
              <Img
                src={`data:image/jpeg;base64,${crops.image}`}
                alt={`${eid}`}
              />
            ) : (
              <Img src="/Photo.png" alt={`${eid}`} />
            )}
          </div>
          <div style={{ marginBottom: '0.5em' }}>
            <LabelFile
              id={`file-image-${eid}`}
              change={evt => this._onChangeFile(evt, 'image')}
              accept="image/*"
            />
          </div>
          {crops.image && (
            <div>
              <PopupImageCrop
                src={`data:image/jpeg;base64,${data.image}`}
                styleCrop={ImageCropStyle}
                onSubmit={base64 => this._onChangeCrop(base64, 'image')}
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
            this._init(this.props.item, settings);
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
                  this._onChangeOpenMsg(
                    messages.sure,
                    () => {
                      close();
                    },
                    true,
                    this._onChangeOpenMsg,
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
                  onChangeOpenMsg: this._onChangeOpenMsg,
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
            onChangeOpenMsg: this._onChangeOpenMsg,
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
  item: PropTypes.object,
  settings: PropTypes.object,
  onSubmit: PropTypes.func,
  onClose: PropTypes.func,
};

export default EditForm;
