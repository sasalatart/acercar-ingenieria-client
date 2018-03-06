import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { goToMajorsNew } from '../../store/ducks/routes';
import { getHasAdminPrivileges } from '../../store/ducks/sessions';
import MajorsActionBar from '../../components/Majors/ActionBar';

function mapStateToProps(state) {
  return {
    hasAdminPrivileges: getHasAdminPrivileges(state),
  };
}

const mapDispatchToProps = {
  goToMajorsNew,
};

export default injectIntl(connect(
  mapStateToProps,
  mapDispatchToProps,
)(MajorsActionBar));
