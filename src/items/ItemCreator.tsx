import * as classNames from 'classnames';
import * as React from 'react';
import Textarea from 'react-expanding-textarea';
import Icon from 'react-geomicons';
import { Space } from 'rebass';
import { Flex } from 'reflexbox';

const styles = require('./ItemCreator.css');

interface ItemCreatorProps {
  itemName: string;
  onChangeItem: (text: string) => void;
  onCreateItem: (text: string) => void;
}

const ItemCreator: React.StatelessComponent<ItemCreatorProps> = ({
  itemName,
  onChangeItem,
  onCreateItem,
}) => (
  <Flex mt={2}>
    <Textarea
      rows="1"
      className={styles.itemCreator}
      value={itemName}
      placeholder="Enter an item name..."
      onChange={(event: any) => onChangeItem(event.target.value)}
      onKeyPress={(event: any) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          onCreateItem(itemName);
        }
      }}
    />
    <Space auto />
    <div
      onClick={() => {
        if (itemName !== '') {
          onCreateItem(itemName);
        }
      }}
    >
      <Icon
        name="check"
        width="22px"
        height="22px"
        fill={itemName !== '' ? 'currentColor' : '#999'}
        className={classNames(
          styles.checkButton,
          { [`${styles.pointerCursor}`]: itemName !== '' },
        )}
      />
    </div>
  </Flex>
);

export default ItemCreator;
