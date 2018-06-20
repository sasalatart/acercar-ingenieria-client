import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pick from 'lodash/pick';
import { destroyAccount } from '../store/ducks/sessions';
import { destroyUser } from '../store/ducks/users';
import { destroyAnnouncement } from '../store/ducks/announcements';
import { destroyMajor } from '../store/ducks/majors';
import { destroyQuestion } from '../store/ducks/questions';
import { destroyArticle } from '../store/ducks/articles';
import { destroyDiscussion } from '../store/ducks/discussions';
import { destroyComment } from '../store/ducks/comments';
import { destroyVideoLink } from '../store/ducks/video-links';
import { destroyCredit } from '../store/ducks/credits';
import { getIsDestroying } from '../store/ducks/loading';
import ImportantDestroyButton from '../components/DestroyButton/Important';
import DestroyButton from '../components/DestroyButton';
import collections from '../lib/collections';

function DestroyButtonWrapper(props) {
  return props.important
    ? <ImportantDestroyButton {...props} />
    : <DestroyButton {...props} />;
}

DestroyButtonWrapper.propTypes = {
  important: PropTypes.bool,
};

DestroyButtonWrapper.defaultProps = {
  important: false,
};

function getDestroyAction(ownProps) {
  const {
    collection, id, baseResourceName, baseResourceId,
  } = ownProps;

  switch (collection) {
    case 'auth':
      return destroyAccount();
    case collections.users:
      return destroyUser(id, baseResourceId);
    case collections.announcements:
      return destroyAnnouncement(id);
    case collections.majors:
      return destroyMajor(id);
    case collections.questions:
      return destroyQuestion(id, baseResourceId);
    case collections.articles:
      return destroyArticle(id, baseResourceId);
    case collections.discussions:
      return destroyDiscussion(id);
    case collections.comments:
      return destroyComment(id, baseResourceName, baseResourceId);
    case collections.videoLinks:
      return destroyVideoLink(id, baseResourceName, baseResourceId);
    case collections.credits:
      return destroyCredit(id);
    default:
      return undefined;
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: getIsDestroying(state, pick(ownProps, 'collection', 'id')),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onDestroy: () => dispatch(getDestroyAction(ownProps))
      .then(() => ownProps.callback && ownProps.callback()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DestroyButtonWrapper);
