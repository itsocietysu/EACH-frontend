import messages from './messages';

class Link {
  path: string;
  message: any;
}

const MuseumsLink = (() => {
  const l = new Link();
  l.path = '/museums';
  l.message = messages.museums;
  return l;
})();

const EditNewsLink = (() => {
  const l = new Link();
  l.path = '/editNews';
  l.message = messages.editNews;
  return l;
})();

const EditMuseumsLink = (() => {
  const l = new Link();
  l.path = '/editMuseums';
  l.message = messages.editMuseums;
  return l;
})();

export const userLinks: Array<Link> = [MuseumsLink];

export const adminLinks: Array<Link> = [
  MuseumsLink,
  EditNewsLink,
  EditMuseumsLink,
];
