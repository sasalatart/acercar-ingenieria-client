import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
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

function mapStateToProps(state) {
  return {
    majorOptions: getMajorOptions(state),
    categoryOptions: getCategoryOptions(state),
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
export default injectIntl(WithAuthorization(connectedComponent));
