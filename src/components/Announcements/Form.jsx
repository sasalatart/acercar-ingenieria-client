import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { ImageField, SwitchField, SubmitButton } from '../Forms';

const styles = {
  centered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  switchContainer: {
    margin: '15px 0',
  },
};

function AnnouncementForm({
  validators,
  valid,
  submitting,
  handleSubmit,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.centered}>
        <Field
          name="picture"
          component={ImageField}
          validate={[validators.required, validators.image, validators.maxPictureSize]}
        />
      </div>
      <div style={{ ...styles.centered, ...styles.switchContainer }}>
        <Field
          name="pinned"
          component={SwitchField}
          label={<FormattedMessage id="forms.pinned" />}
        />
      </div>
      <SubmitButton disabled={!valid || submitting} loading={submitting} />
    </form>
  );
}

AnnouncementForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default AnnouncementForm;
