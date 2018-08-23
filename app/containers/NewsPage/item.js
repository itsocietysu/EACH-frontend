/* eslint-disable react/no-string-refs */
import React from 'react';
import PropTypes from 'prop-types';

import H1 from 'components/H1';
import P from 'components/P';
import { getLocale } from 'cookieManager';
import { DEFAULT_LOCALE } from '../../i18n';

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
      <div>
        <img src={item.image} alt="" />
        <H1>{item.title[locale]}</H1>
        <P className={`P-text-${item.eid}`} ref="text" />
      </div>
    );
  }
}

Item.propTypes = { item: PropTypes.object };

export default Item;
