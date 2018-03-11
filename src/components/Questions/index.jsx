import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Modal } from 'antd';
import PaginationControls from '../../containers/Pagination';
import Form from '../../containers/Questions/Form';
import QuestionsList from '../../containers/Questions/List';
import QuestionsActionBar from './ActionBar';
import Title from '../Layout/Title';
import { paginationShape } from '../../shapes';

class Questions extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    majorId: PropTypes.number,
    pending: PropTypes.bool.isRequired,
    pagination: paginationShape,
    loadQuestions: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    majorId: undefined,
    pagination: undefined,
  }

  state = { formVisible: false };

  componentWillReceiveProps(nextProps) {
    if (nextProps.pending !== this.props.pending) {
      nextProps.loadQuestions();
    }
  }

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
    const { majorId, intl: { formatMessage: t } } = this.props;
    const { formVisible, editingId } = this.state;

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
    const {
      majorId, pending, loading, pagination, loadQuestions, intl: { formatMessage: t },
    } = this.props;

    return (
      <div>
        <QuestionsActionBar
          majorId={majorId}
          pending={pending}
          onProposeClicked={this.handleProposeClicked}
        />
        <Title text={pending ? t({ id: 'questions.pending' }) : 'FAQs'} />

        <PaginationControls
          pagination={pagination}
          loading={loading}
          loadFn={loadQuestions}
          render={() => (
            <QuestionsList
              majorId={majorId}
              pending={pending}
              onEditClicked={this.handleEditClicked}
            />
          )}
        />

        {this.renderFormModal()}
      </div>
    );
  }
}

export default Questions;
