import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import {
  destroyMajor,
  getDestroyingIds,
} from '../../store/ducks/majors';
import DestroyButton from '../../components/DestroyButton/Important';

function mapStateToProps(state, ownProps) {
  return {
    loading: getDestroyingIds(state).has(ownProps.id),
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  const { id } = ownProps;

  return {
    onDestroy: () => dispatch(destroyMajor(id)),
  };
}

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(DestroyButton));
