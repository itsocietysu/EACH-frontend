/* eslint-disable react/no-children-prop */
/**
 * NewsListItem
 *
 * Item of list of news
 */

import React from 'react';
import Popup from 'reactjs-popup';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import ListItem from 'components/ListItem';
import H2 from 'components/H2';
import P from 'components/P';
import PopupEl from 'containers/EditNews';
import Button from 'components/Button';
import Img from 'containers/FeedListItem/Img';
import Wrapper from 'containers/FeedListItem/Wrapper';
import Nav from 'containers/LinkList/Nav';
import messages from './messages';
import { deleteData } from './actions';
import reducer from './reducer';
import saga from './saga';

export class NewsListItem extends React.PureComponent {
  render() {
    const { item } = this.props;

    // Put together the content of the feed
    const content = (
      <Wrapper>
        <Popup
          trigger={
            <img
              src="https://vk.com/images/post_more.png?1"
              alt=""
              style={{ width: '3%', float: 'right', marginTop: '1em' }}
            />
          }
          closeOnDocumentClick
          position="bottom center"
          arrowStyle={{
            border: '2px solid rgb(217, 146, 92)',
            borderLeft: 'none',
            borderTop: 'none',
          }}
          contentStyle={{
            boxShadow: 'none',
            width: '150px',
            padding: '0px',
            border: 'none',
          }}
        >
          <Nav>
            <PopupEl
              trigger={
                <Button children={<FormattedMessage {...messages.edit} />} />
              }
              item={item}
              mod="edit"
            />
            <Button
              children={<FormattedMessage {...messages.delete} />}
              onClick={evt => this.props.onDelete(evt, item.eid)}
            />
          </Nav>
        </Popup>
        <div style={{ display: 'flex' }}>
          <Img src={item.image} alt={`News-${item.eid}`} />
          <H2 style={{ display: 'block', marginLeft: '15px' }}>{item.title}</H2>
        </div>
        <div>
          <P>{item.text}</P>
        </div>
      </Wrapper>
    );

    // Render the content into a list item
    return <ListItem key={`news-list-item-${item.eid}`} item={content} />;
  }
}

NewsListItem.propTypes = {
  item: PropTypes.shape({
    eid: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    image: PropTypes.string,
    title: PropTypes.string,
    text: PropTypes.string,
  }),
  onDelete: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    onDelete: (evt, eid) => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(deleteData(eid));
    },
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'deleteNews', reducer });
const withSaga = injectSaga({ key: 'deleteNews', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(NewsListItem);
