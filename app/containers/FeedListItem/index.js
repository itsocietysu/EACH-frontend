/**
 * FeedListItem
 *
 * Item of list of feeds
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/ListItem';
import H2 from 'components/H2';
import P from 'components/P';
import Img from './Img';
import Wrapper from './Wrapper';

export class FeedListItem extends React.PureComponent {
  render() {
    const { item } = this.props;

    // Put together the content of the feed
    const content = (
      <Wrapper>
        <div style={{ display: 'flex' }}>
          <Img src={item.image} alt={`Feed-${item.eid}`} />
          <H2 style={{ display: 'block', marginLeft: '15px' }}>{item.title}</H2>
        </div>
        <div>
          <P>{item.text}</P>
        </div>
      </Wrapper>
    );

    // Render the content into a list item
    return <ListItem key={`feed-list-item-${item.eid}`} item={content} />;
  }
}

FeedListItem.propTypes = {
  item: PropTypes.object,
};

export default FeedListItem;
