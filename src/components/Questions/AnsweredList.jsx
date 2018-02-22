import React from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { injectIntl, intlShape } from 'react-intl';
import { Button, Collapse, Popconfirm } from 'antd';
import { userShape, questionShape } from '../../shapes';
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
  actions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

function setStyle(pinned) {
  return pinned
    ? { ...styles.panel, ...styles.pinned }
    : styles.panel;
}

function QuestionsList({
  currentUser, questions, majorId, page, destroyingIds, onDestroy, intl: { formatMessage: t },
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
              <Popconfirm
                title={t({ id: 'forms.confirm.message' })}
                okText={t({ id: 'forms.confirm.yes' })}
                cancelText={t({ id: 'forms.confirm.cancel' })}
                onConfirm={() => onDestroy(id, majorId, page)}
              >
                <Button type="danger" icon="delete" loading={destroyingIds.has(id)}>
                  {t({ id: 'forms.delete' })}
                </Button>
              </Popconfirm>
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
  destroyingIds: ImmutablePropTypes.setOf(PropTypes.number).isRequired,
  onDestroy: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

QuestionsList.defaultProps = {
  currentUser: undefined,
  majorId: undefined,
};

export default injectIntl(QuestionsList);
