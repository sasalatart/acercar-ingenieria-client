import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getIsAdmin,
  getCurrentUserId,
} from '../../store/ducks/sessions';
import { loadDiscussion, getDiscussionEntity } from '../../store/ducks/discussions';
import { getIsFetching } from '../../store/ducks/loading';
import DataPlaceholder from '../../components/DataPlaceholder';
import Restricted from '../../components/Routes/Restricted';
import collections from '../../lib/collections';

class DiscussionAdministration extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loadDiscussion: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.loadDiscussion();
  }

  render() {
    return this.props.loading
      ? <DataPlaceholder absolute />
      : <Restricted {...this.props} />;
  }
}

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection: collections.discussions };
  const discussion = getDiscussionEntity(state, params);

  const isAuthor = discussion && getCurrentUserId(state) === discussion.author.id;

  return {
    loading: !discussion && getIsFetching(state, params),
    restrictedCondition: getIsAdmin(state) || isAuthor,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id } = ownProps.match.params;

  return {
    loadDiscussion: () => dispatch(loadDiscussion(id)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiscussionAdministration);
