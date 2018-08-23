/**
 * MuseumListItem
 *
 * Item of list of museums
 */

import React from 'react';
import PropTypes from 'prop-types';

import ListItem from 'components/ListItem';
import H2 from 'components/H2';
import P from 'components/P';
import Img from 'containers/FeedListItem/Img';
import DivSep from 'containers/FeedListItem/DivSep';
import Wrapper from './Wrapper';

export class MuseumListItem extends React.PureComponent {
  render() {
    const { item } = this.props;

    // Put together the content of the museum
    const content = (
      <Wrapper>
        <div style={{ display: 'flex' }}>
          <DivSep width="30%">
            <Img src={item.image} alt={`Museum-${item.eid}`} />
          </DivSep>
          <DivSep width="70%" marginLeft="15px">
            <H2>{item.name}</H2>
          </DivSep>
        </div>
        <div>
          <P>{item.desc}</P>
        </div>
      </Wrapper>
    );

    // Render the content into a list item
    return <ListItem key={`museum-list-item-${item.eid}`} item={content} />;
  }
}

MuseumListItem.propTypes = {
  item: PropTypes.object,
};

export default MuseumListItem;
