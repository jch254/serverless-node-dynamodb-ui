import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Textarea from 'react-expanding-textarea';
import { Flex } from 'reflexbox';
import Icon from 'react-geomicons';
import { Space } from 'rebass';
import classNames from 'classnames';

import { selectors as authSelectors } from '../auth';

import { updateNewItemName, createItem } from './reducer';
import { getNewItemName } from './selectors';
import styles from './ItemCreator.css';

const ItemCreator = ({ itemName, actions, idToken }) => (
  <Flex mt={2}>
    <Textarea
      rows="1"
      className={styles.itemCreator}
      value={itemName}
      placeholder="Enter an item name..."
      onChange={event => actions.updateNewItemName(event.target.value)}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          actions.createItem(idToken, { name: itemName });
        }
      }}
    />
    <Space auto />
    <div
      onClick={() => {
        if (itemName !== '') {
          actions.createItem(idToken, { name: itemName });
        }
      }}
    >
      <Icon
        name="check"
        width="24px"
        height="24px"
        fill={itemName !== '' ? 'currentColor' : '#999'}
        className={classNames(
          styles.checkButton,
          { [`${styles.pointerCursor}`]: itemName !== '' },
        )}
      />
    </div>
  </Flex>
);

ItemCreator.propTypes = {
  itemName: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired,
  idToken: PropTypes.string.isRequired,
};

const mapStateToProps = state => (
  {
    itemName: getNewItemName(state),
    idToken: authSelectors.getIdToken(state),
  }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators({ updateNewItemName, createItem }, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(ItemCreator);
