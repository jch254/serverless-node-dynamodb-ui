import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import functional from 'react-functional';
import { Flex } from 'reflexbox';
import {
  Heading,
  Container,
} from 'rebass';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { fetchItems } from './reducer';
import { getIsFetching, getSortedItems, getError } from './selectors';
import ItemsList from './ItemsList';
import FullscreenLoader from '../shared-components/FullscreenLoader';

const ItemsPage = ({ isFetching, items }) => (
  isFetching ?
    <FullscreenLoader /> :
      <Flex style={{ flex: '1 0 auto' }}>
        <Container style={{ width: '100%' }} pt={3} pb={3}>
          <Heading my={1} size={1} big>
            Items/Tings
          </Heading>
          <ItemsList items={items} />
        </Container>
      </Flex>
);

ItemsPage.componentDidMount = ({ actions }) => actions.fetchItems();

ItemsPage.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  items: ImmutablePropTypes.map.isRequired,
};

const mapStateToProps = state => (
  {
    isFetching: getIsFetching(state),
    items: getSortedItems(state),
    error: getError(state),
  }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators({ fetchItems }, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(functional(ItemsPage));
