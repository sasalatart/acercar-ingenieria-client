import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getIsAdmin,
  getCurrentUserEntity,
} from '../../store/ducks/sessions';
import {
  collection,
  loadDiscussion,
  getDiscussionEntity,
} from '../../store/ducks/discussions';
import { getIsFetching } from '../../store/ducks/loading';
import DataPlaceholder from '../../components/DataPlaceholder';
import Restricted from '../../components/Routes/Restricted';

class DiscussionPrivileges extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    loadDiscussion: PropTypes.func.isRequired,
  }

  componentWillMount() {
    this.props.loadDiscussion();
  }

  render() {
    if (this.props.loading) {
      return <DataPlaceholder absolute />;
    }

    return <Restricted {...this.props} />;
  }
}

function mapStateToProps(state, ownProps) {
  const params = { ...ownProps.match.params, collection };

  const currentUser = getCurrentUserEntity(state);
  const discussion = getDiscussionEntity(state, params);

  const isAuthor = currentUser && discussion && currentUser.id === discussion.author.id;

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
)(DiscussionPrivileges);
