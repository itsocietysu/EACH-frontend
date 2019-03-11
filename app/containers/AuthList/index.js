/* eslint-disable react/prefer-stateless-function,react/prop-types */
/*
 *
 * AuthList
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import FunctionList from '../FunctionList';
import configs from './configs';

function IconButton({ onClick, key, path }) {
  return (
    <button key={key} onClick={onClick}>
      <img src={path} alt={`icon-auth-${key}`} />
    </button>
  );
}

class AuthList extends React.PureComponent {
  render() {
    return (
      <FunctionList
        values={configs.map(config =>
          Object.assign(config, {
            func: () => this.props.authFunc(config.app),
          }),
        )}
        component={IconButton}
        field="path"
        flexDirection="row"
      />
    );
  }
}

AuthList.propTypes = { authFunc: PropTypes.func };

export default AuthList;
