import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import withModalForm from '../../hoc/withModalForm';
import Form from '../../containers/Questions/Form';
import QuestionsList from '../../containers/Questions/List';
import Title from '../Layout/Title';
import QuestionsActionBar from './ActionBar';
import { matchShape } from '../../shapes';

function Questions({
  match,
  editingId,
  onNewClicked,
  onEditClicked,
  onFormClose,
  renderModal,
}) {
  const majorId = +match.params.majorId;
  const unanswered = !!match.params.unanswered;

  return (
    <Fragment>
      <QuestionsActionBar
        majorId={majorId}
        unanswered={unanswered}
        onCreateClicked={onNewClicked}
      />
      <Title>{unanswered ? <FormattedMessage id="questions.unanswered" /> : 'FAQs'}</Title>

      <QuestionsList majorId={majorId} unanswered={unanswered} onEditClicked={onEditClicked} />

      {renderModal(
        <FormattedMessage id={editingId ? 'questions.edit' : 'questions.new'} />,
        <Form id={editingId} majorId={majorId} onSubmitSuccess={onFormClose} />,
      )}
    </Fragment>
  );
}

Questions.propTypes = {
  match: matchShape.isRequired,
  editingId: PropTypes.number,
  onNewClicked: PropTypes.func.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
  renderModal: PropTypes.func.isRequired,
};

Questions.defaultProps = {
  editingId: undefined,
};

export default withModalForm(Questions);
