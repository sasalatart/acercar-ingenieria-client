import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { List } from 'antd';
import SearchButtons from '../../../containers/Search/Buttons';
import ActionBar from '../../../containers/Layout/ActionBar';
import Pagination from '../../../containers/Layout/Pagination';
import ExtraSearchFields from './ExtraSearchFields';
import HideableButton from '../../Icons/HideableButton';
import ListItem from './Item';
import Title from '../../Layout/Title';
import { paginationInfoShape, articleSummaryShape, optionShape } from '../../../shapes';
import routes from '../../../lib/routes';
import { suffixes } from '../../../lib/articles';

function renderButton(id, route, icon) {
  return (
    <HideableButton key={id} to={route} icon={icon}>
      <FormattedMessage id={id} />
    </HideableButton>
  );
}

export default class ArticlesList extends Component {
  static propTypes = {
    currentUserId: PropTypes.number.isRequired,
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    canCreateArticles: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    majorId: PropTypes.number,
    suffix: PropTypes.string.isRequired,
    paginationInfo: paginationInfoShape.isRequired,
    articleSummaries: PropTypes.arrayOf(articleSummaryShape).isRequired,
    majorOptions: PropTypes.arrayOf(optionShape).isRequired,
    categoryOptions: PropTypes.arrayOf(optionShape).isRequired,
    loadArticles: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,
    loadMajors: PropTypes.func.isRequired,
    resetPagination: PropTypes.func.isRequired,
    onTagClick: PropTypes.func.isRequired,
    renderHeader: PropTypes.func,
  }

  static defaultProps = {
    majorId: undefined,
    renderHeader: undefined,
  }

  componentDidMount() {
    const { majorId, loadMajors, loadCategories } = this.props;
    if (!majorId) loadMajors();
    loadCategories();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.suffix !== this.props.suffix) {
      this.props.loadArticles({ page: 1 });
    }
  }

  getActions() {
    const {
      adminOrMajorAdmin,
      canCreateArticles,
      majorId,
      suffix,
      majorOptions,
      categoryOptions,
      resetPagination,
    } = this.props;

    const actions = [
      <SearchButtons
        key="search"
        searchTextLabel={<FormattedMessage id="search.articles" />}
        beforeSearch={resetPagination}
        extraFilters={['majorId', 'categoryList']}
        extraFields={(
          <ExtraSearchFields
            majorId={majorId}
            majorOptions={majorOptions}
            categoryOptions={categoryOptions}
          />
        )}
      />,
    ];

    if (suffix !== suffixes.approved) {
      actions.push(renderButton('articles', routes.articles(majorId), 'file-alt'));
    }

    if (suffix !== suffixes.mine) {
      actions.push(renderButton('mine', routes.articles(majorId, suffixes.mine), 'link'));
    }

    if (adminOrMajorAdmin && suffix !== suffixes.unapproved) {
      actions.push(renderButton('articles.unapproved', routes.articles(majorId, suffixes.unapproved), 'lock'));
    }

    if (canCreateArticles) {
      actions.push(renderButton('articles.new', routes.articlesNew(majorId), 'plus'));
    }

    return actions;
  }

  renderHeader() {
    const { renderHeader, suffix } = this.props;
    const titleId = suffix === suffixes.approved ? 'articles' : `articles.${suffix}`;
    const title = <FormattedMessage id={titleId} />;
    const actions = this.getActions();

    if (renderHeader) return renderHeader({ subtitle: title, actions });

    return (
      <Fragment>
        <ActionBar actions={actions} />
        <Title>{title}</Title>
      </Fragment>
    );
  }

  renderListItem = article => (
    <ListItem
      currentUserId={this.props.currentUserId}
      adminOrMajorAdmin={this.props.adminOrMajorAdmin}
      article={article}
      displayMajor={!this.props.majorId && !!article.majorSummary}
      onTagClick={this.props.onTagClick}
    />
  )

  render() {
    const {
      loading,
      noData,
      paginationInfo,
      articleSummaries,
      loadArticles: load,
    } = this.props;

    return (
      <Fragment>
        {this.renderHeader()}

        <Pagination loading={loading} noData={noData} paginationInfo={paginationInfo} load={load}>
          <List
            itemLayout="vertical"
            size="large"
            dataSource={articleSummaries}
            renderItem={this.renderListItem}
          />
        </Pagination>
      </Fragment>
    );
  }
}
