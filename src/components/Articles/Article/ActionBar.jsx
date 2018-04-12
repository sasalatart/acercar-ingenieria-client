import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import DestroyButton from '../../../containers/DestroyButton';
import LikeButton from '../../../containers/LikeButton';
import EnrollButton from '../../../containers/EnrollButton';
import ActionBar from '../../../containers/Layout/ActionBar';
import HideableButton from '../../HideableButton';
import { articleShape } from '../../../shapes';
import ROUTES from '../../../routes';

function ArticleActionBar({
  loggedIn,
  adminOrMajorAdmin,
  isAuthor,
  article: {
    id,
    majorId,
    likedByCurrentUser,
    likesCount,
    enrolledByCurrentUser,
  },
  onDestroy,
  intl: { formatMessage: t },
}) {
  const actions = [
    <LikeButton
      key="like"
      baseResourceName="articles"
      baseResourceId={id}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
    />,
  ];

  if (loggedIn) {
    const enrollButton = (
      <EnrollButton
        key="enroll"
        baseResourceName="articles"
        baseResourceId={id}
        enrolledByCurrentUser={enrolledByCurrentUser}
      />
    );

    actions.push(enrollButton);
  }

  if (adminOrMajorAdmin || isAuthor) {
    const articleEditButton = (
      <HideableButton
        key="edit"
        type="primary"
        icon="edit"
        to={ROUTES.ARTICLE_EDIT(id, majorId)}
      >
        {t({ id: 'forms.edit' })}
      </HideableButton>
    );

    const destroyButton = (
      <DestroyButton
        key="destroy"
        collection="articles"
        id={id}
        baseResourceId={majorId}
        callback={onDestroy}
      />
    );

    actions.push(articleEditButton);
    actions.push(destroyButton);
  }

  return <ActionBar actions={actions} />;
}

ArticleActionBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  article: articleShape.isRequired,
  onDestroy: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ArticleActionBar);
