import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button } from 'antd';
import DestroyButton from '../../containers/DestroyButton';
import LikeButton from '../../containers/LikeButton';
import ActionBar from '../../containers/Layout/ActionBar';
import { articleShape } from '../../shapes';

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
  goToArticleEdit,
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
    actions.push(<Button key="edit" type="primary" icon="edit" onClick={goToArticleEdit}>{t({ id: 'forms.edit' })}</Button>);
    actions.push(<DestroyButton key="destroy" collection="articles" id={id} baseResourceId={majorId} callback={onDestroy} />);
  }

  return <ActionBar actions={actions} />;
}

ArticleActionBar.propTypes = {
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  article: articleShape.isRequired,
  onDestroy: PropTypes.func.isRequired,
  goToArticleEdit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ArticleActionBar);
