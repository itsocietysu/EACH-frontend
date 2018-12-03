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
import lodash from 'lodash';

import { PopupStyle } from '../PopupImageCrop';
import Button from '../../components/MsgBox/Button';
import messages from './messages';
import BorderTopImage from '../../components/MsgBox/Header';
import Close from '../../components/MsgBox/Cross';
import './index.css';

import { createForm } from './create-form';

class EditForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: props.settings.name,
      form: false,
      refForm: false,
    };

    this._init = this._init.bind(this);
    this._onClose = this._onClose.bind(this);
  }

  _init() {
    const { item, settings } = this.props;
    const { state } = this;
    state.refForm = React.createRef();
    state.form = createForm(item, settings, state.refForm);
    this.setState(state);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.settings.name !== this.props.settings.name) this._init();
  }

  componentDidMount() {
    if (!this.props.isPopup) this._init();
  }

  _onClose(close) {
    this.state.refForm.current._onClose(close);
  }

  render() {
    const { settings } = this.props;
    const { name } = settings;
    let { form } = this.state;
    const { refForm } = this.state;
    if (name !== this.state.name) {
      this.state.name = name;
      form = false;
    }
    const Form = form ? () => form : () => <div />;
    const ButtonConfirm = ({ close }) => (
      <Button
        onClick={() => {
          const dataToPost = form ? refForm.current._onSubmit() : null;
          if (dataToPost) {
            this.props.onSubmit(dataToPost);
            if (lodash.isFunction(close)) close();
          }
        }}
      >
        <FormattedMessage {...messages.confirm} />
      </Button>
    );
    if (this.props.isPopup) {
      return (
        <Popup
          trigger={this.props.trigger}
          open={this.props.open}
          modal
          closeOnDocumentClick
          lockScroll
          contentStyle={PopupStyle}
          onOpen={() => {
            this._init();
          }}
          onClose={() => {
            if (lodash.isFunction(this.props.onClose)) this.props.onClose();
          }}
        >
          {close => (
            <div className={`editForm-${this.props.flexDirection}`}>
              <BorderTopImage />
              <Close onClick={() => this._onClose(close)} />
              <Form />
              <div>
                <ButtonConfirm close={close} />
                <Button onClick={() => this._onClose(close)}>
                  <FormattedMessage {...messages.close} />
                </Button>
              </div>
            </div>
          )}
        </Popup>
      );
    }
    return (
      <div className={`editForm-${this.props.flexDirection}`}>
        <Form />
        <div>
          <ButtonConfirm />
        </div>
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
  open: PropTypes.bool,
};

export default EditForm;
