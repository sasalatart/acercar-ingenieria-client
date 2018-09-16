import React, { PureComponent, Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withAuthorization from '../../hoc/withAuthorization';
import withModalForm from '../../hoc/withModalForm';
import Form from '../../containers/Questions/Form';
import QuestionsList from '../../containers/Questions/List';
import ActionBar from '../../containers/Layout/ActionBar';
import HideableButton from '../Icons/HideableButton';
import Title from '../Layout/Title';
import { matchShape } from '../../shapes';
import routes from '../../lib/routes';
import { suffixes } from '../../lib/questions';

class Questions extends PureComponent {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    match: matchShape.isRequired,
    editingId: PropTypes.number,
    onNewClicked: PropTypes.func.isRequired,
    onEditClicked: PropTypes.func.isRequired,
    onFormClose: PropTypes.func.isRequired,
    renderModal: PropTypes.func.isRequired,
    renderHeader: PropTypes.func,
  };

  static defaultProps = {
    editingId: undefined,
    renderHeader: undefined,
  };

  getActions() {
    const { loggedIn, adminOrMajorAdmin, onNewClicked } = this.props;
    const { majorId, unanswered } = this.parseMatch();

    const actions = [];

    if (adminOrMajorAdmin) {
      const route = routes.questions(majorId, unanswered ? undefined : suffixes.unanswered);

      const buttonLink = (
        <HideableButton key="link" to={route} icon={[unanswered ? 'fas' : 'far', 'question-circle']}>
          <FormattedMessage id={unanswered ? 'questions' : 'questions.unanswered'} />
        </HideableButton>
      );

      actions.push(buttonLink);
    }

    if (loggedIn) {
      const proposeOneButton = (
        <HideableButton key="propose" type="primary" icon="plus" onClick={onNewClicked}>
          <FormattedMessage id="forms.proposeOne" />
        </HideableButton>
      );

      actions.push(proposeOneButton);
    }

    return actions;
  }

  parseMatch() {
    const { match } = this.props;
    return {
      majorId: +match.params.majorId,
      unanswered: !!match.params.unanswered,
    };
  }

  renderHeader() {
    const { renderHeader } = this.props;
    const { unanswered } = this.parseMatch();

    const title = unanswered ? <FormattedMessage id="questions.unanswered" /> : 'FAQs';
    const actions = this.getActions();

    if (renderHeader) return renderHeader({ subtitle: title, actions });

    return (
      <Fragment>
        <ActionBar actions={actions} />
        <Title>{title}</Title>
      </Fragment>
    );
  }

  render() {
    const {
      editingId,
      onEditClicked,
      onFormClose,
      renderModal,
    } = this.props;
    const { majorId, unanswered } = this.parseMatch();

    return (
      <Fragment>
        {this.renderHeader()}

        <QuestionsList majorId={majorId} unanswered={unanswered} onEditClicked={onEditClicked} />

        {renderModal(
          <FormattedMessage id={editingId ? 'questions.edit' : 'questions.new'} />,
          <Form id={editingId} majorId={majorId} onSubmitSuccess={onFormClose} />,
        )}
      </Fragment>
    );
  }
}

export default withAuthorization(withModalForm(Questions));
