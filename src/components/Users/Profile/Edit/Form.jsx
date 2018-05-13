import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { Alert, Row, Col } from 'antd';
import {
  TextField,
  NumberField,
  TextArea,
  ImageField,
  SelectField,
  SubmitButton,
} from '../../../Forms';
import DataPlaceholder from '../../../DataPlaceholder';
import { majorShape, optionShape } from '../../../../shapes';
import { colors } from '../../../../theme';

const styles = {
  emailChangedWarning: {
    margin: '25px 0',
  },
  fieldPrefix: {
    color: colors.fieldPrefix,
  },
  generationInput: {
    width: '100%',
  },
  avatarFieldWrapper: {
    display: 'flex',
    justifyContent: 'center',
  },
};

const GUTTER = 8;
const COLUMN_LAYOUT = { sm: 24, lg: 12 };

export default class ProfileEditForm extends Component {
  static propTypes = {
    validators: PropTypes.shape({}).isRequired,
    initialValues: PropTypes.shape({}).isRequired,
    currentAvatarURL: PropTypes.string,
    majors: PropTypes.arrayOf(majorShape),
    majorOptions: PropTypes.arrayOf(optionShape).isRequired,
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    loadMajors: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    currentAvatarURL: undefined,
    majors: undefined,
  }

  state = { emailChanged: false };

  componentDidMount() {
    this.props.loadMajors();
  }

  checkEmailChanged = (event, newEmail) => {
    const { initialValues } = this.props;
    this.setState({ emailChanged: initialValues.email !== newEmail });
  };

  renderEmailChangedAlert() {
    if (!this.state.emailChanged) {
      return null;
    }

    const { intl: { formatMessage: t } } = this.props;
    return (
      <Alert
        type="warning"
        message={t({ id: 'forms.warning' })}
        description={t({ id: 'forms.emailChanged' })}
        style={styles.emailChangedWarning}
        showIcon
      />
    );
  }

  render() {
    const {
      validators,
      currentAvatarURL,
      majors,
      majorOptions,
      valid,
      submitting,
      handleSubmit,
      intl: { formatMessage: t },
    } = this.props;

    if (!majors) {
      return <DataPlaceholder absolute />;
    }

    return (
      <div>
        {this.renderEmailChangedAlert()}

        <form onSubmit={handleSubmit}>
          <Row gutter={GUTTER}>
            <Col {...COLUMN_LAYOUT}>
              <Field
                name="email"
                component={TextField}
                label="e-mail"
                validate={[validators.required, validators.pucEmail]}
                onChange={this.checkEmailChanged}
              />
            </Col>
            <Col {...COLUMN_LAYOUT}>
              <Field
                name="generation"
                component={NumberField}
                label={t({ id: 'forms.generation' })}
                validate={[validators.required, validators.isBetweenYears]}
                style={styles.generationInput}
              />
            </Col>
          </Row>
          <Row gutter={GUTTER}>
            <Col {...COLUMN_LAYOUT}>
              <Field
                name="firstName"
                component={TextField}
                label={t({ id: 'forms.firstName' })}
                validate={[validators.required, validators.maxNameLength]}
              />
            </Col>
            <Col {...COLUMN_LAYOUT}>
              <Field
                name="lastName"
                component={TextField}
                label={t({ id: 'forms.lastName' })}
                validate={[validators.required, validators.maxNameLength]}
              />
            </Col>
          </Row>
          <Field
            name="bio"
            component={TextArea}
            label="Bio"
            validate={validators.maxBioLength}
          />
          <Field
            name="majorUsersAttributes"
            component={SelectField}
            label="Majors"
            mode="multiple"
            options={majorOptions}
          />
          <div style={styles.avatarFieldWrapper}>
            <Field
              name="avatar"
              component={ImageField}
              imagePlaceholder={currentAvatarURL}
              label="Avatar"
              validate={[validators.image, validators.maxAvatarSize]}
            />
          </div>
          <SubmitButton disabled={!valid || submitting} loading={submitting} />
        </form>
      </div>
    );
  }
}
