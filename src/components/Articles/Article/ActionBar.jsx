import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import DestroyButton from '../../../containers/DestroyButton';
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
    approved,
  },
  onDestroy,
  intl: { formatMessage: t },
}) {
  const commonProps = { collection: 'articles', id, baseResourceId: majorId };

  const actions = approved ? [<ReportButton key="report" {...commonProps} />] : [];

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
      <ApprovalButton key="approval" {...commonProps} approved={approved} />
    );

    const destroyButton = (
      <DestroyButton key="destroy" {...commonProps} callback={onDestroy} />
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
