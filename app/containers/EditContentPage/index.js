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

import EditPage from '../EditPage';

export class EditContentPage extends React.Component {
  render() {
    const { content, search } = this.props;
    if (content === 'museums')
      return <EditPage content="museum" search={search} />;
    else if (content === 'news')
      return <EditPage content="feed" search={search} />;
    else if (content === 'locations')
      return <EditPage content="location" search={search} />;
    return <Redirect to="/" />;
  }
}

EditContentPage.propTypes = {
  content: PropTypes.string,
  search: PropTypes.object,
};

export default EditContentPage;
