/**
 * ListItem
 *
 * Item of list of news
 */

import React from 'react';
import EditListItem from 'containers/EditListItem';

export default function(item) {
  return <EditListItem item={item} Feed />;
}
