import messages from './messages';
import { FEED_CFG, LOCATION_CFG, MUSEUM_CFG } from '../../utils/constants';

class Link {
  path: string;
  match: any;
  message: any;
  icon: string;
}

const MuseumsLink = (() => {
  const l = new Link();
  l.path = '/museums?page=1';
  l.match = null;
  l.message = messages.museums;
  l.icon = 'fa-university';
  return l;
})();

const AdminEditLink = (() => {
  const l = new Link();
  l.path = '/edit/news?page=1';
  l.match = { content: 'news' };
  l.message = messages.adminEdit;
  l.icon = 'fa-edit';
  return l;
})();

const EditNewsLink = (() => {
  const l = new Link();
  l.path = '/edit/news?page=1';
  l.match = { content: 'news' };
  l.message = messages.editNews;
  l.icon = '';
  return l;
})();

const EditMuseumsLink = (() => {
  const l = new Link();
  l.path = '/edit/museums?page=1';
  l.match = { content: 'museums' };
  l.message = messages.editMuseums;
  l.icon = '';
  return l;
})();

const EditLocationsLink = (() => {
  const l = new Link();
  l.path = '/edit/locations?page=1';
  l.match = { content: 'locations' };
  l.message = messages.editLocations;
  l.icon = '';
  return l;
})();

export const userLinks: Array<Link> = [MuseumsLink];

export const adminLinks: Array<Link> = [MuseumsLink, AdminEditLink];

export const editLinks: Array<Link> = [
  EditNewsLink,
  EditMuseumsLink,
  EditLocationsLink,
];

export const matchEditContent = {
  museums: MUSEUM_CFG,
  news: FEED_CFG,
  locations: LOCATION_CFG,
};
