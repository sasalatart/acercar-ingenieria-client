import { connect } from 'react-redux';
import { replace as replaceRoute } from 'connected-react-router';
import withSizes from 'react-sizes';
import { getPathname } from '../../store/ducks/routes';
import Menu from '../../components/Layout/Menu';

function mapStateToProps(state) {
  return {
    activeMenuKey: getPathname(state),
  };
}

const mapDispatchToProps = {
  replaceRoute,
};

function mapSizesToProps({ width }) {
  return {
    smScreen: width < 768,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withSizes(mapSizesToProps)(Menu));
