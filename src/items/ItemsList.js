import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Heading,
  Text,
  Space,
} from 'rebass';
import { Flex } from 'reflexbox';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { deleteItem } from './reducer';

import styles from './ItemList.css';

const ItemsList = ({ items, actions }) => {
  const displayableItems = items
    .entrySeq()
    .map(([id, item]) =>
      <Flex key={id}>
        <Heading
          level={2}
          onClick={() => actions.deleteItem(id)}
          _className={styles.listItem}
        >
          {item.get('name')}
        </Heading>
        <Space auto />
        <Text color="#999">
          {item.get('createdUtc').format('hh:mm MMM DD YYYY')}
        </Text>
      </Flex>,
  );

  return (
    <div>
      {displayableItems}
      <Flex>
        <Space auto />
        <Text mt={2} color="#999">
          All times UTC (+0000)
        </Text>
      </Flex>

    </div>
  );
};

ItemsList.propTypes = {
  items: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.object.isRequired,
};

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators({ deleteItem }, dispatch) }
);

export default connect(null, mapDispatchToProps)(ItemsList);
