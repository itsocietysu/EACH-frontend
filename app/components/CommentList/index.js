/* eslint-disable react/prefer-stateless-function */
/**
 * CommentList
 *
 * List for view comments
 */

import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import lodash from 'lodash';
import { PopupStyle } from '../../containers/PopupImageCrop';
import BorderTopImage from '../MsgBox/Header';
import Close from '../MsgBox/Cross';
import DataList from '../DataList';
import ListItem from '../ListItem';
import P from '../P';

function CommentListItem(props) {
  const { item } = props.item;
  const content = (
    <div style={{ color: '#000' }}>
      <div>
        <P>{`${item.user.name}, ${item.user.email} ${item.comment.created}`}</P>
      </div>
      <div>
        <P>{`${item.comment.text}`}</P>
      </div>
    </div>
  );
  return (
    <ListItem
      key={`comment_list-item-${item.eid}-${item.user.name}`}
      item={content}
    />
  );
}

CommentListItem.propTypes = {
  item: PropTypes.object,
};

export class CommentList extends React.Component {
  render() {
    const dataListProps = {
      loading: false,
      error: false,
      data: this.props.comments,
      component: item => <CommentListItem item={item} />,
      scroll: true,
    };
    return (
      <Popup
        trigger={this.props.trigger}
        modal
        closeOnDocumentClick
        lockScroll
        contentStyle={PopupStyle}
        onClose={() => {
          if (lodash.isFunction(this.props.onClose)) this.props.onClose();
        }}
      >
        {close => (
          <div>
            <BorderTopImage />
            <Close onClick={close} />
            <DataList {...dataListProps} />
          </div>
        )}
      </Popup>
    );
  }
}

CommentList.propTypes = {
  comments: PropTypes.array,
  trigger: PropTypes.node,
  onClose: PropTypes.func,
};

export default CommentList;
