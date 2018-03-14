import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  getIsAdmin,
  getCurrentUserEntity,
} from '../../store/ducks/sessions';
import {
  loadDiscussion,
  getDiscussionEntity,
} from '../../store/ducks/discussions';
import Spinner from '../../components/Spinner';
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
      return <Spinner absolute />;
    }

    return <Restricted {...this.props} />;
  }
}

function mapStateToProps(state, ownProps) {
  const { params } = ownProps.match;

  const currentUser = getCurrentUserEntity(state);
  const discussion = getDiscussionEntity(state, params);

  const isAuthor = currentUser && discussion && currentUser.id === discussion.author.id;

  return {
    loading: !discussion,
    restrictedCondition: getIsAdmin(state) || isAuthor,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { discussionId } = ownProps.match.params;

  return {
    loadDiscussion: () => dispatch(loadDiscussion(discussionId)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DiscussionPrivileges);
