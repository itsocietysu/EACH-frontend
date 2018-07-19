import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';
import FeedListItem from 'containers/FeedListItem';

function FeedsList({ loading, error, data }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => <ListItem item="Something went wrong" />;
    return <List component={ErrorComponent} />;
  }

  if (data !== false) {
    return <List items={data} component={FeedListItem} />;
  }

  return null;
}

FeedsList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  data: PropTypes.any,
};

export default FeedsList;
