import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Button } from 'antd';

const styles = {
  actionBar: hasActions => ({
    display: 'flex',
    justifyContent: hasActions ? 'space-between' : 'flex-start',
    alignItems: 'center',
  }),
  actionButton: {
    margin: '0 5px',
  },
};

function renderActions(actions) {
  if (!actions.length) return null;

  return (
    <div>
      {actions.map(action => <span key={action.key} style={styles.actionButton}>{action}</span>)}
    </div>
  );
}

function ActionBar({ actions, goBack, intl: { formatMessage: t } }) {
  return (
    <div style={styles.actionBar(actions.length)}>
      <Button type="primary" icon="left" onClick={goBack}>{t({ id: 'routing.goBack' })}</Button>
      {renderActions(actions)}
    </div>
  );
}

ActionBar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  goBack: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

ActionBar.defaultProps = {
  actions: [],
};

export default ActionBar;
