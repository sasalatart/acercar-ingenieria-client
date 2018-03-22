import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import WithAuthorization from '../../../hoc/WithAuthorization';
import ActionBar from '../../../containers/Layout/ActionBar';
import ButtonLink from '../../../containers/ButtonLink';
import ROUTES from '../../../routes';

function DiscussionsActionBar({ loggedIn, mine, intl: { formatMessage: t } }) {
  const actions = [];

  if (loggedIn) {
    const newDiscussionHref = ROUTES.DISCUSSIONS_NEW;
    actions.push(<ButtonLink to={newDiscussionHref} content={t({ id: 'discussions.new' })} />);
  }

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
  loggedIn: PropTypes.bool.isRequired,
  mine: PropTypes.bool,
  intl: intlShape.isRequired,
};

DiscussionsActionBar.defaultProps = {
  mine: false,
};

export default injectIntl(WithAuthorization(DiscussionsActionBar));
