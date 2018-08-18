import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import ProfileLink from './Users/Profile/Link';
import { userSummaryShape } from '../shapes';

const styles = {
  author: {
    fontWeight: 'bold',
    fontSize: '1.25em',
    margin: '5px 0',
  },
};

function Author({ author, spanned }) {
  const content = (
    <span>
      <span><FormattedMessage id="submittedBy" /></span>
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
};

Author.defaultProps = {
  spanned: false,
};

export default Author;
