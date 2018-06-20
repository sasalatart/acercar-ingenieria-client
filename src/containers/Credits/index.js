import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import { loadCredits, getCreditsEntities } from '../../store/ducks/credits';
import { getIsFetching } from '../../store/ducks/loading';
import WithLoadableResource from '../../hoc/WithLoadableResource';
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

const connectedComponent = connect(
  mapStateToProps,
  mapDispatchToProps,
)(WithLoadableResource('loadCredits', 'credits')(Credits));
export default injectIntl(connectedComponent);
