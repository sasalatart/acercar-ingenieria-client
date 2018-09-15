import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { destroyAccount, getIsDestroyingAccount } from '../../store/ducks/sessions';
import { destroyUser, getIsDestroyingUser } from '../../store/ducks/users';
import { destroyAnnouncement, getIsDestroyingAnnouncement } from '../../store/ducks/announcements';
import { destroyMajor, getIsDestroyingMajor } from '../../store/ducks/majors';
import { destroyQuestion, getIsDestroyingQuestion } from '../../store/ducks/questions';
import { destroyArticle, getIsDestroyingArticle } from '../../store/ducks/articles';
import { destroyDiscussion, getIsDestroyingDiscussion } from '../../store/ducks/discussions';
import { destroyComment, getIsDestroyingComment } from '../../store/ducks/comments';
import { destroyVideoLink, getIsDestroyingVideoLink } from '../../store/ducks/video-links';
import { destroyCredit, getIsDestroyingCredit } from '../../store/ducks/credits';
import ImportantDestroyButton from '../../components/DestroyButton/Important';
import DestroyButton from '../../components/DestroyButton';
import collections from '../../lib/collections';

function DestroyButtonWrapper(props) {
  const Component = props.important ? ImportantDestroyButton : DestroyButton;
  return <Component {...props} />;
}

DestroyButtonWrapper.propTypes = {
  important: PropTypes.bool,
};

DestroyButtonWrapper.defaultProps = {
  important: false,
};

function getDestroyFunctions(collection) {
  switch (collection) {
    case collections.users:
      return {
        action: destroyUser,
        selector: getIsDestroyingUser,
      };
    case collections.announcements:
      return {
        action: destroyAnnouncement,
        selector: getIsDestroyingAnnouncement,
      };
    case collections.majors:
      return {
        action: destroyMajor,
        selector: getIsDestroyingMajor,
      };
    case collections.questions:
      return {
        action: destroyQuestion,
        selector: getIsDestroyingQuestion,
      };
    case collections.articles:
      return {
        action: destroyArticle,
        selector: getIsDestroyingArticle,
      };
    case collections.discussions:
      return {
        action: destroyDiscussion,
        selector: getIsDestroyingDiscussion,
      };
    case collections.comments:
      return {
        action: destroyComment,
        selector: getIsDestroyingComment,
      };
    case collections.videoLinks:
      return {
        action: destroyVideoLink,
        selector: getIsDestroyingVideoLink,
      };
    case collections.credits:
      return {
        action: destroyCredit,
        selector: getIsDestroyingCredit,
      };
    default:
      return {
        action: destroyAccount,
        selector: getIsDestroyingAccount,
      };
  }
}

function mapStateToProps(state, { collection, id }) {
  return {
    loading: getDestroyFunctions(collection).selector(state, { id }),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const {
    collection, id, baseCollection, baseId, callback,
  } = ownProps;

  return {
    onDestroy: () => dispatch(getDestroyFunctions(collection).action(id, baseCollection, baseId))
      .then(() => callback && callback()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DestroyButtonWrapper);
