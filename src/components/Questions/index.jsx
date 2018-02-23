import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { intlShape } from 'react-intl';
import { Button, Modal } from 'antd';
import PaginationControls from '../Pagination';
import Form from '../../containers/Questions/Form';
import List from '../../containers/Questions/List';
import Spinner from '../Spinner';
import { userShape, paginationShape, questionShape } from '../../shapes';

const styles = {
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

class AnsweredQuestions extends Component {
  static propTypes = {
    currentUser: userShape,
    majorId: PropTypes.number,
    pagination: paginationShape,
    defaultPage: PropTypes.number.isRequired,
    questions: ImmutablePropTypes.setOf(questionShape),
    pending: PropTypes.bool,
    loadQuestions: PropTypes.func.isRequired,
    addQueryToCurrentUri: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    currentUser: undefined,
    majorId: undefined,
    pagination: undefined,
    questions: undefined,
    pending: false,
  }

  state = { formVisible: false };

  componentWillMount() {
    const { majorId, defaultPage, loadQuestions } = this.props;
    loadQuestions(defaultPage, majorId);
  }

  handlePageChange = (page) => {
    const { majorId, loadQuestions, addQueryToCurrentUri } = this.props;
    addQueryToCurrentUri({ page });
    loadQuestions(page, majorId);
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

  render() {
    const {
      currentUser, majorId, pagination, questions, pending, intl: { formatMessage: t },
    } = this.props;

    if (!questions || questions.isEmpty()) {
      return <Spinner />;
    }

    const { editingId } = this.state;

    return (
      <div>
        <div style={styles.titleWrapper}>
          <h1>{pending ? t({ id: 'questions.pending' }) : t({ id: 'questions' })}</h1>
          {currentUser && !pending &&
            <Button type="primary" icon="form" size="large" onClick={this.handleProposeClicked}>
              {t({ id: 'forms.proposeOne' })}
            </Button>}
        </div>

        <PaginationControls pagination={pagination} onPageChange={this.handlePageChange}>
          <List
            questions={questions}
            majorId={majorId}
            pending={pending}
            onEditClicked={this.handleEditClicked}
          />
        </PaginationControls>

        <Modal
          title={editingId ? t({ id: 'questions.edit' }) : t({ id: 'questions.new' })}
          visible={this.state.formVisible}
          footer={null}
          onCancel={this.handleFormClose}
          destroyOnClose
        >
          <Form id={editingId} majorId={majorId} onSubmitSuccess={this.handleFormClose} />
        </Modal>
      </div>
    );
  }
}

export default AnsweredQuestions;
