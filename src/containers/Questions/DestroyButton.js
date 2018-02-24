import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { destroyQuestionFactory, getDestroyingIds } from '../../store/ducks/questions';
import DestroyButton from '../../components/DestroyButton';

function mapStateToProps(state, ownProps) {
  return {
    loading: getDestroyingIds(state).has(ownProps.id),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const {
    id, majorId, page, pending,
  } = ownProps;

  return {
    onDestroy: () => dispatch(destroyQuestionFactory(pending)(id, majorId, page)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DestroyButton));
