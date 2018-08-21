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
        <div className="flex">
          <div className="container">
            <img src={item[0].image} alt={`Feed-${item[0].eid}`} />
            <div className="overlay">
              <H2>{item[0].title}</H2>
              <H3>{item[0].text}</H3>
            </div>
          </div>
          {item[1] && (
            <div className="container">
              <img src={item[1].image} alt={`Feed-${item[1].eid}`} />
              <div className="overlay">
                <H2>{item[1].title}</H2>
                <H3>{item[1].text}</H3>
              </div>
            </div>
          )}
        </div>
      </Wrapper>
    );

    // Render the content into a list item
    return <ListItem key={`feed-list-item-${item.eid}`} item={content} />;
  }
}

FeedListItem.propTypes = {
  item: PropTypes.array,
};

export default FeedListItem;
