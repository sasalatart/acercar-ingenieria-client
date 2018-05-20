import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import DestroyButton from '../../../containers/DestroyButton';
import LikeButton from '../../../containers/LikeButton';
import EnrollButton from '../../../containers/EnrollButton';
import ReportButton from '../../Reports/Button';
import ActionBar from '../../../containers/Layout/ActionBar';
import ButtonLink from '../../../containers/ButtonLink';
import { discussionShape } from '../../../shapes';
import ROUTES from '../../../routes';

function DiscussionActionBar({
  admin,
  isAuthor,
  discussion: {
    id,
    likedByCurrentUser,
    likesCount,
    enrolledByCurrentUser,
  },
  onDestroy,
  intl: { formatMessage: t },
}) {
  const discussionsBaseResourceParams = { baseResourceName: 'discussions', baseResourceId: id };
  const discussionsCollectionParams = { collection: 'discussions', id };

  const actions = [
    <LikeButton
      key="like"
      {...discussionsBaseResourceParams}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
    />,
    <EnrollButton
      key="enroll"
      {...discussionsBaseResourceParams}
      enrolledByCurrentUser={enrolledByCurrentUser}
    />,
    <ReportButton key="report" {...discussionsCollectionParams} />,
  ];

  if (admin || isAuthor) {
    const editButton = (
      <ButtonLink key="edit" to={ROUTES.DISCUSSION_EDIT(id)} icon="edit">
        {t({ id: 'forms.edit' })}
      </ButtonLink>
    );

    const destroyButton = (
      <DestroyButton key="destroy" {...discussionsCollectionParams} callback={onDestroy} />
    );

    actions.push(editButton);
    actions.push(destroyButton);
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
