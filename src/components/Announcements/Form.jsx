import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import {
  PictureField,
  CheckboxField,
  SubmitButton,
} from '../Forms';
import announcementsValidations from '../../validations/announcements';

const styles = {
  centered: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

class AnnouncementForm extends Component {
  static propTypes = {
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  componentWillMount() {
    this.setValidators(this.props.intl.formatMessage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.intl.locale !== this.props.intl.locale) {
      this.setValidators(nextProps.intl.formatMessage);
    }
  }

  setValidators(t) {
    this.setState({ validators: announcementsValidations(t) });
  }

  render() {
    const {
      valid, submitting, handleSubmit, intl: { formatMessage: t },
    } = this.props;
    const { validators } = this.state;

    return (
      <div>
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
            <span>{t({ id: 'forms.pinned' })}</span>
            <Field name="pinned" component={CheckboxField} hasFeedback={false} />
          </div>
          <SubmitButton disabled={!valid} loading={submitting} />
        </form>
      </div>
    );
  }
}

export default AnnouncementForm;
