import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../containers/Layout/ActionBar';
import ButtonLink from '../../containers/ButtonLink';
import ROUTES from '../../routes';

function DiscussionsActionBar({ mine, intl: { formatMessage: t } }) {
  const actions = [];

  actions.push(mine
    ? (
      <ButtonLink
        key="goToAllDiscussions"
        to={ROUTES.DISCUSSIONS}
        content={t({ id: 'discussions' })}
      />
    )
    : (
      <ButtonLink
        key="goToMyDiscussions"
        to={ROUTES.MY_DISCUSSIONS}
        content={t({ id: 'discussions.mine' })}
      />
    ));

  return <ActionBar actions={actions} />;
}

DiscussionsActionBar.propTypes = {
  mine: PropTypes.bool,
  intl: intlShape.isRequired,
};

DiscussionsActionBar.defaultProps = {
  mine: false,
};

export default injectIntl(DiscussionsActionBar);
