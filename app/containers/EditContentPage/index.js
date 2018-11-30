/* eslint-disable react/prefer-stateless-function */
/*
 *
 * EditContentPage
 *
 * This page is root for EditPage. EditPage gets type of content for editing from there
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';

import EditPage from '../EditPage';

import { editLinks, matchEditContent } from '../OptionsList/linkConfig';
import NavLink from './NavLink';
import Ul from '../LinkList/Ul';
import messages from './messages';
import H1 from '../../components/H1';
import { withAuthAdmin } from '../../utils/auth';

import { colors } from '../../utils/constants';

export class EditContentPage extends React.Component {
  render() {
    const { content, search } = this.props;
    let Content = <div />;
    if (editLinks) {
      Content = editLinks.map(value => (
        <NavLink
          key={value.path}
          to={value.path}
          activeStyle={{
            background: `${colors.base}`,
            color: '#fff',
          }}
          isActive={() => content === value.match.content}
        >
          <FormattedMessage {...value.message} />
        </NavLink>
      ));
    }
    if (!matchEditContent[content]) return <Redirect to="/" />;
    const contentType = matchEditContent[content];
    return (
      <div>
        <H1>
          <FormattedMessage {...messages.header} />
        </H1>
        <nav style={{ margin: '.67em 0' }}>
          <Ul flexDirection="row">{Content}</Ul>
        </nav>
        <EditPage content={contentType} search={search} />
      </div>
    );
  }
}

EditContentPage.propTypes = {
  content: PropTypes.string,
  search: PropTypes.object,
};

export default withAuthAdmin(EditContentPage);
