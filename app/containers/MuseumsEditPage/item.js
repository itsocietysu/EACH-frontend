/* eslint-disable react/no-string-refs */
import React from 'react';
import PropTypes from 'prop-types';
import Select from 'rc-select';
import 'rc-select/assets/index.css';

import { getLocale } from '../../cookieManager';
import DivSep from '../FeedListItem/DivSep';
import Img from '../FeedListItem/Img';
import EditPage from '../EditPage';
import H1 from '../../components/H1';
import P from '../../components/P';

import '../NewsPage/item.css';
import '../SelectSearch/index.css';

class Item extends React.Component {
  componentDidMount() {
    const locale = getLocale();
    const { item } = this.props;
    document.querySelector(
      `.P-desc-${item.eid}.${this.refs.desc.state.generatedClassName}`,
    ).innerHTML =
      item.desc[locale];
  }
  render() {
    const { item } = this.props;
    const locale = getLocale();
    const value = item.location.map(location => ({
      key: location.name,
      label: <i>{location.name}</i>,
    }));
    return (
      <div>
        <div className="wrapper">
          <div>
            <DivSep width="10%" className="divSep">
              <Img src={item.logo} alt={`Museum-${item.eid}`} />
            </DivSep>
            <DivSep width="50%" className="divSep">
              <Img src={item.image} alt={`Museum-${item.eid}`} />
            </DivSep>
            <H1>{item.name[locale]}</H1>
          </div>
          <div style={{ display: 'flex', marginTop: '10px' }}>
            <i className="fas fa-map-marker-alt fa-3x" />
            <Select
              value={value}
              style={{ marginLeft: '10px' }}
              disabled
              labelInValue
              animation="slide-up"
              placeholder=""
              optionLabelProp="children"
              multiple
              notFoundContent=""
              filterOption={false}
            />
          </div>
          <P className={`P-desc-${item.eid}`} ref="desc" />
          <EditPage
            search={{ page: 1 }}
            content="quest"
            reqProps={{ museumId: item.eid }}
          />
        </div>
      </div>
    );
  }
}

Item.propTypes = { item: PropTypes.object };

export default Item;
