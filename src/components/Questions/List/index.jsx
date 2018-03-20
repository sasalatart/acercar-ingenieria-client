import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Collapse, Button } from 'antd';
import Linkify from 'react-linkify';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import DestroyButton from '../../../containers/DestroyButton';
import PaginationControls from '../../../containers/Pagination';
import IconText from '../../IconText';
import { paginationShape, questionShape } from '../../../shapes';

const { Panel } = Collapse;

const styles = {
  panel: {
    marginBottom: '16px',
    borderRadius: '4px',
  },
  justified: {
    textAlign: 'justify',
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

  componentWillReceiveProps(nextProps) {
    if (nextProps.pending !== this.props.pending) {
      nextProps.loadQuestions();
    }
  }

  renderItem = ({
    id, majorSummary, question, answer, pinned,
  }) => {
    const { adminOrMajorAdmin, onEditClicked, intl: { formatMessage: t } } = this.props;

    const header = pinned ? <IconText type="star" text={question} /> : question;

    return (
      <Panel key={id} header={header} style={styles.panel}>
        <Linkify>
          <p style={styles.justified}>{answer}</p>
        </Linkify>

        {adminOrMajorAdmin &&
          <div style={styles.actions}>
            <Button icon="edit" style={styles.editButton} onClick={() => onEditClicked(id)}>
              {t({ id: 'forms.edit' })}
            </Button>
            <DestroyButton collection="questions" id={id} baseResourceId={get(majorSummary, 'id')} />
          </div>
        }
      </Panel>
    );
  }

  render() {
    const {
      loading, pagination, questions, loadQuestions,
    } = this.props;

    return (
      <PaginationControls
        pagination={pagination}
        loading={loading}
        noData={!loading && isEmpty(questions)}
        loadFn={loadQuestions}
        render={() => (
          <Collapse bordered={false}>
            {questions.map(this.renderItem)}
          </Collapse>
        )}
      />
    );
  }
}
