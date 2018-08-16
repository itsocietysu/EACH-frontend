/* eslint-disable react/no-children-prop */
/**
 * EditListItem
 *
 * Item of list for editing data
 */

import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import ListItem from 'components/ListItem';
import H2 from 'components/H2';
import P from 'components/P';
import PopupEl from 'containers/EditForm';
import Button from 'components/Button';
import Img from 'containers/FeedListItem/Img';
import DivLeft from 'containers/FeedListItem/DivLeft';
import DivRight from 'containers/FeedListItem/DivRight';
import Wrapper from 'containers/FeedListItem/Wrapper';
import Nav from 'containers/LinkList/Nav';
import MsgBox from 'components/MsgBox';
import { deleteData as deleteMuseum } from 'containers/EditMuseumsPage/actions';
import { deleteData as deleteFeed } from 'containers/NewsPage/actions';
import messages from './messages';

const FeedSet = {
  content: 'Feed',
  messages: {
    delete: messages.deleteFeed,
  },
};

const MuseumSet = {
  content: 'Museum',
  messages: {
    delete: messages.deleteMuseum,
  },
};

export class EditListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    const { item } = this.props.item;
    if (props.Feed) this.state = Object.assign(FeedSet, { item });
    if (props.Museum) {
      this.state = Object.assign(MuseumSet, {
        item: {
          eid: item.eid,
          image: item.image,
          title: item.name,
          text: item.desc,
          priority: '0',
        },
      });
    }
  }
  componentWillUpdate(nextProps) {
    const { item } = nextProps.item;
    if (this.props.Feed) this.state.item = item;
    if (this.props.Museum) {
      this.state.item.title = item.name;
      this.state.item.text = item.desc;
      this.state.item.image = item.image;
    }
  }
  render() {
    const { item } = this.state;

    const content = (
      <Wrapper>
        <Popup
          trigger={
            <img
              src="/feed_more.png"
              alt="prop"
              style={{
                width: '3%',
                float: 'right',
                marginTop: '1em',
                cursor: 'pointer',
              }}
            />
          }
          closeOnDocumentClick
          position="bottom right"
          arrowStyle={{
            border: '2px solid rgb(217, 146, 92)',
            borderLeft: 'none',
            borderTop: 'none',
          }}
          contentStyle={{
            boxShadow: 'none',
            maxWidth: '100px',
            padding: '0px',
            border: 'none',
          }}
        >
          <Nav style={{ right: '0', position: 'absolute' }}>
            <PopupEl
              trigger={
                <Button children={<FormattedMessage {...messages.edit} />} />
              }
              item={item}
              mod="edit"
              Feed={this.props.Feed}
              Museum={this.props.Museum}
            />
            <MsgBox
              trigger={
                <Button children={<FormattedMessage {...messages.delete} />} />
              }
              onSubmit={() =>
                this.props.onDelete(
                  item.eid,
                  this.props.Feed,
                  this.props.Museum,
                )
              }
              message={this.state.messages.delete}
              cancel
            />
          </Nav>
        </Popup>
        <div style={{ display: 'flex' }}>
          <DivLeft>
            <Img src={item.image} alt={`${this.state.content}-${item.eid}`} />
          </DivLeft>
          <DivRight>
            <H2>{item.title}</H2>
          </DivRight>
        </div>
        <div>
          <P>{item.text}</P>
        </div>
      </Wrapper>
    );

    return (
      <ListItem
        key={`edit-${this.state.content}-list-item-${item.eid}`}
        item={content}
      />
    );
  }
}

EditListItem.propTypes = {
  item: PropTypes.object,
  onDelete: PropTypes.func,
  Feed: PropTypes.bool,
  Museum: PropTypes.bool,
};

export function mapDispatchToProps(dispatch) {
  return {
    onDelete: (eid, Feed, Museum) => {
      if (Feed) dispatch(deleteFeed(eid));
      if (Museum) dispatch(deleteMuseum(eid));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withConnect(EditListItem);
