import { connect } from 'react-redux';
import { setLocale, getLocale } from '../../../store/ducks/i18n';
import LocaleSelect from '../../../components/Layout/Header/LocaleSelect';

function mapStateToProps(state) {
  return {
    locale: getLocale(state),
  };
}

const mapDispatchToProps = {
  setLocale,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleSelect);
