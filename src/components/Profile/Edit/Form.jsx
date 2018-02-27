import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { Alert, Icon, Row, Col } from 'antd';
import {
  TextField,
  NumberField,
  TextArea,
  PictureField,
  SelectField,
  SubmitButton,
} from '../../Forms';
import Spinner from '../../Spinner';
import usersValidations from '../../../validations/users';
import { majorShape } from '../../../shapes';
import { colors } from '../../../theme';

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

const fieldIcons = {
  email: <Icon type="user" style={styles.fieldPrefix} />,
  password: <Icon type="lock" style={styles.fieldPrefix} />,
};

const GUTTER = 8;
const COLUMN_LAYOUT = { sm: 24, lg: 12 };

class ProfileEditForm extends Component {
  static propTypes = {
    initialValues: PropTypes.shape({}).isRequired,
    currentAvatarURL: PropTypes.string,
    majors: ImmutablePropTypes.mapOf(majorShape),
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

  componentWillMount() {
    this.props.loadMajors();
    this.setValidators(this.props.intl.formatMessage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.intl.locale !== this.props.intl.locale) {
      this.setValidators(nextProps.intl.formatMessage);
    }
  }

  setValidators(t) {
    this.setState({ validators: usersValidations(t) });
  }

  getMajorsOptions() {
    return Object.values(this.props.majors.toJS())
      .map(({ id, name }) => ({ key: id, value: id, label: name }));
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
      currentAvatarURL, majors, valid, submitting, handleSubmit, intl: { formatMessage: t },
    } = this.props;

    if (!majors) {
      return <Spinner absolute />;
    }

    const { validators } = this.state;

    return (
      <div>
        {this.renderEmailChangedAlert()}

        <form onSubmit={handleSubmit}>
          <Row gutter={GUTTER}>
            <Col {...COLUMN_LAYOUT}>
              <Field
                name="email"
                component={TextField}
                placeholder="e-mail"
                prefix={fieldIcons.email}
                validate={[validators.required, validators.pucEmail]}
                onChange={this.checkEmailChanged}
              />
            </Col>
            <Col {...COLUMN_LAYOUT}>
              <Field
                name="generation"
                component={NumberField}
                placeholder={t({ id: 'forms.generation' })}
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
                placeholder={t({ id: 'forms.firstName' })}
                validate={[validators.required, validators.maxNameLength]}
              />
            </Col>
            <Col {...COLUMN_LAYOUT}>
              <Field
                name="lastName"
                component={TextField}
                placeholder={t({ id: 'forms.lastName' })}
                validate={[validators.required, validators.maxNameLength]}
              />
            </Col>
          </Row>
          <Field
            name="bio"
            component={TextArea}
            placeholder="Bio"
            validate={validators.maxBioLength}
          />
          <Field
            name="majorUsersAttributes"
            component={SelectField}
            mode="multiple"
            options={this.getMajorsOptions()}
          />
          <div style={styles.avatarFieldWrapper}>
            <Field
              name="avatar"
              component={PictureField}
              imagePlaceholder={currentAvatarURL}
              instructions={{
                changePicture: t({ id: 'forms.changeAvatar' }),
                drop: t({ id: 'forms.dropzone' }),
              }}
            />
          </div>
          <SubmitButton disabled={!valid} loading={submitting} />
        </form>
      </div>
    );
  }
}

export default ProfileEditForm;
