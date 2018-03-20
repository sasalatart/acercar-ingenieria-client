import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import {
  getCollectionParams,
  loadQuestions,
  getPagingFns,
} from '../../../store/ducks/questions';
import { getIsFetching } from '../../../store/ducks/loading';
import WithAuthorization from '../../../hoc/WithAuthorization';
import QuestionsList from '../../../components/Questions/List';

function mapStateToProps(state, ownProps) {
  const params = {
    ...getCollectionParams(ownProps.majorId),
    suffix: ownProps.pending ? 'pending' : 'answered',
    paged: true,
  };

  const pagingFns = getPagingFns(ownProps.pending, ownProps.majorId);
  const questions = pagingFns.selectors.getPagedEntities(state, params);

  return {
    loading: isEmpty(questions) && getIsFetching(state, params),
    pagination: pagingFns.selectors.getMeta(state, params),
    questions,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    loadQuestions: (page = 1) => dispatch(loadQuestions(page, ownProps.majorId, ownProps.pending)),
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(QuestionsList);
export default injectIntl(WithAuthorization(connectedComponent));
