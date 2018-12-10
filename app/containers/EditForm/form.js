/* eslint-disable react/prefer-stateless-function,no-restricted-syntax,no-unused-expressions,react/no-children-prop,no-underscore-dangle */
/*
 *
 * Component with form for editing
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { URL2Base64, File2Base64 } from '../../toBase64';

import { bigImage, getCroppedMaxImg } from '../ImageCrop';
import PopupImageCrop from '../PopupImageCrop';
import MsgBox from '../../components/MsgBox';
import TextArea from '../../components/TextArea';
import LabelFile from '../../components/LabelFile';
import LabelInput from '../../components/LabelInput';
import SelectSearch from '../SelectSearch';
import SelectTag from '../SelectTag';
import Button from '../../components/MsgBox/Button';
import messages from './messages';
import Img from './Img';

import { appLocales } from '../../i18n';
import './index.css';
import SelectSimple from '../SelectSimple';
import { BASE64_RE } from '../../utils/utils';

import {
  onCloseForm,
  onEmptyForm,
  onChangeOpenMessage,
  emptyFunc,
  emptyMessage,
} from './create-form';

const ImageCropStyle = {
  maxWidth: '256px',
  maxHeight: '256px',
  margin: 'auto',
};

const isEmpty = (data, description) => {
  let empty = [];
  const keys = Object.keys(description);
  if (keys.includes('locales'))
    empty = empty.concat(
      appLocales.map(locale => {
        let res = true;
        description.locales.forEach(localeText => {
          res = res && !!data[localeText.field][locale];
        });
        return res;
      }),
    );
  if (keys.includes('texts')) {
    let res = true;
    description.texts.forEach(text => {
      res = res && !!data[text.field];
    });
    empty.push(res);
  }
  if (keys.includes('numbers')) {
    let res = true;
    description.numbers.forEach(number => {
      res = res && !!data[number.field];
    });
    empty.push(res);
  }
  if (keys.includes('req_selects')) {
    let res = true;
    description.req_selects.forEach(select => {
      res = res && !!data[select.field].length;
    });
    empty.push(res);
  }
  if (keys.includes('tag_selects')) {
    let res = true;
    description.tag_selects.forEach(select => {
      res = res && !!data[select.field_from].length && !!data[select.field_to];
    });
    empty.push(res);
  }
  if (keys.includes('tags')) {
    let res = true;
    description.tags.forEach(select => {
      res = res && !!data[select.field].length;
    });
    empty.push(res);
  }
  if (keys.includes('images')) {
    let res = true;
    description.images.forEach(image => {
      res = res && !!data[image.field];
    });
    empty.push(res);
  }
  for (const key in empty) {
    if (!empty[key]) return true;
  }
  return false;
};

const fontStyle = { fontFamily: 'MurraySlab' };

class Form extends React.Component {
  constructor(props) {
    super(props);
    const { item, settings } = props;
    let formData;
    if (item) formData = JSON.parse(JSON.stringify(item));
    else formData = JSON.parse(JSON.stringify(settings.empty));
    this.state = {
      name: props.settings.name,
      formData,
      crops: {},
      msgData: emptyMessage,
    };

    this._init = this._init.bind(this);
    this._onChangeData = this._onChangeData.bind(this);
    this._onChangeField = this._onChangeField.bind(this);
    this._onChangeTextLocale = this._onChangeTextLocale.bind(this);
    this._onChangeFile = this._onChangeFile.bind(this);
    this._onChangeCrop = this._onChangeCrop.bind(this);
    this._onChangeNumber = this._onChangeNumber.bind(this);
    this._onChangeOpenMsg = this._onChangeOpenMsg.bind(this);
    this._onSubmit = this._onSubmit.bind(this);
    this._onClose = this._onClose.bind(this);
  }

  _onChangeData(item) {
    this.setState({ formData: item });
  }

  _init() {
    const { item, settings } = this.props;
    const { description } = settings;
    const keys = Object.keys(description);
    if (!keys.includes('images'))
      this._onChangeData(JSON.parse(JSON.stringify(item)));
    else {
      const i = JSON.parse(JSON.stringify(item));
      description.images.forEach(image => {
        if (item[image.field] === '/photo.png') {
          i[image.field] = '';
        } else if (item[image.field] === '') {
          this._onChangeCrop('', image.field);
        } else if (BASE64_RE.test(item[image.field])) {
          this._onChangeCrop(item[image.field], image.field);
        } else
          URL2Base64(item[image.field], res => {
            const base64 = res;
            this._onChangeField(base64, image.field);
            this._onChangeCrop(base64, image.field);
          });
      });
      this._onChangeData(i);
    }
  }

  _onClose(close) {
    onCloseForm(close, this);
  }

  _onChangeTextLocale(evt, locale, field) {
    this.state.formData[field][locale] = evt.target.value;
    this.setState(this.state);
  }

  _onChangeField(data, field) {
    this.state.formData[field] = data;
    this.setState(this.state);
  }

  _onChangeFile(evt, field, ratio) {
    if (evt.target.files[0])
      File2Base64(evt.target.files[0], res => {
        bigImage(
          res,
          img => {
            const crop = getCroppedMaxImg(img, ratio);
            this._onChangeField(res, field);
            this._onChangeCrop(crop, field);
          },
          () =>
            this._onChangeOpenMsg(
              messages.imageSmall,
              false,
              emptyFunc,
              this._onChangeOpenMsg,
            ),
        );
      });
  }

  _onChangeCrop(base64, field) {
    if (base64 === null)
      this._onChangeOpenMsg(
        messages.imageSmall,
        false,
        emptyFunc,
        this._onChangeOpenMsg,
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

  _onChangeOpenMsg(message, cancel, onSubmit, onClose) {
    onChangeOpenMessage(message, cancel, onSubmit, onClose, this);
  }

  _onSubmit() {
    const { formData, crops } = this.state;
    const { settings } = this.props;
    const { name, description } = settings;
    const dataToPost = {};
    dataToPost[name] = JSON.parse(JSON.stringify(formData));
    const keys = Object.keys(description);
    if (keys.includes('images'))
      description.images.forEach(image => {
        dataToPost[name][image.field] = crops[image.field];
      });
    if (isEmpty(dataToPost[name], description)) {
      onEmptyForm(this);
      return null;
    }
    return dataToPost;
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.name !== this.props.settings.name) this._init();
  }

  componentDidMount() {
    this._init();
  }

  render() {
    const { settings } = this.props;
    const { name, description } = settings;
    const message = this.state.msgData;
    const { crops } = this.state;
    let data = this.state.formData;
    if (name !== this.state.name) {
      this.state.name = name;
      data = {};
    }
    if (Object.keys(data).length === 0) data = this.props.item;
    const images = [];
    const texts = [];
    const localeTexts = [];
    const numbers = [];
    const selects = [];
    const keys = Object.keys(description);
    if (keys.includes('locales')) {
      description.locales.forEach(localeText => {
        appLocales.forEach(locale => {
          localeTexts.push(
            <TextArea
              key={`${localeText.field}-${name}-${locale}`}
              name={`${localeText.field}-${name}-${locale}`}
              value={data[localeText.field][locale]}
              message={messages[localeText.field].locale[locale]}
              rows={localeText.rows}
              maxLength={localeText.maxLength}
              change={evt =>
                this._onChangeTextLocale(evt, locale, localeText.field)
              }
              isPlaceholder={settings.isPlaceholder}
            />,
          );
        });
      });
    }
    if (keys.includes('texts')) {
      description.texts.forEach(text => {
        texts.push(
          <TextArea
            key={`${text.field}-${name}`}
            name={`${text.field}-${name}`}
            value={data[text.field]}
            message={messages[text.field]}
            rows={text.rows}
            maxLength={text.maxLength}
            change={evt => this._onChangeField(evt.target.value, text.field)}
            isPlaceholder={settings.isPlaceholder}
          />,
        );
      });
    }
    if (keys.includes('numbers')) {
      description.numbers.forEach(number => {
        numbers.push(
          <LabelInput
            key={`${number.field}-${name}`}
            id={`${number.field}-${name}`}
            type="number"
            value={data[number.field]}
            change={evt =>
              this._onChangeNumber(evt, number.field, number.format)
            }
            message={messages[number.field]}
            isPlaceholder={settings.isPlaceholder}
          />,
        );
      });
    }
    if (keys.includes('req_selects')) {
      description.req_selects.forEach(select => {
        selects.push(
          <div key={`req_select-${select.field}-${name}`} style={fontStyle}>
            <div>
              <FormattedMessage {...messages[select.field]} />
            </div>
            <SelectSearch
              values={data[select.field]}
              renderField={select.select_field}
              requestFunc={value => select.req_uri(value)}
              onChange={value => this._onChangeField(value, select.field)}
            />
          </div>,
        );
      });
    }
    if (keys.includes('tag_selects')) {
      description.tag_selects.forEach(select => {
        selects.push(
          <div
            key={`tag_select-${select.field_from}-${name}`}
            style={fontStyle}
          >
            <div>
              <FormattedMessage {...messages[select.field_from]} />
            </div>
            <SelectTag
              value={data[select.field_from]}
              onChange={value => this._onChangeField(value, select.field_from)}
              max_tags={select.max_tags}
              onDeselect={value => {
                if (data[select.field_to] === value)
                  this._onChangeField('', select.field_to);
              }}
            />
            <div>
              <FormattedMessage {...messages[select.field_to]} />
            </div>
            <SelectSimple
              value={data[select.field_to]}
              values={data[select.field_from]}
              onChange={value => this._onChangeField(value, select.field_to)}
            />
          </div>,
        );
      });
    }
    if (keys.includes('tags')) {
      description.tags.forEach(select => {
        selects.push(
          <div key={`tags-${select.field}-${name}`} style={fontStyle}>
            <div>
              <FormattedMessage {...messages[select.field]} />
            </div>
            <SelectTag
              value={data[select.field]}
              onChange={value => this._onChangeField(value, select.field)}
              max_tags={select.max_tags}
            />
          </div>,
        );
      });
    }
    if (keys.includes('images')) {
      description.images.forEach(image => {
        images.push(
          <div key={`${image.field}-${name}`} style={fontStyle}>
            <FormattedMessage {...messages[image.field]} />
            <div style={{ marginBottom: '0.5em' }}>
              {crops[image.field] ? (
                <Img src={crops[image.field]} alt={`${name}`} />
              ) : (
                <Img src="/photo.png" alt={`${name}`} />
              )}
            </div>
            <div style={{ marginBottom: '0.5em' }}>
              <LabelFile
                id={`file-${image.field}-${name}`}
                change={evt =>
                  this._onChangeFile(evt, image.field, image.ratio)
                }
                accept="image/*"
              />
            </div>
            {crops[image.field] && (
              <div>
                <PopupImageCrop
                  src={data[image.field]}
                  ratio={image.ratio}
                  styleCrop={ImageCropStyle}
                  onSubmit={base64 => this._onChangeCrop(base64, image.field)}
                  trigger={
                    <Button style={{ margin: '0.5em' }}>
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
    return (
      <div className={`editForm-${settings.flexDirection}`}>
        <form>
          {images}
          {numbers}
          {selects}
          {localeTexts}
          {texts}
        </form>
        <MsgBox
          message={message.message}
          open={message.isOpenMsg}
          onSubmit={message.onSubmit}
          cancel={message.isCancelMsg}
          onClose={message.onClose}
        />
      </div>
    );
  }
}

Form.propTypes = {
  item: PropTypes.object,
  settings: PropTypes.object,
};

export default Form;
