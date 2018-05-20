import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import DestroyButton from '../../../containers/DestroyButton';
import LikeButton from '../../../containers/LikeButton';
import EnrollButton from '../../../containers/EnrollButton';
import ReportButton from '../../Reports/Button';
import ApprovalButton from '../../../containers/ApprovalButton';
import ActionBar from '../../../containers/Layout/ActionBar';
import HideableButton from '../../HideableButton';
import { articleShape } from '../../../shapes';
import ROUTES from '../../../routes';

function ArticleActionBar({
  adminOrMajorAdmin,
  isAuthor,
  article: {
    id,
    majorId,
    likedByCurrentUser,
    likesCount,
    enrolledByCurrentUser,
    approved,
  },
  onDestroy,
  intl: { formatMessage: t },
}) {
  const articlesBaseResourceParams = { baseResourceName: 'articles', baseResourceId: id };
  const majorsBaseResourceParams = { collection: 'articles', id, baseResourceId: majorId };

  const approvedActions = [
    <LikeButton
      key="like"
      {...articlesBaseResourceParams}
      likedByCurrentUser={likedByCurrentUser}
      likesCount={likesCount}
    />,
    <EnrollButton
      key="enroll"
      {...articlesBaseResourceParams}
      enrolledByCurrentUser={enrolledByCurrentUser}
    />,
    <ReportButton key="report" {...majorsBaseResourceParams} />,
  ];
  const actions = approved ? approvedActions : [];

  if (adminOrMajorAdmin || isAuthor) {
    const editButton = (
      <HideableButton
        key="edit"
        type="primary"
        icon="edit"
        to={ROUTES.ARTICLE_EDIT(id, majorId)}
      >
        {t({ id: 'forms.edit' })}
      </HideableButton>
    );

    const approvalButton = (
      <ApprovalButton key="approval" {...majorsBaseResourceParams} approved={approved} />
    );

    const destroyButton = (
      <DestroyButton key="destroy" {...majorsBaseResourceParams} callback={onDestroy} />
    );

    actions.push(editButton);
    if (adminOrMajorAdmin) actions.push(approvalButton);
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
