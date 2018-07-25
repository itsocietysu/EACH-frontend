/* eslint-disable prettier/prettier,react/prefer-stateless-function,react/no-children-prop */
import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { URL2Base64, File2Base64 } from 'toBase64';

import Img from 'containers/FeedListItem/Img';
import TextArea from 'components/TextArea';
import LabelInput from 'components/LabelInput';
import Button from 'containers/UserPanel/Button';
import CenteredDiv from 'components/MsgBox/CenteredDiv';
import Close from 'components/MsgBox/Cross';
import BorderTopImage from 'components/MsgBox/Img';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectText,
  makeSelectTitle,
  makeSelectUrl,
  makeSelectFile,
  makeSelectImage,
} from "./selectors";
import messages from './messages';
import { changeUrl, changeFile, changeTitle, changeText, changeData, changeMod, sendData } from "./actions";
import reducer from './reducer';
import saga from './saga';

class EditForm extends React.Component {
  render() {
    return (
      <Popup
        trigger={this.props.trigger}
        modal
        closeOnDocumentClick
        contentStyle={{
          width: '40em',
          padding: '0',
          border: '1px solid rgb(217, 146, 92)',
          borderRadius: '5px',
        }}
        onOpen={() => {this.props.init(this.props.item, this.props.mod)}}
      >
        {close => (
          <CenteredDiv>
            <BorderTopImage />
            <Close onClick={close} />
            <form>
              <div style={{ marginBottom: '0.5em' }}>
                <Img src={this.props.image ? `data:image/jpeg;base64,${this.props.image}` : '/Photo.png'} alt={`Feed-${this.props.item.eid}`} />
              </div>
              <div style={{ marginBottom: '0.5em' }}>
                <LabelInput id="urlNews" type="text" value={this.props.url} change={this.props.onChangeUrl} message={messages.url} />
              </div>
              <div style={{ marginBottom: '0.5em' }}>
                <LabelInput id="fileNews" type="file" change={this.props.onChangeFile} accept="image/*" message={messages.file} />
              </div>
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
                  this.props.onSubmit();
                  close();
                }}
              />
              <Button
                children={<FormattedMessage {...messages.close} />}
                onClick={close}
              />
            </div>
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
  url: PropTypes.string,
  item: PropTypes.shape({
    eid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  mod: PropTypes.oneOf(['add', 'edit']),
  onChangeUrl: PropTypes.func,
  onChangeFile: PropTypes.func,
  onChangeTitle: PropTypes.func,
  onChangeText: PropTypes.func,
  init: PropTypes.func,
  onSubmit: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onChangeUrl: evt => {
      const url = evt.target.value;
      URL2Base64(evt.target.value, res => {
        dispatch(changeUrl(url, res.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')));
      });
    },
    onChangeFile: evt => {
      const file = evt.target.files[0];
      File2Base64(evt.target.files[0], res => {
        dispatch(changeFile(file, res.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')));
      });
    },
    onChangeTitle: evt => dispatch(changeTitle(evt.target.value)),
    onChangeText: evt => dispatch(changeText(evt.target.value)),
    init: (item, mod) => {
      const url = item.image;
      URL2Base64(item.image, res => {
        dispatch(changeData(item));
        dispatch(changeMod(mod));
        if (mod === 'edit')
          dispatch(changeUrl(url, res.replace(/^data:image\/(png|jpg|jpeg);base64,/, '')));
      });
    },
    onSubmit: () => {
      dispatch(sendData());
    },
  };
}

const mapStateToProps = createStructuredSelector({
  image: makeSelectImage(),
  file: makeSelectFile(),
  title: makeSelectTitle(),
  text: makeSelectText(),
  url: makeSelectUrl(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'editNews', reducer });
const withSaga = injectSaga({ key: 'editNews', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(EditForm);
