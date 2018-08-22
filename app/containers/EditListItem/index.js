/* eslint-disable react/no-children-prop,no-param-reassign */
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

import { getLocale } from 'cookieManager';

import ListItem from 'components/ListItem';
import H2 from 'components/H2';
import H3 from 'components/H3';
import P from 'components/P';
import PopupEl from 'containers/EditForm';
import Button from 'components/Button';
import Img from 'containers/FeedListItem/Img';
import DivLeft from 'containers/FeedListItem/DivLeft';
import DivRight from 'containers/FeedListItem/DivRight';
import Wrapper from 'containers/FeedListItem/Wrapper';
import Nav from 'containers/LinkList/Nav';
import MsgBox from 'components/MsgBox';
import { deleteFeedData, deleteMuseumData } from 'containers/EditPage/actions';
import messages from './messages';

import { DEFAULT_LOCALE } from '../../i18n';

const imgStyle = {
  width: '3%',
  float: 'right',
  marginTop: '1em',
  cursor: 'pointer',
};

const arrowStyle = {
  border: '2px solid rgb(217, 146, 92)',
  borderLeft: 'none',
  borderTop: 'none',
};

const contentStyle = {
  boxShadow: 'none',
  maxWidth: '100px',
  padding: '0px',
  border: 'none',
};

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
    if (props.Feed) this.state = FeedSet;
    if (props.Museum) this.state = MuseumSet;
  }
  render() {
    const { item } = this.props.item;
    if (this.props.Museum) {
      item.title = item.name;
      item.priority = '0';
    }
    const locale = getLocale() || DEFAULT_LOCALE;
    const content = (
      <Wrapper>
        <Popup
          trigger={<img src="/feed_more.png" alt="props" style={imgStyle} />}
          closeOnDocumentClick
          position="bottom right"
          arrowStyle={arrowStyle}
          contentStyle={contentStyle}
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
            <H2>{item.title[locale]}</H2>
          </DivRight>
        </div>
        <div>
          <H3>{item.desc[locale]}</H3>
          <P>{this.props.Feed && item.text[locale]}</P>
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
      if (Feed) dispatch(deleteFeedData(eid));
      if (Museum) dispatch(deleteMuseumData(eid));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withConnect(EditListItem);
