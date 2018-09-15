import { connect } from 'react-redux';
import { removeQueriesFromCurrentUri, getFiltersActive } from '../../store/ducks/routes';
import Buttons from '../../components/Search/Buttons';

function mapStateToProps(state, { extraFilters }) {
  const params = { filters: ['search'].concat(extraFilters) };

  return {
    filtersActive: getFiltersActive(state, params),
  };
}

function mapDispatchToProps(dispatch, { extraFilters }) {
  return {
    removeFilter: () => dispatch(removeQueriesFromCurrentUri(['search'].concat(extraFilters))),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
