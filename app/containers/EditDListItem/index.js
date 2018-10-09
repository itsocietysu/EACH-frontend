/* eslint-disable react/no-children-prop,no-param-reassign */
/**
 * EditListItem
 *
 * Item of list for editing data
 */

import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { getLocale } from '../../cookieManager';

import ListItem from '../../components/ListItem';
import H2 from '../../components/H2';
import H3 from '../../components/H3';
import P from '../../components/P';
import PopupForm from '../EditDForm';
import Button from '../../components/Button';
import Img from '../FeedListItem/Img';
import DivSep from '../FeedListItem/DivSep';
import Wrapper from '../FeedListItem/Wrapper';
import Nav from '../LinkList/Nav';
import MsgBox from '../../components/MsgBox';
import messages from './messages';

import { DEFAULT_LOCALE } from '../../i18n';

const iconStyle = color => ({
  float: 'right',
  marginTop: '1em',
  cursor: 'pointer',
  color,
});

export const arrowStyle = {
  border: '2px solid rgb(217, 146, 92)',
  borderLeft: 'none',
  borderTop: 'none',
};

export const contentStyle = maxWidth => ({
  boxShadow: 'none',
  maxWidth,
  padding: '0px',
  border: 'none',
});

const NewsMuseumsItem = ({ item, settings, locale }) => (
  <div>
    <div style={{ display: 'flex' }}>
      <DivSep width="30%">
        <Img src={item[settings.images[0].field]} alt={`${item.eid}`} />
      </DivSep>
      <DivSep width="70%" marginLeft="15px">
        <H2>{item[settings.title][locale]}</H2>
      </DivSep>
    </div>
    <div>
      <H3>{item.desc[locale]}</H3>
      <P>{settings.news && item.text[locale]}</P>
    </div>
  </div>
);

NewsMuseumsItem.propTypes = {
  item: PropTypes.object,
  settings: PropTypes.object,
  locale: PropTypes.string,
};

const LocationItem = ({ item }) => (
  <div>
    <H2>{item.name}</H2>
    <P>{`${item.latitude},${item.longitude}`}</P>
  </div>
);

LocationItem.propTypes = { item: PropTypes.object };

export class EditDListItem extends React.PureComponent {
  constructor(props) {
    super(props);
    if (props.settings.museum) this.state = { delete: messages.deleteMuseum };
    if (props.settings.news) this.state = { delete: messages.deleteFeed };
    if (props.settings.location)
      this.state = { delete: messages.deleteLocation };
  }
  render() {
    const { item } = this.props.item;
    const { settings } = this.props;
    const locale = getLocale() || DEFAULT_LOCALE;
    let Item = <div />;
    if (settings.museum || settings.news)
      Item = () => (
        <NewsMuseumsItem item={item} settings={settings} locale={locale} />
      );
    if (settings.location) Item = () => <LocationItem item={item} />;
    const content = (
      <Wrapper>
        {this.props.isUpdate ? (
          <Popup
            trigger={
              <i
                className="fas fa-bars"
                style={iconStyle('rgb(217, 146, 92)')}
              />
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
                  item={item}
                  isPopup
                  mod="edit"
                  settings={this.props.settings}
                  onSubmit={this.props.onUpdate}
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

EditDListItem.propTypes = {
  item: PropTypes.object,
  settings: PropTypes.object,
  isUpdate: PropTypes.bool,
  onDelete: PropTypes.func,
  onUpdate: PropTypes.func,
};

export default EditDListItem;
