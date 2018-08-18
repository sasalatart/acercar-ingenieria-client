import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { loadCredits, getCreditsEntities } from '../../store/ducks/credits';
import { getIsFetching } from '../../store/ducks/loading';
import withAuthorization from '../../hoc/withAuthorization';
import withLoadableResource from '../../hoc/withLoadableResource';
import withModalForm from '../../hoc/withModalForm';
import Credits from '../../components/Credits';
import collections from '../../lib/collections';

function mapStateToProps(state) {
  const params = { collection: collections.credits, paged: true };
  const credits = getCreditsEntities(state);

  return {
    loading: getIsFetching(state, params) && isEmpty(credits),
    credits,
  };
}

const mapDispatchToProps = {
  loadCredits,
};

const component = connect(
  mapStateToProps,
  mapDispatchToProps,
)(withLoadableResource('loadCredits', 'credits')(Credits));

export default withAuthorization(withModalForm(component));
