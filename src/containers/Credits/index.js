import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import {
  collection,
  loadCredits,
  getCreditsEntities,
} from '../../store/ducks/credits';
import { getIsFetching } from '../../store/ducks/loading';
import Credits from '../../components/Credits';

function mapStateToProps(state) {
  const params = { collection, paged: true };
  const credits = getCreditsEntities(state);

  return {
    loading: getIsFetching(state, params) && isEmpty(credits),
    credits,
  };
}

const mapDispatchToProps = {
  loadCredits,
};

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(Credits);
export default injectIntl(connectedComponent);
