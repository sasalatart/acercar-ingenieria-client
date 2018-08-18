import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Radium from 'radium';
import HideableButton from '../Icons/HideableButton';
import { breakpoints } from '../../theme';

const styles = {
  actionBar: hasActions => ({
    display: 'flex',
    justifyContent: hasActions ? 'space-between' : 'flex-start',
    alignItems: 'center',
  }),
  actionButton: {
    margin: '0 5px',
    [breakpoints.sm]: {
      margin: '0 1px',
    },
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

function ActionBar({ actions, goBack }) {
  return (
    <div style={styles.actionBar(actions.length)}>
      <HideableButton type="primary" icon="chevron-left" onClick={goBack}>
        <FormattedMessage id="goBack" />
      </HideableButton>
      {renderActions(actions)}
    </div>
  );
}

ActionBar.propTypes = {
  actions: PropTypes.arrayOf(PropTypes.node),
  goBack: PropTypes.func.isRequired,
};

ActionBar.defaultProps = {
  actions: [],
};

export default Radium(ActionBar);
