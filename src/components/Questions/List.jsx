import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { injectIntl, intlShape } from 'react-intl';
import { Button, Collapse } from 'antd';
import { userShape, questionShape } from '../../shapes';
import { colors } from '../../theme';
import DestroyButton from '../../containers/Questions/DestroyButton';

const { Panel } = Collapse;

const styles = {
  panel: {
    marginBottom: '16px',
    borderRadius: '4px',
  },
  pinned: {
    backgroundColor: colors.primaryLight,
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  editButton: {
    marginRight: '5px',
  },
};

function setStyle(pinned) {
  return pinned
    ? { ...styles.panel, ...styles.pinned }
    : styles.panel;
}

function QuestionsList({
  currentUser,
  questions,
  majorId,
  page,
  pending,
  onEditClicked,
  intl: { formatMessage: t },
}) {
  const hasAdminPrivileges = currentUser
    && (currentUser.admin || (majorId && currentUser.adminOfMajors.includes(majorId)));

  return (
    <Collapse bordered={false}>
      {questions.map(({
        id, question, answer, pinned,
      }) => (
        <Panel key={id} header={question} style={setStyle(pinned)}>
          {answer}
          {hasAdminPrivileges &&
            <div style={styles.actions}>
              <Button icon="edit" style={styles.editButton} onClick={() => onEditClicked(id)}>
                {t({ id: 'forms.edit' })}
              </Button>
              <DestroyButton id={id} majorId={majorId} page={page} pending={pending} />
            </div>
          }
        </Panel>
      ))}
    </Collapse>
  );
}

QuestionsList.propTypes = {
  currentUser: userShape,
  majorId: PropTypes.number,
  questions: ImmutablePropTypes.setOf(questionShape).isRequired,
  page: PropTypes.number.isRequired,
  pending: PropTypes.bool.isRequired,
  onEditClicked: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

QuestionsList.defaultProps = {
  currentUser: undefined,
  majorId: undefined,
};

export default injectIntl(QuestionsList);
