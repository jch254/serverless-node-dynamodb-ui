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

const ItemsList = ({ items, actions, idToken }) => {
  const displayableItems = items
    .entrySeq()
    .map(([id, item]) =>
      <Flex key={id}>
        <Heading
          level={2}
          onClick={() => actions.deleteItem(idToken, id)}
          _className={styles.listItem}
        >
          {item.get('name')}
        </Heading>
        <Space auto />
        <Text color="#999" style={{ minWidth: '200px', textAlign: 'right' }}>
          {item.get('createdUtc').calendar()}
        </Text>
      </Flex>,
  );

  return (
    <div style={{ marginTop: '16px' }}>
      {displayableItems}
    </div>
  );
};

ItemsList.propTypes = {
  items: ImmutablePropTypes.map.isRequired,
  actions: PropTypes.object.isRequired,
  idToken: PropTypes.string.isRequired,
};

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators({ deleteItem }, dispatch) }
);

export default connect(null, mapDispatchToProps)(ItemsList);
