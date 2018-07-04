import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import ButtonLink from '../../components/Layout/ButtonLink';

function mapDispatchToProps(dispatch, ownProps) {
  return {
    goToRoute: () => dispatch(push(ownProps.to)),
  };
}

export default connect(null, mapDispatchToProps)(ButtonLink);
