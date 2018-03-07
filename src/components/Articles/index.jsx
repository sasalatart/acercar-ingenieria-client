import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ArticlesList from '../../containers/Articles/List';
import ArticlesActionBar from './ActionBar';
import Title from '../Layout/Title';

function Articles({ majorId, intl: { formatMessage: t } }) {
  return (
    <div>
      <ArticlesActionBar majorId={majorId} />
      <Title text={t({ id: 'articles' })} />

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
