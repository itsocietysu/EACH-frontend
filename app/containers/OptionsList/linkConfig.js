import messages from './messages';
import { FEED_CFG, LOCATION_CFG, MUSEUM_CFG } from '../EditPage/configs';

class Link {
  path: string;
  match: any;
  message: any;
}

const MuseumsLink = (() => {
  const l = new Link();
  l.path = '/museums?page=1';
  l.match = null;
  l.message = messages.museums;
  return l;
})();

const AdminEditLink = (() => {
  const l = new Link();
  l.path = '/edit/news?page=1';
  l.match = { content: 'news' };
  l.message = messages.adminEdit;
  return l;
})();

const EditNewsLink = (() => {
  const l = new Link();
  l.path = '/edit/news?page=1';
  l.match = { content: 'news' };
  l.message = messages.editNews;
  return l;
})();

const EditMuseumsLink = (() => {
  const l = new Link();
  l.path = '/edit/museums?page=1';
  l.match = { content: 'museums' };
  l.message = messages.editMuseums;
  return l;
})();

const EditLocationsLink = (() => {
  const l = new Link();
  l.path = '/edit/locations?page=1';
  l.match = { content: 'locations' };
  l.message = messages.editLocations;
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
