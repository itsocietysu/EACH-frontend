import React from 'react';
import PropTypes from 'prop-types';

import List from 'components/List';
import ListItem from 'components/ListItem';
import LoadingIndicator from 'components/LoadingIndicator';

function DataList({ loading, error, data, component, scroll }) {
  if (loading) {
    return <List component={LoadingIndicator} scroll={scroll} />;
  }

  if (error !== false) {
    const ErrorComponent = () => <ListItem item="Something went wrong" />;
    console.error(error);
    return <List component={ErrorComponent} scroll={scroll} />;
  }

  if (data !== false) {
    return <List items={data} component={component} scroll={scroll} />;
  }

  return null;
}

DataList.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.any,
  data: PropTypes.any,
  component: PropTypes.func.isRequired,
  scroll: PropTypes.bool,
};

export default DataList;
