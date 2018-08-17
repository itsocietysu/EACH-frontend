/**
 * ListItem
 *
 * Item of list of museums
 */

import React from 'react';
import EditListItem from 'containers/EditListItem';

export default function(item) {
  return <EditListItem item={item} Museum />;
}
