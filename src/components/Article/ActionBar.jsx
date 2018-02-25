import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Button } from 'antd';
import DestroyButton from '../../containers/Articles/DestroyButton';
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
  hasAdminPrivileges,
  isAuthor,
  goToArticleEdit,
  intl: { formatMessage: t },
}) {
  const actions = [
    <LikeButton
      key="like"
      collectionName="articles"
      resourceId={id}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
    />,
  ];

  if (hasAdminPrivileges || isAuthor) {
    actions.push(<Button key="edit" type="primary" icon="edit" onClick={goToArticleEdit}>{t({ id: 'forms.edit' })}</Button>);
    actions.push(<DestroyButton key="destroy" id={id} majorId={majorId} />);
  }

  return <ActionBar actions={actions} />;
}

ArticleActionBar.propTypes = {
  hasAdminPrivileges: PropTypes.bool.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  article: articleShape.isRequired,
  goToArticleEdit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ArticleActionBar);
