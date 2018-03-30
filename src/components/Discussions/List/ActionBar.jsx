import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import SearchButtons from '../../../containers/Search/Buttons';
import ActionBar from '../../../containers/Layout/ActionBar';
import ButtonLink from '../../../containers/ButtonLink';
import { TagsField } from '../../Forms';
import ROUTES from '../../../routes';

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

function DiscussionsActionBar({
  loggedIn,
  mine,
  resetPagination,
  intl: { formatMessage: t },
}) {
  const actions = [
    <SearchButtons
      key="search"
      searchTextLabel={t({ id: 'search.discussions' })}
      beforeSearch={resetPagination}
      extraFilters={['tagList']}
      renderExtraFields={() => renderExtraFields(t)}
    />,
  ];

  if (loggedIn) {
    const buttonLink = (
      <ButtonLink to={ROUTES.DISCUSSIONS_NEW}>{t({ id: 'discussions.new' })}</ButtonLink>
    );
    actions.push(buttonLink);
  }

  const buttonLink = mine
    ? (
      <ButtonLink key="goToAllDiscussions" to={ROUTES.DISCUSSIONS}>
        {t({ id: 'discussions' })}
      </ButtonLink>
    )
    : (
      <ButtonLink key="goToMyDiscussions" to={ROUTES.MY_DISCUSSIONS}>
        {t({ id: 'discussions.mine' })}
      </ButtonLink>
    );

  actions.push(buttonLink);

  return <ActionBar actions={actions} />;
}

DiscussionsActionBar.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  mine: PropTypes.bool,
  resetPagination: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

DiscussionsActionBar.defaultProps = {
  mine: false,
};

export default DiscussionsActionBar;
