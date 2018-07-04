import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../../containers/Layout/ActionBar';
import DestroyButton from '../../../containers/DestroyButton';
import ApprovalButton from '../../../containers/ApprovalButton';
import ReportButton from '../../Reports/Button';
import HideableButton from '../../Icons/HideableButton';
import { articleShape, articleSummaryShape } from '../../../shapes';
import routes from '../../../lib/routes';
import { getCollectionParams } from '../../../lib/articles';

function ArticleActionBar({
  adminOrMajorAdmin,
  isAuthor,
  article: {
    id,
    majorSummary,
    approved,
  },
  onDestroy,
  intl: { formatMessage: t },
}) {
  const majorId = majorSummary && majorSummary.id;
  const commonProps = getCollectionParams(majorId, { id });

  const actions = approved ? [<ReportButton key="report" {...commonProps} />] : [];

  if (adminOrMajorAdmin || isAuthor) {
    const editButton = (
      <HideableButton
        key="edit"
        type="primary"
        icon="edit"
        to={routes.articleEdit(id, majorId)}
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
  article: PropTypes.oneOfType([
    articleShape,
    articleSummaryShape,
  ]).isRequired,
  onDestroy: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(ArticleActionBar);
