import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Collapse, Button } from 'antd';
import Linkify from 'react-linkify';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import PaginationControls from '../../containers/Layout/Pagination';
import DestroyButton from '../../containers/DestroyButton';
import IconText from '../Icons/IconText';
import { colors } from '../../theme';
import { paginationShape, questionShape } from '../../shapes';
import { getCollectionParams } from '../../lib/questions';

const { Panel } = Collapse;

const styles = {
  panel: {
    marginBottom: '16px',
    borderRadius: '4px',
  },
  star: {
    color: colors.starred,
  },
  answer: {
    whiteSpace: 'pre-wrap',
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  editButton: {
    marginRight: '5px',
  },
};

export default class QuestionsList extends Component {
  static propTypes = {
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    pending: PropTypes.bool.isRequired,
    questions: PropTypes.arrayOf(questionShape),
    pagination: paginationShape,
    loadQuestions: PropTypes.func.isRequired,
    onEditClicked: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    pagination: undefined,
    questions: [],
  }

  componentDidUpdate(prevProps) {
    if (prevProps.pending !== this.props.pending) {
      this.props.loadQuestions({ page: 1 });
    }
  }

  renderItem = ({
    id, majorSummary, question, answer, pinned,
  }) => {
    const { adminOrMajorAdmin, onEditClicked, intl: { formatMessage: t } } = this.props;

    const header = pinned
      ? <IconText icon="star" text={question} iconStyle={styles.star} withPointer />
      : question;

    return (
      <Panel key={id} header={header} style={styles.panel}>
        <Linkify>
          <p style={styles.answer}>{answer}</p>
        </Linkify>

        {adminOrMajorAdmin &&
          <div style={styles.actions}>
            <Button icon="edit" style={styles.editButton} onClick={() => onEditClicked(id)}>
              {t({ id: 'forms.edit' })}
            </Button>
            <DestroyButton {...getCollectionParams(get(majorSummary, 'id'), { id })} />
          </div>
        }
      </Panel>
    );
  }

  render() {
    const {
      loading,
      pagination,
      questions,
      loadQuestions,
    } = this.props;

    return (
      <PaginationControls
        pagination={pagination}
        loading={loading}
        noData={!loading && isEmpty(questions)}
        loadFn={loadQuestions}
        render={() => (
          <Collapse bordered={false}>
            {questions
              .sort((qA, qB) => {
                if (qA.pinned && !qB.pinned) return -1;
                if (!qA.pinned && qB.pinned) return 1;
                return new Date(qA.createdAt) - new Date(qB.createdAt);
              })
              .map(this.renderItem)}
          </Collapse>
        )}
      />
    );
  }
}
