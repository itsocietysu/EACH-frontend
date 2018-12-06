/* eslint-disable react/no-children-prop,no-param-reassign,jsx-a11y/anchor-is-valid */
/**
 * EditListItem
 *
 * Item of list for editing data
 */

import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

import { getLocale } from '../../cookieManager';

import ListItem from '../../components/ListItem';
import H2 from '../../components/H2';
import H3 from '../../components/H3';
import P from '../../components/P';
import PopupForm from '../EditForm';
import Button from '../../components/Button';
import Img from '../FeedListItem/Img';
import DivSep from '../FeedListItem/DivSep';
import Wrapper from '../FeedListItem/Wrapper';
import Nav from '../LinkList/Nav';
import MsgBox from '../../components/MsgBox';
import messages from './messages';

import { configs } from '../EditForm/configs';
import { translateFromForm, translateToForm } from '../EditForm/create-form';
import { getLocations } from '../MuseumListItem';
import { colors } from '../../utils/constants';

const iconStyle = color => ({
  float: 'right',
  marginTop: '1em',
  cursor: 'pointer',
  color,
});

export const arrowStyle = {
  border: `2px solid ${colors.base}`,
  borderLeft: 'none',
  borderTop: 'none',
};

export const contentStyle = maxWidth => ({
  boxShadow: 'none',
  maxWidth,
  padding: '0px',
  border: 'none',
});

const NewsItem = ({ item, locale }) => (
  <div>
    <div style={{ display: 'flex' }}>
      <DivSep width="30%">
        <Img src={item.image} alt={`${item.eid}`} />
      </DivSep>
      <DivSep width="70%" marginLeft="15px">
        <H2>{item.title[locale]}</H2>
      </DivSep>
    </div>
    <div>
      <H3>{item.desc[locale]}</H3>
      <P>{item.text[locale]}</P>
    </div>
  </div>
);

NewsItem.propTypes = {
  item: PropTypes.object,
  locale: PropTypes.string,
};

const MuseumItem = ({ item, locale }) => (
  <div>
    <Link
      to={`/museum/edit/${item.eid}`}
      style={{ textDecoration: 'none', color: '#000' }}
    >
      <div style={{ display: 'flex' }}>
        <DivSep width="10%">
          <Img src={item.logo} alt={`${item.eid}`} />
        </DivSep>
        <DivSep width="30%" marginLeft="15px">
          <Img src={item.image} alt={`${item.eid}`} />
        </DivSep>
        <DivSep width="60%" marginLeft="15px">
          <H2>{item.name[locale]}</H2>
        </DivSep>
      </div>
    </Link>
    <div>
      <P>{item.desc[locale]}</P>
      {getLocations(item.eid, item.location)}
    </div>
  </div>
);

MuseumItem.propTypes = {
  item: PropTypes.object,
  locale: PropTypes.string,
};

const LocationItem = ({ item }) => (
  <div>
    <H2>{item.name}</H2>
    <P>{`${item.latitude},${item.longitude}`}</P>
  </div>
);

LocationItem.propTypes = { item: PropTypes.object };

const QuestItem = ({ item, locale }) => (
  <div>
    <Link
      to={`/scenario/edit/${item.scenario}`}
      style={{ textDecoration: 'none', color: '#000' }}
    >
      <div style={{ display: 'flex' }}>
        <DivSep width="30%">
          <Img src={item.image} alt={`${item.eid}`} />
        </DivSep>
        <DivSep width="70%" marginLeft="15px">
          <H2>{item.name[locale]}</H2>
        </DivSep>
      </div>
    </Link>
    <div>
      <P>{item.desc[locale]}</P>
    </div>
  </div>
);

QuestItem.propTypes = {
  item: PropTypes.object,
  locale: PropTypes.string,
};

const getItem = {
  museum: (item, locale) => () => <MuseumItem item={item} locale={locale} />,
  feed: (item, locale) => () => <NewsItem item={item} locale={locale} />,
  location: item => () => <LocationItem item={item} />,
  quest: (item, locale) => () => <QuestItem item={item} locale={locale} />,
};

const deleteMessages = {
  museum: messages.deleteMuseum,
  feed: messages.deleteFeed,
  location: messages.deleteLocation,
  quest: messages.deleteQuest,
};

export class EditListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { delete: deleteMessages[props.content] };
  }
  render() {
    const { item } = this.props.item;
    const type = this.props.content;
    const locale = getLocale();
    const setting = configs[type];
    const Item = getItem[type](item, locale);
    const content = (
      <Wrapper>
        {this.props.isUpdate ? (
          <Popup
            trigger={
              <i className="fas fa-bars" style={iconStyle(`${colors.base}`)} />
            }
            closeOnDocumentClick
            position="bottom right"
            arrowStyle={arrowStyle}
            contentStyle={contentStyle('100px')}
            lockScroll
          >
            {close => (
              <Nav style={{ right: '0', position: 'absolute' }}>
                <PopupForm
                  trigger={
                    <Button>
                      <FormattedMessage {...messages.edit} />
                    </Button>
                  }
                  item={translateToForm[type](item)}
                  isPopup
                  settings={setting}
                  onSubmit={form =>
                    this.props.onUpdate(translateFromForm[type](form))
                  }
                  onClose={() => close()}
                  isPlaceholder={false}
                  flexDirection="column"
                />
                <MsgBox
                  trigger={
                    <Button>
                      <FormattedMessage {...messages.delete} />
                    </Button>
                  }
                  onSubmit={() => this.props.onDelete(item.eid)}
                  message={this.state.delete}
                  cancel
                />
              </Nav>
            )}
          </Popup>
        ) : (
          <MsgBox
            trigger={
              <i className="fa fa-trash-alt" style={iconStyle('#FF0000')} />
            }
            onSubmit={() => this.props.onDelete(item.eid)}
            message={this.state.delete}
            cancel
          />
        )}
        <Item />
      </Wrapper>
    );

    return <ListItem key={`edit-list-item-${item.eid}`} item={content} />;
  }
}

EditListItem.propTypes = {
  item: PropTypes.object,
  content: PropTypes.oneOf(['museum', 'feed', 'location', 'quest']),
  isUpdate: PropTypes.bool,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default EditListItem;
