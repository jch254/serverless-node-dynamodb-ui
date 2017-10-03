import * as React from 'react';
import { connect } from 'react-redux';
import {
  Container,
  Heading,
} from 'rebass';
import { bindActionCreators, Dispatch } from 'redux';

import { getIdToken } from '../auth/selectors';
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
  idToken: string;
}

interface DispatchProps {
  actions: {
    fetchItems: typeof fetchItems,
    createItem: typeof createItem,
    deleteItem: typeof deleteItem,
  };
}

interface ItemsPageState {
  newItemName: string;
}

class ItemsPage extends React.PureComponent<StateProps & DispatchProps, ItemsPageState> {
  constructor(props: StateProps & DispatchProps) {
    super(props);

    this.state = {
      newItemName: '',
    };
  }

  componentDidMount() {
    const { actions, idToken } = this.props;

    actions.fetchItems(idToken);
  }

  render() {
    const { actions, idToken, isFetching, items } = this.props;
    const { newItemName } = this.state;

    return isFetching ?
      <FullscreenLoader /> :
      <Container w={1} style={{ flex: 'auto' }} pt={3} pb={3}>
        <Heading pb={2} f={8}>
          Your Items/Tings
        </Heading>
        <ItemCreator
          itemName={newItemName}
          onChangeItem={(itemName: string) => this.setState({ newItemName: itemName })}
          onCreateItem={(itemName: string) => {
            actions.createItem(idToken, { name: itemName });
            this.setState({ newItemName: '' });
          }}
        />
        <ItemsList items={items} onDeleteItem={(itemId: string) => actions.deleteItem(idToken, itemId)}/>
      </Container>;
  }
}

const mapStateToProps = (state: GlobalState, ownProps: {}): StateProps => ({
  isFetching: getIsFetching(state),
  items: getSortedItems(state),
  error: getError(state),
  idToken: getIdToken(state) as string,
});

const mapDispatchToProps = (dispatch: Dispatch<any>): DispatchProps => ({
  actions: bindActionCreators({ fetchItems, createItem, deleteItem }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);
