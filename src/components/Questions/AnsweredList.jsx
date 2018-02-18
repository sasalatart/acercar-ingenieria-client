import React from 'react';
import PropTypes from 'prop-types';
import { Collapse } from 'antd';
import { questionShape } from '../../shapes';
import { colors } from '../../theme';

const { Panel } = Collapse;

const styles = {
  panel: {
    marginBottom: '16px',
    borderRadius: '4px',
  },
  pinned: {
    backgroundColor: colors.primaryLight,
  },
};

function setStyle(pinned) {
  return pinned
    ? { ...styles.panel, ...styles.pinned }
    : styles.panel;
}

function QuestionsList({ questions }) {
  return (
    <Collapse bordered={false}>
      {questions.map(({
        id, question, answer, pinned,
      }) => (
        <Panel key={id} header={question} style={setStyle(pinned)}>
          {answer}
        </Panel>
      ))}
    </Collapse>
  );
}

QuestionsList.propTypes = {
  questions: PropTypes.arrayOf(questionShape).isRequired,
};

export default QuestionsList;
