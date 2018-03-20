import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import {
  PictureField,
  SwitchField,
  SubmitButton,
} from '../Forms';

const styles = {
  centered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

function AnnouncementForm({
  validators,
  valid,
  submitting,
  handleSubmit,
  intl: { formatMessage: t },
}) {
  return (
    <form onSubmit={handleSubmit}>
      <div style={styles.centered}>
        <Field
          name="picture"
          component={PictureField}
          instructions={{
            changePicture: t({ id: 'forms.changePicture' }),
            drop: t({ id: 'forms.dropzone' }),
          }}
          validate={validators.required}
        />
      </div>
      <div style={styles.centered}>
        <Field
          name="pinned"
          component={SwitchField}
          label={t({ id: 'forms.pinned' })}
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
  intl: intlShape.isRequired,
};

export default AnnouncementForm;
