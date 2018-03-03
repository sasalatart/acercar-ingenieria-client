import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { intlShape } from 'react-intl';
import { Button, Modal } from 'antd';
import PaginationControls from '../Pagination';
import Form from '../../containers/Questions/Form';
import QuestionsList from '../../containers/Questions/List';
import { paginationShape, questionShape } from '../../shapes';

const styles = {
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

class Questions extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    majorId: PropTypes.number,
    pagination: paginationShape,
    questions: ImmutablePropTypes.setOf(questionShape),
    pending: PropTypes.bool,
    loadQuestions: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    majorId: undefined,
    pagination: undefined,
    questions: undefined,
    pending: false,
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

  renderQuestions = () => {
    const { questions, majorId, pending } = this.props;

    return (
      <QuestionsList
        questions={questions}
        majorId={majorId}
        pending={pending}
        onEditClicked={this.handleEditClicked}
      />
    );
  };

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
      loggedIn, loading, pagination, pending, loadQuestions, intl: { formatMessage: t },
    } = this.props;

    return (
      <div>
        <div style={styles.titleWrapper}>
          <h1>{pending ? t({ id: 'questions.pending' }) : t({ id: 'questions' })}</h1>
          {loggedIn && !pending &&
            <Button type="primary" icon="form" size="large" onClick={this.handleProposeClicked}>
              {t({ id: 'forms.proposeOne' })}
            </Button>}
        </div>

        <PaginationControls
          pagination={pagination}
          loading={loading}
          loadFn={loadQuestions}
          render={this.renderQuestions}
        />

        {this.renderFormModal()}
      </div>
    );
  }
}

export default Questions;
