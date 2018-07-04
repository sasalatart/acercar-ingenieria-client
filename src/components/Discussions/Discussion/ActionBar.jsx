import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import withAuthorization from '../../../hoc/withAuthorization';
import DestroyButton from '../../../containers/DestroyButton';
import ActionBar from '../../../containers/Layout/ActionBar';
import ButtonLink from '../../../containers/Layout/ButtonLink';
import ReportButton from '../../Reports/Button';
import routes from '../../../lib/routes';
import collections from '../../../lib/collections';

function DiscussionActionBar({
  id,
  admin,
  isAuthor,
  onDestroy,
  intl: { formatMessage: t },
}) {
  const commonProps = { collection: collections.discussions, id };

  const actions = [<ReportButton key="report" {...commonProps} />];

  if (admin || isAuthor) {
    const editButton = (
      <ButtonLink key="edit" to={routes.discussionEdit(id)} icon="edit">
        {t({ id: 'forms.edit' })}
      </ButtonLink>
    );

    const destroyButton = (
      <DestroyButton key="destroy" callback={onDestroy} {...commonProps} />
    );

    actions.push(editButton);
    actions.push(destroyButton);
  }

  return <ActionBar actions={actions} />;
}

DiscussionActionBar.propTypes = {
  id: PropTypes.number.isRequired,
  admin: PropTypes.bool.isRequired,
  isAuthor: PropTypes.bool.isRequired,
  onDestroy: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(withAuthorization(DiscussionActionBar));
