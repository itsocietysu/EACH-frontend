/**
 * FeedListItem
 *
 * Item of list of feeds
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/ListItem';
import H2 from 'components/H2';
import H3 from 'components/H3';
// import Img from './Img';
// import DivLeft from './DivLeft';
// import DivRight from './DivRight';
import Wrapper from './Wrapper';
import './hoverContainer.css';

export class FeedListItem extends React.PureComponent {
  render() {
    const { item } = this.props;

    // Put together the content of the feed
    const content = (
      <Wrapper>
        <div style={{ display: 'flex' }}>
          <div className="container">
            <img src={item.image} alt={`Feed-${item.eid}`} />
            <div className="overlay">
              <H2>{item.title}</H2>
              <H3>{item.text}</H3>
            </div>
          </div>
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
