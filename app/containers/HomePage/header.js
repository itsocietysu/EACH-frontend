/* eslint-disable react/no-string-refs */
import React from 'react';
import PropTypes from 'prop-types';

import H2 from '../../components/H2';
import { getLocale } from '../../cookieManager';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.update = this.update.bind(this);
  }

  update() {
    const locale = getLocale();
    const { item } = this.props;
    if (item) {
      document.querySelector(
        `.H2-text-${item.eid}.${this.refs.text.state.generatedClassName}`,
      ).innerHTML =
        item.text[locale];
      this.forceUpdate();
    }
  }

  render() {
    const { item } = this.props;
    return (
      <H2
        className={`H2-text-${item.eid}`}
        ref="text"
        style={{ borderBottom: `${item ? '2px solid #000' : 'none'}` }}
      />
    );
  }
}

Item.propTypes = {
  item: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

export default Item;
