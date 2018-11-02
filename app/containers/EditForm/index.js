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

import { PopupStyle } from '../PopupImageCrop';
import MsgBox from '../../components/MsgBox';
import Button from '../UserPanel/Button';
import messages from './messages';
import BorderTopImage from '../../components/MsgBox/Img';
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
      msgData: {
        isOpenMsg: false,
        message: {},
        isCancelMsg: false,
        onSubmit: () => {},
        onClose: () => {},
      },
    };

    this._init = this._init.bind(this);
    this._onChangeOpenMsg = this._onChangeOpenMsg.bind(this);
  }

  _init() {
    const { item, settings } = this.props;
    const { state } = this;
    state.refForm = React.createRef();
    state.form = createForm(item, settings, state.refForm);
    this.setState(state);
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
    if (prevProps.settings.name !== this.props.settings.name) this._init();
  }

  componentDidMount() {
    if (!this.props.isPopup) this._init();
  }

  render() {
    const { settings } = this.props;
    const { name } = settings;
    const message = this.state.msgData;
    let { form } = this.state;
    const { refForm } = this.state;
    if (name !== this.state.name) {
      this.state.name = name;
      form = false;
    }
    const Form = form ? () => form : () => <div />;
    if (this.props.isPopup) {
      if (this.props.trigger)
        return (
          <Popup
            trigger={this.props.trigger}
            modal
            closeOnDocumentClick
            lockScroll
            contentStyle={PopupStyle}
            onOpen={() => {
              this._init();
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
                <Form />
                <div>
                  <Button
                    onClick={() => {
                      const dataToPost = form
                        ? refForm.current._onSubmit()
                        : null;
                      if (!dataToPost)
                        this._onChangeOpenMsg(
                          messages.empty,
                          () => {},
                          false,
                          this._onChangeOpenMsg,
                        );
                      else {
                        this.props.onSubmit(dataToPost);
                        close();
                      }
                    }}
                  >
                    <FormattedMessage {...messages.confirm} />
                  </Button>
                  <Button
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
                  >
                    <FormattedMessage {...messages.close} />
                  </Button>
                </div>
                <MsgBox
                  message={message.message}
                  open={message.isOpenMsg}
                  onSubmit={message.onSubmit}
                  cancel={message.isCancelMsg}
                  onClose={message.onClose}
                />
              </div>
            )}
          </Popup>
        );
      return (
        <Popup
          open={this.props.open}
          modal
          closeOnDocumentClick
          lockScroll
          contentStyle={PopupStyle}
          onOpen={() => {
            this._init();
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
              <Form />
              <div>
                <Button
                  onClick={() => {
                    const dataToPost = form
                      ? refForm.current._onSubmit()
                      : null;
                    if (!dataToPost)
                      this._onChangeOpenMsg(
                        messages.empty,
                        () => {},
                        false,
                        this._onChangeOpenMsg,
                      );
                    else {
                      this.props.onSubmit(dataToPost);
                      close();
                    }
                  }}
                >
                  <FormattedMessage {...messages.confirm} />
                </Button>
                <Button
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
                >
                  <FormattedMessage {...messages.close} />
                </Button>
              </div>
              <MsgBox
                message={message.message}
                open={message.isOpenMsg}
                onSubmit={message.onSubmit}
                cancel={message.isCancelMsg}
                onClose={message.onClose}
              />
            </div>
          )}
        </Popup>
      );
    }
    return (
      <div className={`editForm-${this.props.flexDirection}`}>
        <Form />
        <div>
          <Button
            onClick={() => {
              const dataToPost = form ? refForm.current._onSubmit() : null;
              if (!dataToPost)
                this._onChangeOpenMsg(messages.empty, () => {}, false, () => {
                  this._onChangeOpenMsg();
                });
              else {
                this.props.onSubmit(dataToPost);
              }
            }}
          >
            <FormattedMessage {...messages.confirm} />
          </Button>
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
