/* eslint-disable prettier/prettier,react/prefer-stateless-function */
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
  componentWillMount() {
    this.props.init(this.props.item, this.props.mod);
  }
  render() {
    return (
      <Popup trigger={this.props.trigger} modal closeOnDocumentClick contentStyle={{ width: '50em' }}>
        {close => (
          <div>
            <form style={{ textAlign: 'left' }}>
              <div>
                <Img src={`data:image/jpeg;base64,${this.props.image}`} alt={`Feed-${this.props.item.eid}`} />
                <LabelInput id="urlNews" type="text" value={this.props.url} change={this.props.onChangeUrl} message={messages.url} />
                <br />
                <LabelInput id="fileNews" type="file" change={this.props.onChangeFile} message={messages.file} />
              </div>
              <TextArea
                name={`title-${this.props.item.eid}`}
                value={this.props.title}
                message={messages.title}
                rows="2"
                change={this.props.onChangeTitle}
              />
              <br />
              <TextArea
                name={`text-${this.props.item.eid}`}
                value={this.props.text}
                message={messages.text}
                rows="15"
                change={this.props.onChangeText}
              />
            </form>
            <Button onClick={evt => {this.props.onSubmit(evt); close();}}>
              <FormattedMessage {...messages.confirm} />
            </Button>
            <Button onClick={close}>
              <FormattedMessage {...messages.close} />
            </Button>
          </div>
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
      console.log(item);
      console.log(mod);
      dispatch(changeData(item));
      dispatch(changeMod(mod));
    },
    onSubmit: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
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
