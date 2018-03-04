import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  goToPendingQuestions,
  goToAnsweredQuestions,
} from '../../store/ducks/routes';
import {
  getCurrentUserEntity,
  getHasAdminPrivileges,
} from '../../store/ducks/sessions';
import QuestionsActionBar from '../../components/Questions/ActionBar';

function mapStateToProps(state, ownProps) {
  return {
    loggedIn: !!getCurrentUserEntity(state),
    hasAdminPrivileges: getHasAdminPrivileges(state, ownProps),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { majorId } = ownProps;

  return {
    goToPendingQuestions: () => dispatch(goToPendingQuestions(majorId)),
    goToAnsweredQuestions: () => dispatch(goToAnsweredQuestions(majorId)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuestionsActionBar));
