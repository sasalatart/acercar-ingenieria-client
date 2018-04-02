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
import ActionBar from '../../../components/Articles/List/ActionBar';

function mapStateToProps(state, ownProps) {
  const params = { majorId: ownProps.match.params.majorId };

  return {
    majorOptions: getMajorOptions(state),
    categoryOptions: getCategoryOptions(state),
    canCreateArticles: getCanCreateArticles(state, params),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadMajors: () => dispatch(loadMajors()),
    loadCategories: () => dispatch(loadCategories()),
    resetPagination: () => dispatch(resetPagination(ownProps.majorId)),
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ActionBar);
export default injectIntl(withRouter(connectedComponent));
