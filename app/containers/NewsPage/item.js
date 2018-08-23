/* eslint-disable react/no-string-refs */
import React from 'react';
import PropTypes from 'prop-types';

import DivSep from 'containers/FeedListItem/DivSep';
import Img from 'containers/FeedListItem/Img';

import H1 from 'components/H1';
import P from 'components/P';
import { getLocale } from 'cookieManager';
import { DEFAULT_LOCALE } from '../../i18n';

import './item.css';

class Item extends React.Component {
  componentDidMount() {
    const locale = getLocale() || DEFAULT_LOCALE;
    const { item } = this.props;
    document.querySelector(
      `.P-text-${item.eid}.${this.refs.text.state.generatedClassName}`,
    ).innerHTML =
      item.text[locale];
  }
  render() {
    const { item } = this.props;
    const locale = getLocale() || DEFAULT_LOCALE;
    return (
      <div className="wrapper">
        <div className="divUp">
          <DivSep width="50%">
            <Img src={item.image} alt={`Feed-${item.eid}`} />
          </DivSep>
          <DivSep width="50%" className="divSep">
            <H1>{item.title[locale]}</H1>
          </DivSep>
        </div>
        <P className={`P-text-${item.eid}`} ref="text" />
      </div>
    );
  }
}

Item.propTypes = { item: PropTypes.object };

export default Item;
