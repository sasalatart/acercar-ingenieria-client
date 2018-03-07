import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { Button } from 'antd';
import WithAuthorization from '../../hoc/WithAuthorization';
import ActionBar from '../../containers/Layout/ActionBar';
import ROUTES from '../../routes';

function ArticlesActionBar({ loggedIn, majorId, intl: { formatMessage: t } }) {
  const actions = [];

  if (loggedIn) {
    const newArticleHref = ROUTES.ARTICLES_NEW(majorId);
    const linkToNewArticle = (
      <Link to={newArticleHref} href={newArticleHref}>
        <Button type="primary">{t({ id: 'articles.new' })}</Button>
      </Link>
    );
    actions.push(linkToNewArticle);
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
