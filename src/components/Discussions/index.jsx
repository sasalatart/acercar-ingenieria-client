import React from 'react';
import { withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import DiscussionsList from '../../containers/Discussions/List';
import ActionBar from './ActionBar';
import Title from '../Layout/Title';
import { matchShape } from '../../shapes';

function Articles({ match: { params }, intl: { formatMessage: t } }) {
  const mine = !!params.mine;

  return (
    <div>
      <ActionBar mine={mine} />
      <Title text={t({ id: mine ? 'discussions.mine' : 'discussions' })} />

      <DiscussionsList mine={mine} />
    </div>
  );
}

Articles.propTypes = {
  match: matchShape.isRequired,
  intl: intlShape.isRequired,
};

export default withRouter(injectIntl(Articles));
