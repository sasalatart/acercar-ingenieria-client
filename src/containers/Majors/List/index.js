import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import {
  collection,
  loadMajors,
  getDisciplinaryMajors,
  getInterdisciplinaryMajors,
} from '../../../store/ducks/majors';
import { getIsFetching } from '../../../store/ducks/loading';
import List from '../../../components/Majors/List';

function mapStateToProps(state) {
  const params = { collection, paged: true };
  const disciplinaryMajors = getDisciplinaryMajors(state);
  const interdisciplinaryMajors = getInterdisciplinaryMajors(state);
  const areEmpty = isEmpty(disciplinaryMajors) && isEmpty(interdisciplinaryMajors);

  return {
    loading: areEmpty && getIsFetching(state, params),
    disciplinaryMajors,
    interdisciplinaryMajors,
  };
}

const mapDispatchToProps = {
  loadMajors,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(List));
