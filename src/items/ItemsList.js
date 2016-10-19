import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Heading,
  Text,
} from 'rebass';
import { Flex } from 'reflexbox';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { deleteItem } from './reducer';

import styles from './ItemList.css';

const ItemsList = ({ items, actions }) => {
  const displayableItems = items
    .entrySeq()
    .map(([id, item]) =>
      <Flex key={id} align="center">
        <Heading
          level={4}
          big
          onClick={() => actions.deleteItem(id)}
          _className={styles.listItem}
        >
          {item.get('name')}
        </Heading>
        <Text ml={2} color="#999">
          {item.get('createdUtc').format('MMM DD YYYY')}
        </Text>
      </Flex>
  );

  return (
    <div>
      {displayableItems}
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
