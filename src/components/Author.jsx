import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import ProfileLink from './Users/Profile/Link';
import { userSummaryShape } from '../shapes';

const styles = {
  author: {
    fontWeight: 'bold',
    fontSize: '1.25em',
    margin: '5px 0',
  },
};

function Author({ author, spanned, intl: { formatMessage: t } }) {
  const content = (
    <span>
      <span>{t({ id: 'submittedBy' })}</span>
      <ProfileLink id={author.id}>{author.firstName} {author.lastName}</ProfileLink>
    </span>
  );

  return spanned
    ? content
    : <p style={styles.author}>{content}</p>;
}

Author.propTypes = {
  author: userSummaryShape.isRequired,
  spanned: PropTypes.bool,
  intl: intlShape.isRequired,
};

Author.defaultProps = {
  spanned: false,
};

export default injectIntl(Author);
