import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Modal } from 'antd';
import WithModalForm from '../../hoc/WithModalForm';
import Form from '../../containers/Questions/Form';
import QuestionsList from '../../containers/Questions/List';
import QuestionsActionBar from './ActionBar';
import Title from '../Layout/Title';
import { matchShape } from '../../shapes';

function Questions({
  match,
  formVisible,
  editingId,
  onNewClicked,
  onEditClicked,
  onFormClose,
  intl: { formatMessage: t },
}) {
  const majorId = +match.params.majorId;
  const pending = !!match.params.pending;

  return (
    <div>
      <QuestionsActionBar majorId={majorId} pending={pending} onProposeClicked={onNewClicked} />
      <Title text={pending ? t({ id: 'questions.pending' }) : 'FAQs'} />

      <QuestionsList majorId={majorId} pending={pending} onEditClicked={onEditClicked} />

      <Modal
        title={editingId ? t({ id: 'questions.edit' }) : t({ id: 'questions.new' })}
        visible={formVisible}
        footer={null}
        onCancel={onFormClose}
        destroyOnClose
      >
        <Form id={editingId} majorId={majorId} onSubmitSuccess={onFormClose} />
      </Modal>
    </div>
  );
}

Questions.propTypes = {
  match: matchShape.isRequired,
  formVisible: PropTypes.bool.isRequired,
  editingId: PropTypes.number,
  onNewClicked: PropTypes.func.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  onFormClose: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

Questions.defaultProps = {
  editingId: undefined,
};

export default injectIntl(WithModalForm(Questions));
