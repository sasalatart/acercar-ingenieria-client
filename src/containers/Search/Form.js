import { connect } from 'react-redux';
import { reduxForm } from 'redux-form';
import mapValues from 'lodash/mapValues';
import pickBy from 'lodash/pickBy';
import identity from 'lodash/identity';
import {
  addQueryToCurrentUri,
  getActiveFilters,
} from '../../store/ducks/routes';
import SearchForm from '../../components/Search/Form';

function mapStateToProps(state, { extraFilters }) {
  const params = { filters: ['search'].concat(extraFilters) };

  return {
    initialValues: mapValues(
      getActiveFilters(state, params),
      value => (Number.isNaN(+value) ? value : +value),
    ),
  };
}

const form = reduxForm({
  form: 'search',
  onSubmit: (values, dispatch, { beforeSearch, onSubmitSuccess }) => {
    dispatch(beforeSearch());
    dispatch(addQueryToCurrentUri(pickBy(values, identity), true));
    if (onSubmitSuccess) onSubmitSuccess();
  },
})(SearchForm);

export default connect(mapStateToProps)(form);
