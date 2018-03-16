import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import pick from 'lodash/pick';
import {
  loadQuestions,
  getPagingFns,
} from '../../../store/ducks/questions';
import WithAuthorization from '../../../hoc/WithAuthorization';
import QuestionsList from '../../../components/Questions/List';

function mapStateToProps(state, ownProps) {
  const params = pick(ownProps, 'majorId', 'pending');

  const pagingFns = getPagingFns(params.pending, params.majorId);
  const questions = pagingFns.selectors.getPagedEntities(state, params);

  return {
    loading: !questions || questions.isEmpty(),
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
