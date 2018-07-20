/**
 * NewsListItem
 *
 * Item of list of news
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/ListItem';
import H2 from 'components/H2';
import P from 'components/P';
import Img from './Img';
import Wrapper from './Wrapper';

export class NewsListItem extends React.PureComponent {
  render() {
    const { item } = this.props;

    // Put together the content of the feed
    const content = (
      <Wrapper>
        <div style={{ display: 'flex' }}>
          <Img src={item.image} alt={`News-${item.eid}`} />
          <H2 style={{ display: 'block', marginLeft: '15px' }}>{item.title}</H2>
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
  item: PropTypes.object,
};

export default NewsListItem;
