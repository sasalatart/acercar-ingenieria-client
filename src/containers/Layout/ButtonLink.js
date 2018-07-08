import { connect } from 'react-redux';
import { push } from 'connected-react-router';
import ButtonLink from '../../components/Layout/ButtonLink';

function mapDispatchToProps(dispatch, ownProps) {
  return {
    goToRoute: () => dispatch(push(ownProps.to)),
  };
}

export default connect(null, mapDispatchToProps)(ButtonLink);
