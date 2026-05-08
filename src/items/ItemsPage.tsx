import * as React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Heading,
} from 'rebass';
import { bindActionCreators, Dispatch } from 'redux';
import { Flex } from 'reflexbox';

import { useAuth0 } from '../auth/Auth0Wrapper';
import FullscreenLoader from '../shared-components/FullscreenLoader';

import { ResponseError } from '../apiService';
import { GlobalState } from '../rootReducer';
import Item from './Item';
import ItemCreator from './ItemCreator';
import ItemsList from './ItemsList';
import { createItem, deleteItem, fetchItems } from './reducer';
import { getError, getIsFetching, getSortedItems } from './selectors';

interface StateProps {
  isFetching: boolean;
  items: Map<string, Item>;
  error?: ResponseError;
}

interface DispatchProps {
  actions: {
    fetchItems: typeof fetchItems,
    createItem: typeof createItem,
    deleteItem: typeof deleteItem,
  };
}

const ItemsPage: React.FC<StateProps & DispatchProps> = ({ actions, isFetching, items }) => {
  const { getIdTokenClaims } = useAuth0();
  const [newItemName, setNewItemName] = React.useState('');
  const [idToken, setIdToken] = React.useState<string | undefined>();

  React.useEffect(
    () => {
      const requestItems = async () => {
        const claims = await getIdTokenClaims();

        if (claims?.__raw) {
          setIdToken(claims.__raw);
          actions.fetchItems(claims.__raw);
        }
      };

      requestItems();
    },
    [],
  );

  if (isFetching || !idToken) {
    return <FullscreenLoader />;
  }

  return (
    <Flex style={{ flex: '1 0 auto' }}>
      <Container style={{ width: '100%' }} pt={3} pb={3}>
        <Heading mb={2} level={3} big>
          Your Items/Tings
        </Heading>
        <ItemCreator
          itemName={newItemName}
          onChangeItem={(itemName: string) => setNewItemName(itemName)}
          onCreateItem={(itemName: string) => {
            actions.createItem(idToken, { name: itemName });
            setNewItemName('');
          }}
        />
        <ItemsList items={items} onDeleteItem={(itemId: string) => actions.deleteItem(idToken, itemId)} />
      </Container>
    </Flex>
  );
};

const mapStateToProps = (state: GlobalState): StateProps => ({
  isFetching: getIsFetching(state),
  items: getSortedItems(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  actions: bindActionCreators({ fetchItems, createItem, deleteItem }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);
