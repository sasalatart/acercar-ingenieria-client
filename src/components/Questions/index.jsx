import React, { Component } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Modal } from 'antd';
import Form from '../../containers/Questions/Form';
import QuestionsList from '../../containers/Questions/List';
import QuestionsActionBar from './ActionBar';
import Title from '../Layout/Title';
import { matchShape } from '../../shapes';

class Questions extends Component {
  static propTypes = {
    match: matchShape.isRequired,
    intl: intlShape.isRequired,
  }

  state = { formVisible: false };

  handleProposeClicked = () => {
    this.setState({ formVisible: true });
  }

  handleEditClicked = (id) => {
    this.setState({ formVisible: true, editingId: id });
  }

  handleFormClose = () => {
    this.setState({ formVisible: false, editingId: undefined });
  }

  renderFormModal() {
    const { match, intl: { formatMessage: t } } = this.props;
    const { formVisible, editingId } = this.state;

    const majorId = +match.params.majorId;

    return (
      <Modal
        title={editingId ? t({ id: 'questions.edit' }) : t({ id: 'questions.new' })}
        visible={formVisible}
        footer={null}
        onCancel={this.handleFormClose}
        destroyOnClose
      >
        <Form id={editingId} majorId={majorId} onSubmitSuccess={this.handleFormClose} />
      </Modal>
    );
  }

  render() {
    const { match, intl: { formatMessage: t } } = this.props;
    const majorId = +match.params.majorId;
    const pending = !!match.params.pending;

    return (
      <div>
        <QuestionsActionBar
          majorId={majorId}
          pending={pending}
          onProposeClicked={this.handleProposeClicked}
        />
        <Title text={pending ? t({ id: 'questions.pending' }) : 'FAQs'} />

        <QuestionsList majorId={majorId} pending={pending} onEditClicked={this.handleEditClicked} />

        {this.renderFormModal()}
      </div>
    );
  }
}

export default injectIntl(Questions);
