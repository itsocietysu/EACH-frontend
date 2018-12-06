/* eslint-disable react/no-string-refs */
/**
 * MuseumListItem
 *
 * Item of list of museums
 */

import React from 'react';
import PropTypes from 'prop-types';

import { getLocale } from '../../cookieManager';

import ListItem from '../../components/ListItem';
import H2 from '../../components/H2';
import P from '../../components/P';
import Img from '../FeedListItem/Img';
import DivSep from '../FeedListItem/DivSep';
import Wrapper from './Wrapper';

export const getLocations = (eid, locations) =>
  locations.map(location => (
    <div key={`${eid}-${location.name}`} style={{ display: 'flex' }}>
      <i className="fas fa-map-marker-alt" />
      <P style={{ margin: '0 10px' }}>{location.name}</P>
    </div>
  ));

export class MuseumListItem extends React.PureComponent {
  componentDidMount() {
    const locale = getLocale();
    const { item } = this.props;
    document.querySelector(
      `.P-desc-${item.eid}.${this.refs.desc.state.generatedClassName}`,
    ).innerHTML =
      item.desc[locale];
  }
  render() {
    const locale = getLocale();
    const { item } = this.props;

    // Put together the content of the museum
    const content = (
      <Wrapper>
        <div style={{ display: 'flex' }}>
          <DivSep width="10%">
            <Img src={item.logo} alt={`${item.eid}`} />
          </DivSep>
          <DivSep width="30%" marginLeft="15px">
            <Img src={item.image} alt={`Museum-${item.eid}`} />
          </DivSep>
          <DivSep width="60%" marginLeft="15px">
            <H2>{item.name[locale]}</H2>
          </DivSep>
        </div>
        <div>
          <P className={`P-desc-${item.eid}`} ref="desc" />
          {getLocations(item.eid, item.location)}
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
