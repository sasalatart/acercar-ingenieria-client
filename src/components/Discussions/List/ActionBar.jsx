import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';
import SearchButtons from '../../../containers/Search/Buttons';
import ActionBar from '../../../containers/Layout/ActionBar';
import ButtonLink from '../../../containers/Layout/ButtonLink';
import { TagsField } from '../../Forms';
import HideableButton from '../../Icons/HideableButton';
import routes from '../../../lib/routes';

function renderExtraFields(t) {
  const defaultTag = t({ id: 'discussions.defaultTag' });

  return (
    <Field
      name="tagList"
      component={TagsField}
      label="Tags"
      options={[{ key: defaultTag, value: defaultTag, label: defaultTag }]}
    />
  );
}

function DiscussionsActionBar({ mine, resetPagination, intl: { formatMessage: t } }) {
  const actions = [
    <SearchButtons
      key="search"
      searchTextLabel={t({ id: 'search.discussions' })}
      beforeSearch={resetPagination}
      extraFilters={['tagList']}
      renderExtraFields={() => renderExtraFields(t)}
    />,
  ];

  const goToLink = mine
    ? (
      <ButtonLink key="goToAllDiscussions" to={routes.discussions}>
        {t({ id: 'discussions' })}
      </ButtonLink>
    )
    : (
      <ButtonLink key="goToMyDiscussions" to={routes.discussionsMine}>
        {t({ id: 'mine' })}
      </ButtonLink>
    );

  const creationLink = (
    <HideableButton to={routes.discussionsNew} icon="plus">
      {t({ id: 'discussions.new' })}
    </HideableButton>
  );

  actions.push(goToLink);
  actions.push(creationLink);

  return <ActionBar actions={actions} />;
}

DiscussionsActionBar.propTypes = {
  mine: PropTypes.bool,
  resetPagination: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

DiscussionsActionBar.defaultProps = {
  mine: false,
};

export default injectIntl(DiscussionsActionBar);
