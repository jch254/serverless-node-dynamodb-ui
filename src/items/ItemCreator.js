import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Textarea from 'react-expanding-textarea';
import { Flex } from 'reflexbox';
import Icon from 'react-geomicons';
import { Space } from 'rebass';
import classNames from 'classnames';

import { updateNewItemName, createItem } from './reducer';
import { getNewItemName } from './selectors';

import styles from './ItemCreator.css';

const ItemCreator = ({ itemName, actions }, context) => (
  <Flex mt={1} align="center">
    <Textarea
      rows="1"
      className={styles.itemCreator}
      value={itemName}
      placeholder="Enter a name, then click the button..."
      onChange={event => actions.updateNewItemName(event.target.value)}
      onKeyPress={(event) => {
        if (event.key === 'Enter') {
          actions.createItem({ name: itemName });
          context.router.push('/items');
        }
      }}
    />
    <Space auto />
    <div
      onClick={() => {
        if (itemName !== '') {
          actions.createItem({ name: itemName });
          context.router.push('/items');
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
};

ItemCreator.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = state => (
  {
    itemName: getNewItemName(state),
  }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators({ updateNewItemName, createItem }, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(ItemCreator);
