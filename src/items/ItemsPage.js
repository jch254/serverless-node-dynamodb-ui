import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Flex } from 'reflexbox';
import {
  Heading,
  Container,
} from 'rebass';
import ImmutablePropTypes from 'react-immutable-proptypes';

import FullscreenLoader from '../shared-components/FullscreenLoader';
import { selectors as authSelectors } from '../auth';

import { fetchItems } from './reducer';
import { getIsFetching, getSortedItems, getError } from './selectors';
import ItemCreator from './ItemCreator';
import ItemsList from './ItemsList';

class ItemsPage extends PureComponent {
  componentDidMount() {
    const { actions, idToken } = this.props;
    actions.fetchItems(idToken);
  }

  render() {
    const { isFetching, idToken, items } = this.props;

    return isFetching ?
      <FullscreenLoader /> :
      <Flex style={{ flex: '1 0 auto' }}>
        <Container style={{ width: '100%' }} pt={3} pb={3}>
          <Heading mb={2} level={2} big>
            Your Items
          </Heading>
          <ItemCreator />
          <ItemsList idToken={idToken} items={items} />
        </Container>
      </Flex>;
  }
}

ItemsPage.propTypes = {
  actions: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  idToken: PropTypes.string.isRequired,
  items: ImmutablePropTypes.map.isRequired,
};

const mapStateToProps = state => (
  {
    isFetching: getIsFetching(state),
    items: getSortedItems(state),
    error: getError(state),
    idToken: authSelectors.getIdToken(state),
  }
);

const mapDispatchToProps = dispatch => (
  { actions: bindActionCreators({ fetchItems }, dispatch) }
);

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);
