import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { injectIntl, intlShape } from 'react-intl';
import ActionBar from '../../../containers/Layout/ActionBar';
import ButtonLink from '../../../containers/Layout/ButtonLink';
import SearchButtons from '../../../containers/Search/Buttons';
import HideableButton from '../../Icons/HideableButton';
import {
  SelectField,
  TagsField,
} from '../../Forms';
import { optionShape } from '../../../shapes';
import routes from '../../../lib/routes';
import { suffixes } from '../../../lib/articles';

class ArticlesActionBar extends Component {
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
          mode="multiple"
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
        <HideableButton key="goToApproved" to={routes.articles(majorId)} icon="file-alt">
          {t({ id: 'articles' })}
        </HideableButton>
      );
      actions.push(buttonLink);
    }

    if (suffix !== suffixes.mine) {
      const buttonLink = (
        <ButtonLink key="goToMine" to={routes.articles(majorId, suffixes.mine)}>
          {t({ id: 'mine' })}
        </ButtonLink>
      );
      actions.push(buttonLink);
    }

    if (adminOrMajorAdmin && suffix !== suffixes.pending) {
      const buttonLink = (
        <HideableButton key="goToPending" to={routes.articles(majorId, suffixes.pending)} icon="lock">
          {t({ id: 'articles.pending' })}
        </HideableButton>
      );
      actions.push(buttonLink);
    }

    if (canCreateArticles) {
      const newArticleButtonLink = (
        <HideableButton key="new" to={routes.articlesNew(majorId)} icon="plus">
          {t({ id: 'articles.new' })}
        </HideableButton>
      );
      actions.push(newArticleButtonLink);
    }

    return <ActionBar actions={actions} />;
  }
}

export default injectIntl(ArticlesActionBar);
