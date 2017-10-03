import * as React from 'react';
import {
  Flex,
  Small,
  Text,
} from 'rebass';

import Item from './Item';

const styles = require('./ItemList.css');

interface ItemsListProps {
  items: Map<string, Item>;
  onDeleteItem: (itemId: string) => void;
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
        <Small ml="auto" style={{ minWidth: '200px', textAlign: 'right' }}>
          {item.createdUtc.calendar()}
        </Small>
      </Flex>,
  );

  return (
    <div style={{ marginTop: '16px' }}>
      {displayableItems}
    </div>
  );
};

export default ItemsList;
