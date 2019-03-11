/* eslint-disable react/prefer-stateless-function,jsx-a11y/anchor-is-valid */
/*
*
* List of pages navigation
*
*/

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Li from './Li';
import Ul from './Ul';

export class PageList extends React.Component {
  render() {
    const { countElements, elementsPerPage } = this.props;
    const count = Math.ceil((countElements * 1.0) / elementsPerPage);
    const data = [];
    for (let i = 0; i < count; i += 1)
      data[i] = (
        <Li key={`page-list-${i}`}>
          <Link to={`?page=${i + 1}`}>{i + 1}</Link>
        </Li>
      );
    return (
      <div>
        <Ul>{data}</Ul>
      </div>
    );
  }
}

PageList.propTypes = {
  countElements: PropTypes.number,
  elementsPerPage: PropTypes.number,
};

export default PageList;
