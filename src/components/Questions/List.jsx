import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Collapse, Button } from 'antd';
import Linkify from 'react-linkify';
import Pagination from '../../containers/Layout/Pagination';
import DestroyButton from '../../containers/DestroyButton';
import IconText from '../Icons/IconText';
import { colors } from '../../theme';
import { paginationInfoShape, questionShape } from '../../shapes';
import collections from '../../lib/collections';

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
    noData: PropTypes.bool.isRequired,
    unanswered: PropTypes.bool.isRequired,
    questions: PropTypes.arrayOf(questionShape).isRequired,
    paginationInfo: paginationInfoShape.isRequired,
    loadQuestions: PropTypes.func.isRequired,
    onEditClicked: PropTypes.func.isRequired,
  };

  componentDidUpdate(prevProps) {
    if (prevProps.unanswered !== this.props.unanswered) {
      this.props.loadQuestions({ page: 1 });
    }
  }

  renderItem = ({
    id, question, answer, pinned,
  }) => {
    const { adminOrMajorAdmin, onEditClicked } = this.props;

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
              <FormattedMessage id="forms.edit" />
            </Button>
            <DestroyButton id={id} collection={collections.questions} />
          </div>
        }
      </Panel>
    );
  }

  render() {
    const {
      loading,
      noData,
      paginationInfo,
      questions,
      loadQuestions: load,
    } = this.props;

    return (
      <Pagination loading={loading} noData={noData} paginationInfo={paginationInfo} load={load}>
        <Collapse bordered={false}>
          {questions
            .sort((qA, qB) => {
              if (qA.pinned && !qB.pinned) return -1;
              if (!qA.pinned && qB.pinned) return 1;
              return new Date(qA.createdAt) - new Date(qB.createdAt);
            })
            .map(this.renderItem)}
        </Collapse>
      </Pagination>
    );
  }
}
