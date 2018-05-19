import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { injectIntl } from 'react-intl';
import { getCanCreateArticles } from '../../../store/ducks/sessions';
import {
  loadMajors,
  getMajorOptions,
} from '../../../store/ducks/majors';
import {
  loadCategories,
  getCategoryOptions,
} from '../../../store/ducks/categories';
import { resetPagination } from '../../../store/ducks/articles';
import WithAuthorization from '../../../hoc/WithAuthorization';
import ActionBar from '../../../components/Articles/List/ActionBar';

function mapStateToProps(state, { match: { params } }) {
  return {
    majorOptions: getMajorOptions(state),
    categoryOptions: getCategoryOptions(state),
    canCreateArticles: getCanCreateArticles(state, params),
  };
}

function mapDispatchToProps(dispatch, { suffix, match: { params } }) {
  return {
    loadMajors: () => dispatch(loadMajors()),
    loadCategories: () => dispatch(loadCategories()),
    resetPagination: () => dispatch(resetPagination({ baseResourceId: params.majorId, suffix })),
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ActionBar);
export default injectIntl(withRouter(WithAuthorization(connectedComponent)));
