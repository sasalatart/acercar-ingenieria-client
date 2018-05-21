import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import SearchButtons from '../../../containers/Search/Buttons';
import ActionBar from '../../../containers/Layout/ActionBar';
import ButtonLink from '../../../containers/ButtonLink';
import HideableButton from '../../HideableButton';
import {
  SelectField,
  TagsField,
} from '../../Forms';
import { optionShape } from '../../../shapes';
import ROUTES from '../../../routes';
import { suffixes } from '../../../lib/articles';

export default class ArticlesActionBar extends Component {
  static propTypes = {
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    canCreateArticles: PropTypes.bool.isRequired,
    majorId: PropTypes.number,
    suffix: PropTypes.string.isRequired,
    majorOptions: PropTypes.arrayOf(optionShape).isRequired,
    categoryOptions: PropTypes.arrayOf(optionShape).isRequired,
    loadMajors: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,
    resetPagination: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    majorId: undefined,
  }

  componentDidMount() {
    const { majorId, loadMajors, loadCategories } = this.props;
    if (!majorId) loadMajors();
    loadCategories();
  }

  renderExtraFields = () => {
    const {
      majorId,
      majorOptions,
      categoryOptions,
      intl: { formatMessage: t },
    } = this.props;

    return (
      <Fragment>
        {!majorId &&
          <Field
            name="majorId"
            component={SelectField}
            label="Major"
            options={majorOptions}
          />
        }
        <Field
          name="categoryList"
          component={TagsField}
          label={t({ id: 'categories' })}
          options={categoryOptions}
        />
      </Fragment>
    );
  }

  render() {
    const {
      adminOrMajorAdmin,
      canCreateArticles,
      majorId,
      suffix,
      resetPagination,
      intl: { formatMessage: t },
    } = this.props;

    const actions = [
      <SearchButtons
        key="search"
        searchTextLabel={t({ id: 'search.articles' })}
        beforeSearch={resetPagination}
        extraFilters={['majorId', 'categoryList']}
        renderExtraFields={this.renderExtraFields}
      />,
    ];

    if (suffix !== suffixes.approved) {
      const buttonLink = (
        <HideableButton key="goToApproved" to={ROUTES.ARTICLES(majorId)} icon="file-text">
          {t({ id: 'articles' })}
        </HideableButton>
      );
      actions.push(buttonLink);
    }

    if (suffix !== suffixes.mine) {
      const buttonLink = (
        <ButtonLink key="goToMine" to={ROUTES.ARTICLES(majorId, suffixes.mine)}>
          {t({ id: 'articles.mine' })}
        </ButtonLink>
      );
      actions.push(buttonLink);
    }

    if (adminOrMajorAdmin && suffix !== suffixes.pending) {
      const buttonLink = (
        <HideableButton key="goToPending" to={ROUTES.ARTICLES(majorId, suffixes.pending)} icon="lock">
          {t({ id: 'articles.pending' })}
        </HideableButton>
      );
      actions.push(buttonLink);
    }

    if (canCreateArticles) {
      const newArticleButtonLink = (
        <HideableButton key="new" to={ROUTES.ARTICLES_NEW(majorId)} icon="plus">
          {t({ id: 'articles.new' })}
        </HideableButton>
      );
      actions.push(newArticleButtonLink);
    }

    return <ActionBar actions={actions} />;
  }
}
