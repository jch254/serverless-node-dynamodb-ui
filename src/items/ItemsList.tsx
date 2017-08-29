import * as React from 'react';
import {
  Space,
  Text,
} from 'rebass';
import { Flex } from 'reflexbox';

import Item from './Item';
import { DeleteItem } from './reducer';

const styles = require('./ItemList.css');

interface ItemsListProps {
  items: Map<string, Item>;
  onDeleteItem: (itemId: string) => DeleteItem;
}

const ItemsList: React.StatelessComponent<ItemsListProps> = ({
  items,
  onDeleteItem,
}) => {
  const displayableItems = [...items]
    .map(([id, item]) =>
      <Flex key={id} onClick={() => onDeleteItem(id)} align="center" justify="center" className={styles.listItem}>
        <Text>
          {item.name}
        </Text>
        <Space auto />
        <Text small style={{ minWidth: '200px', textAlign: 'right' }}>
          {item.createdUtc.calendar()}
        </Text>
      </Flex>,
  );

  return (
    <div style={{ marginTop: '16px' }}>
      {displayableItems}
    </div>
  );
};

export default ItemsList;
