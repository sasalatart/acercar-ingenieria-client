import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import DestroyButton from '../../../containers/DestroyButton';
import ReportButton from '../../Reports/Button';
import ApprovalButton from '../../../containers/ApprovalButton';
import ActionBar from '../../../containers/Layout/ActionBar';
import HideableButton from '../../HideableButton';
import { articleShape, articleSummaryShape } from '../../../shapes';
import routes from '../../../lib/routes';
import collections from '../../../lib/collections';

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
  const commonProps = { collection: collections.articles, id, baseResourceId: majorId };

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
