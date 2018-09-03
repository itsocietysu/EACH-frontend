/* eslint-disable react/prefer-stateless-function */
/*
 *
 * AuthList
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

import FunctionList from '../FunctionList';
import Wrapper from '../OptionsList/Wrapper';
import configs from './configs';

class AuthList extends React.PureComponent {
  render() {
    return (
      <Wrapper>
        <FunctionList
          values={configs.map(config =>
            Object.assign(config, {
              func: () => this.props.authFunc(config.configs),
            }),
          )}
        />
      </Wrapper>
    );
  }
}

AuthList.propTypes = { authFunc: PropTypes.func };

export default AuthList;
