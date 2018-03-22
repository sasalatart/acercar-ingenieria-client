import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import DestroyButton from '../../../containers/DestroyButton';
import LikeButton from '../../../containers/LikeButton';
import ActionBar from '../../../containers/Layout/ActionBar';
import ButtonLink from '../../../containers/ButtonLink';
import { discussionShape } from '../../../shapes';
import ROUTES from '../../../routes';

function DiscussionActionBar({
  admin,
  isAuthor,
  discussion: { id, likedByCurrentUser, likesCount },
  onDestroy,
  intl: { formatMessage: t },
}) {
  const actions = [
    <LikeButton
      key="like"
      collection="discussions"
      id={id}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
    />,
  ];

  if (admin || isAuthor) {
    actions.push(<ButtonLink key="edit" to={ROUTES.DISCUSSION_EDIT(id)} icon="edit" content={t({ id: 'forms.edit' })} />);
    actions.push(<DestroyButton key="destroy" collection="discussions" id={id} callback={onDestroy} />);
  }

  return <ActionBar actions={actions} />;
}

DiscussionActionBar.propTypes = {
  admin: PropTypes.bool.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  discussion: discussionShape.isRequired,
  onDestroy: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default DiscussionActionBar;
