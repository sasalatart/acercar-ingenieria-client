import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import WithModalForm from '../../hoc/WithModalForm';
import Form from '../../containers/Questions/Form';
import QuestionsList from '../../containers/Questions/List';
import QuestionsActionBar from './ActionBar';
import Title from '../Layout/Title';
import { matchShape } from '../../shapes';

function Questions({
  match,
  editingId,
  onNewClicked,
  onEditClicked,
  onFormClose,
  renderModal,
  intl: { formatMessage: t },
}) {
  const majorId = +match.params.majorId;
  const pending = !!match.params.pending;

  return (
    <Fragment>
      <QuestionsActionBar majorId={majorId} pending={pending} onProposeClicked={onNewClicked} />
      <Title>{pending ? t({ id: 'questions.pending' }) : 'FAQs'}</Title>

      <QuestionsList majorId={majorId} pending={pending} onEditClicked={onEditClicked} />

      {renderModal(
        editingId ? t({ id: 'questions.edit' }) : t({ id: 'questions.new' }),
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
  intl: intlShape.isRequired,
};

Questions.defaultProps = {
  editingId: undefined,
};

export default injectIntl(WithModalForm(Questions));
