import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import DestroyButton from '../../../containers/DestroyButton';
import LikeButton from '../../../containers/LikeButton';
import ButtonLink from '../../../containers/ButtonLink';
import ActionBar from '../../../containers/Layout/ActionBar';
import { articleShape } from '../../../shapes';
import ROUTES from '../../../routes';

function ArticleActionBar({
  article: {
    id,
    majorId,
    likedByCurrentUser,
    likesCount,
  },
  adminOrMajorAdmin,
  isAuthor,
  onDestroy,
  intl: { formatMessage: t },
}) {
  const actions = [
    <LikeButton
      key="like"
      collection="articles"
      id={id}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
    />,
  ];

  if (adminOrMajorAdmin || isAuthor) {
    const articleEditButton = (
      <ButtonLink
        key="edit"
        type="primary"
        icon="edit"
        to={ROUTES.ARTICLE_EDIT(id, majorId)}
      >
        {t({ id: 'forms.edit' })}
      </ButtonLink>
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
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  article: articleShape.isRequired,
  onDestroy: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ArticleActionBar);
