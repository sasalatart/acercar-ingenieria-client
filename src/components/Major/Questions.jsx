import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../Pagination';
import AnsweredQuestionsList from '../Questions/AnsweredList';
import Spinner from '../Spinner';
import { paginationShape, questionShape } from '../../shapes';

class MajorQuestions extends Component {
  static propTypes = {
    majorId: PropTypes.number.isRequired,
    pagination: paginationShape,
    majorQuestions: PropTypes.arrayOf(questionShape),
    loadAnsweredMajorQuestions: PropTypes.func.isRequired,
    addQueryToMajorPath: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    pagination: undefined,
    majorQuestions: undefined,
  }

  componentWillMount() {
    const { majorId, pagination, loadAnsweredMajorQuestions } = this.props;
    loadAnsweredMajorQuestions(majorId, pagination && pagination.page);
  }

  handlePageChange = (page) => {
    const { majorId, loadAnsweredMajorQuestions, addQueryToMajorPath } = this.props;
    addQueryToMajorPath(majorId, { page });
    loadAnsweredMajorQuestions(majorId, page);
  }

  render() {
    const { pagination, majorQuestions, intl: { formatMessage: t } } = this.props;

    if (isEmpty(majorQuestions)) {
      return <Spinner />;
    }

    return (
      <div>
        <h1>{t({ id: 'majors.questions' })}</h1>
        <PaginationControls
          pagination={pagination}
          onPageChange={this.handlePageChange}
        >
          <AnsweredQuestionsList questions={majorQuestions} />
        </PaginationControls>
      </div>
    );
  }
}

export default MajorQuestions;
