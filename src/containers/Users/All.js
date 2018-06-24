import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { addQueryToCurrentUri } from '../../store/ducks/routes';
import { resetPagination as resetUsersPagination } from '../../store/ducks/users';
import { resetPagination as resetAdminsPagination } from '../../store/ducks/admins';
import {
  loadMajors,
  getDisciplinaryMajors,
  getInterdisciplinaryMajors,
} from '../../store/ducks/majors';
import AllUsers from '../../components/Users/All';

function mapStateToProps(state) {
  const disciplinaryMajors = getDisciplinaryMajors(state);
  const interdisciplinaryMajors = getInterdisciplinaryMajors(state);

  return {
    disciplinaryMajors,
    interdisciplinaryMajors,
  };
}

const mapDispatchToProps = {
  loadMajors,
  addQueryToCurrentUri,
  resetUsersPagination,
  resetAdminsPagination,
};

export default injectIntl(connect(mapStateToProps, mapDispatchToProps)(AllUsers));
