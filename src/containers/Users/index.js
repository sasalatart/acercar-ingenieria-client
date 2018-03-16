import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { addQueryToCurrentUri } from '../../store/ducks/routes';
import { getCurrentUserEntity } from '../../store/ducks/sessions';
import {
  loadMajors,
  getDisciplinaryMajors,
  getInterdisciplinaryMajors,
} from '../../store/ducks/majors';
import Users from '../../components/Users';

function mapStateToProps(state) {
  const currentUser = getCurrentUserEntity(state);
  const disciplinaryMajors = getDisciplinaryMajors(state);
  const interdisciplinaryMajors = getInterdisciplinaryMajors(state);

  return {
    admin: !!(currentUser && currentUser.admin),
    loading: !disciplinaryMajors.length && !interdisciplinaryMajors.length,
    disciplinaryMajors,
    interdisciplinaryMajors,
  };
}

const mapDispatchToProps = {
  loadMajors,
  addQueryToCurrentUri,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Users));
