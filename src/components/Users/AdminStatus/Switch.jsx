import React from 'react';
import PropTypes from 'prop-types';
import { Switch } from 'antd';

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
};

function AdminStatusSwitch({
  currentUserId,
  userId,
  majorId,
  updating,
  label,
  active,
  onChange,
}) {
  return (
    <div style={styles.container}>
      <p>{label}</p>
      <Switch
        checked={active}
        loading={updating}
        disabled={updating || (currentUserId === userId && !majorId)}
        onChange={onChange}
      />
    </div>
  );
}

AdminStatusSwitch.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  userId: PropTypes.number.isRequired,
  majorId: PropTypes.number,
  updating: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

AdminStatusSwitch.defaultProps = {
  majorId: undefined,
};

export default AdminStatusSwitch;
