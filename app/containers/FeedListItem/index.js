/* eslint-disable jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */
/**
 * FeedListItem
 *
 * Item of list of feeds
 */

import React from 'react';
import PropTypes from 'prop-types';

import { getLocale } from 'cookieManager';

import ListItem from 'components/ListItem';
import H2 from 'components/H2';
import H3 from 'components/H3';
import Wrapper from './Wrapper';
import './hoverContainer.css';

import { DEFAULT_LOCALE } from '../../i18n';

const ItemDiv = item => {
  const locale = getLocale() || DEFAULT_LOCALE;
  return (
    <div className="container">
      <img src={item.image} alt={`Feed-${item.eid}`} />
      <div className="overlay">
        <H2>{item.title[locale]}</H2>
        <H3>{item.desc[locale]}</H3>
      </div>
    </div>
  );
};

export class FeedListItem extends React.PureComponent {
  render() {
    const { item } = this.props;

    // Put together the content of the feed
    const content = (
      <Wrapper>
        <div className="flex">
          {ItemDiv(item[0])}
          {item[1] && ItemDiv(item[1])}
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
