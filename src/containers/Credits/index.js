import { compose } from 'redux';
import { connect } from 'react-redux';
import { loadCredits, getCreditsEntities, getIsLoadingCredits } from '../../store/ducks/credits';
import { getPlaceholderFlags } from '../../store/ducks/shared';
import withAuthorization from '../../hoc/withAuthorization';
import withLoadableResource from '../../hoc/withLoadableResource';
import withModalForm from '../../hoc/withModalForm';
import Credits from '../../components/Credits';

function mapStateToProps(state) {
  const credits = getCreditsEntities(state);
  return {
    ...getPlaceholderFlags(getIsLoadingCredits(state), credits),
    credits,
  };
}

const mapDispatchToProps = {
  loadCredits,
};

export default compose(
  withAuthorization,
  withModalForm,
  connect(mapStateToProps, mapDispatchToProps),
  withLoadableResource('loadCredits', 'credits'),
)(Credits);
