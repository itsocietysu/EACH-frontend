/* eslint-disable react/no-children-prop */
/**
 * NewsListItem
 *
 * Item of list of news
 */

import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

import ListItem from 'components/ListItem';
import H2 from 'components/H2';
import P from 'components/P';
import PopupEl from 'containers/EditNews';
import Button from 'components/Button';
import Img from 'containers/FeedListItem/Img';
import DivLeft from 'containers/FeedListItem/DivLeft';
import DivRight from 'containers/FeedListItem/DivRight';
import Wrapper from 'containers/FeedListItem/Wrapper';
import Nav from 'containers/LinkList/Nav';
import MsgBox from 'components/MsgBox';
import { deleteData } from 'containers/NewsPage/actions';
import messages from './messages';

export class NewsListItem extends React.PureComponent {
  render() {
    const { item } = this.props;

    // Put together the content of the feed
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
            width: '100px',
            padding: '0px',
            border: 'none',
          }}
        >
          <Nav>
            <PopupEl
              trigger={
                <Button children={<FormattedMessage {...messages.edit} />} />
              }
              item={item}
              mod="edit"
            />
            <MsgBox
              trigger={
                <Button children={<FormattedMessage {...messages.delete} />} />
              }
              onSubmit={() => this.props.onDelete(item.eid)}
              message={messages.deleteMessage}
              cancel
            />
          </Nav>
        </Popup>
        <div style={{ display: 'flex' }}>
          <DivLeft>
            <Img src={item.image} alt={`News-${item.eid}`} />
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

    // Render the content into a list item
    return <ListItem key={`news-list-item-${item.eid}`} item={content} />;
  }
}

NewsListItem.propTypes = {
  item: PropTypes.shape({
    eid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
    priority: PropTypes.string,
  }),
  onDelete: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onDelete: eid => dispatch(deleteData(eid)),
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default withConnect(NewsListItem);
