/* eslint-disable react/no-string-refs */
import React from 'react';
import PropTypes from 'prop-types';

import Img from '../FeedListItem/Img';

import H2 from '../../components/H2';
import H3 from '../../components/H3';
import P from '../../components/P';
import { getLocale } from '../../cookieManager';
import { colors } from '../../utils/constants';

import './item.css';

class Item extends React.Component {
  componentDidMount() {
    const locale = getLocale();
    const { item } = this.props;
    document.querySelector(
      `.P-text-${item.eid}.${this.refs.text.state.generatedClassName}`,
    ).innerHTML =
      item.text[locale];
  }
  render() {
    const { item } = this.props;
    const locale = getLocale();
    return (
      <div className="wrapper">
        <div style={{ borderBottom: '2px solid #000', paddingBottom: '0.2em' }}>
          <div className="divSep">
            <Img src={item.image} alt={`Feed-${item.eid}`} />
          </div>
          <H2>{item.title[locale]}</H2>
          <H3 style={{ color: `${colors.base}` }}>{item.desc[locale]}</H3>
        </div>
        <P className={`P-text-${item.eid}`} ref="text" />
      </div>
    );
  }
}

Item.propTypes = { item: PropTypes.object };

export default Item;
