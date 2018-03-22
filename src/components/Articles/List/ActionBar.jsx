import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import WithAuthorization from '../../../hoc/WithAuthorization';
import ActionBar from '../../../containers/Layout/ActionBar';
import ButtonLink from '../../../containers/ButtonLink';
import ROUTES from '../../../routes';

function ArticlesActionBar({ loggedIn, majorId, intl: { formatMessage: t } }) {
  const actions = [];

  if (loggedIn) {
    const newArticleHref = ROUTES.ARTICLES_NEW(majorId);
    actions.push(<ButtonLink to={newArticleHref} content={t({ id: 'articles.new' })} />);
  }

  return <ActionBar actions={actions} />;
}

ArticlesActionBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  majorId: PropTypes.number,
  intl: intlShape.isRequired,
};

ArticlesActionBar.defaultProps = {
  majorId: undefined,
};

export default injectIntl(WithAuthorization(ArticlesActionBar));
