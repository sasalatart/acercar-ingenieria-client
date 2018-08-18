import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import SearchButtons from '../../../containers/Search/Buttons';
import ActionBar from '../../../containers/Layout/ActionBar';
import ButtonLink from '../../../containers/Layout/ButtonLink';
import { TagsField } from '../../Forms';
import HideableButton from '../../Icons/HideableButton';
import routes from '../../../lib/routes';

function renderExtraFields() {
  const defaultTag = 'Acercar Ingeniería';
  return (
    <Field
      name="tagList"
      component={TagsField}
      label="Tags"
      options={[{ key: defaultTag, value: defaultTag, label: defaultTag }]}
    />
  );
}

function DiscussionsActionBar({ mine, resetPagination }) {
  const actions = [
    <SearchButtons
      key="search"
      searchTextLabel={<FormattedMessage id="search.discussions" />}
      beforeSearch={resetPagination}
      extraFilters={['tagList']}
      renderExtraFields={renderExtraFields}
    />,
  ];

  const goToLink = mine
    ? (
      <ButtonLink key="goToAllDiscussions" to={routes.discussions}>
        <FormattedMessage id="discussions" />
      </ButtonLink>
    )
    : (
      <ButtonLink key="goToMyDiscussions" to={routes.discussionsMine}>
        <FormattedMessage id="mine" />
      </ButtonLink>
    );

  const creationLink = (
    <HideableButton to={routes.discussionsNew} icon="plus">
      <FormattedMessage id="discussions.new" />
    </HideableButton>
  );

  actions.push(goToLink);
  actions.push(creationLink);

  return <ActionBar actions={actions} />;
}

DiscussionsActionBar.propTypes = {
  mine: PropTypes.bool,
  resetPagination: PropTypes.func.isRequired,
};

DiscussionsActionBar.defaultProps = {
  mine: false,
};

export default DiscussionsActionBar;
