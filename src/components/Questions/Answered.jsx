import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { intlShape } from 'react-intl';
import { Alert, Button, Modal } from 'antd';
import PaginationControls from '../Pagination';
import NewForm from '../../containers/Questions/NewForm';
import AnsweredQuestionsList from '../../containers/Questions/AnsweredList';
import Spinner from '../Spinner';
import { userShape, paginationShape, questionShape } from '../../shapes';

const styles = {
  titleWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  alert: {
    marginBottom: '24px',
  },
};

class AnsweredQuestions extends Component {
  static propTypes = {
    currentUser: userShape,
    majorId: PropTypes.number,
    pagination: paginationShape,
    defaultPage: PropTypes.number.isRequired,
    questions: ImmutablePropTypes.setOf(questionShape),
    loadAnsweredQuestions: PropTypes.func.isRequired,
    addQueryToCurrentUri: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    currentUser: undefined,
    majorId: undefined,
    pagination: undefined,
    questions: undefined,
  }

  state = { formVisible: false };

  componentWillMount() {
    const { majorId, defaultPage, loadAnsweredQuestions } = this.props;
    loadAnsweredQuestions(defaultPage, majorId);
  }

  handlePageChange = (page) => {
    const { majorId, loadAnsweredQuestions, addQueryToCurrentUri } = this.props;
    addQueryToCurrentUri({ page });
    loadAnsweredQuestions(page, majorId);
  }

  handleProposeClicked = () => {
    this.setState({ formVisible: true });
  }

  handleFormClose = () => {
    this.setState({ formVisible: false });
  }

  render() {
    const {
      currentUser, majorId, pagination, questions, intl: { formatMessage: t },
    } = this.props;

    if (!questions || questions.isEmpty()) {
      return <Spinner />;
    }

    return (
      <div>
        <div style={styles.titleWrapper}>
          <h1>{t({ id: 'questions' })}</h1>
          {currentUser &&
            <Button type="primary" icon="form" size="large" onClick={this.handleProposeClicked}>
              {t({ id: 'forms.proposeOne' })}
            </Button>}
        </div>

        <PaginationControls pagination={pagination} onPageChange={this.handlePageChange}>
          <AnsweredQuestionsList questions={questions} majorId={majorId} />
        </PaginationControls>

        <Modal
          title={t({ id: 'questions.new' })}
          visible={this.state.formVisible}
          footer={null}
          onCancel={this.handleFormClose}
        >
          <Alert
            type="warning"
            message={t({ id: 'forms.beforeCreatingQuestionAlert.message' })}
            description={t({ id: 'forms.beforeCreatingQuestionAlert.description' })}
            style={styles.alert}
            showIcon
          />
          <NewForm majorId={majorId} onSubmitSuccess={this.handleFormClose} />
        </Modal>
      </div>
    );
  }
}

export default AnsweredQuestions;
