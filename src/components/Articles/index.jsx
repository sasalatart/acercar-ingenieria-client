import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ArticlesList from '../../containers/Articles/List';

function Articles({ majorId, intl: { formatMessage: t } }) {
  return (
    <div>
      <h1>{t({ id: 'articles' })}</h1>
      <ArticlesList majorId={majorId} />
    </div>
  );
}

Articles.propTypes = {
  majorId: PropTypes.number,
  intl: intlShape.isRequired,
};

Articles.defaultProps = {
  majorId: undefined,
};

export default injectIntl(Articles);
