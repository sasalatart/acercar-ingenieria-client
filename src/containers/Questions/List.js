import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { loadQuestions, getPagingFns } from '../../store/ducks/questions';
import { getIsFetching } from '../../store/ducks/loading';
import WithAuthorization from '../../hoc/WithAuthorization';
import QuestionsList from '../../components/Questions/List';
import { getSuffix, getCollectionParams } from '../../lib/questions';

function mapStateToProps(state, ownProps) {
  const params = {
    ...getCollectionParams(ownProps.majorId),
    suffix: getSuffix(ownProps.pending),
    paged: true,
  };

  const pagingFns = getPagingFns(params, true).selectors;
  const questions = pagingFns.getPagedEntities(state, params);

  return {
    loading: isEmpty(questions) && getIsFetching(state, params),
    pagination: pagingFns.getMeta(state, params),
    questions,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { majorId, pending } = ownProps;

  return {
    loadQuestions: ({ page }) => dispatch(loadQuestions(page, majorId, pending)),
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
export default injectIntl(WithAuthorization(connectedComponent));
