import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { goToArticles } from '../../../store/ducks/routes';
import { getCurrentUserEntity } from '../../../store/ducks/sessions';
import WithAuthorization from '../../../hoc/WithAuthorization';
import ActionBar from '../../../components/Articles/Article/ActionBar';

function mapStateToProps(state, ownProps) {
  const { article } = ownProps;
  const currentUser = getCurrentUserEntity(state);

  return {
    isAuthor: !!(article && currentUser.id === article.author.id),
    article,
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onDestroy: () => dispatch(goToArticles(ownProps.article.majorId)),
  };
}

const connectedComponent = connect(mapStateToProps, mapDispatchToProps)(ActionBar);
export default injectIntl(WithAuthorization(connectedComponent));
