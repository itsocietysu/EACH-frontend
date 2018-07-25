import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';

function DataList({ loading, error, data, component }) {
  if (loading) {
    return <List component={LoadingIndicator} />;
  }

  if (error !== false) {
    const ErrorComponent = () => <ListItem item="Something went wrong" />;
    console.error(error);
    return <List component={ErrorComponent} />;
  }

  if (data !== false) {
    return <List items={data} component={component} />;
  }

  return null;
}

DataList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  data: PropTypes.any,
  component: PropTypes.func.isRequired,
};

export default DataList;
