import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { Row, Col } from 'antd';
import {
  TextField,
  TextArea,
  RichTextField,
  ImageField,
  RadioField,
  SubmitButton,
} from '../Forms';

const styles = {
  logoFieldWrapper: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '25px',
  },
  categoriesWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
};

const GUTTER = 8;
const COLUMN_LAYOUT = { sm: 24, lg: 12 };
const CATEGORIES = ['disciplinary', 'interdisciplinary'];

function MajorForm({
  validators,
  currentLogoURL,
  valid,
  submitting,
  handleSubmit,
}) {
  const categoryOptions = CATEGORIES.map(key => ({
    key,
    label: <FormattedMessage id={`majors.${key}`} />,
    value: key,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Row gutter={GUTTER} type="flex" align="bottom">
        <Col {...COLUMN_LAYOUT}>
          <Field
            name="name"
            component={TextField}
            label={<FormattedMessage id="forms.name" />}
            validate={validators.required}
          />
        </Col>
        <Col {...COLUMN_LAYOUT}>
          <div style={styles.categoriesWrapper}>
            <Field
              name="category"
              component={RadioField}
              validate={validators.required}
              radioOptions={categoryOptions}
              button
            />
          </div>
        </Col>
      </Row>
      <Field
        name="shortDescription"
        component={TextArea}
        label={<FormattedMessage id="forms.shortDescription" />}
        validate={[validators.required, validators.maxShortDescriptionLength]}
      />
      <Field
        name="videoUrl"
        component={TextField}
        label={<FormattedMessage id="forms.videoURL" />}
        validate={[validators.required, validators.videoUrl]}
      />
      <div style={styles.logoFieldWrapper}>
        <Field
          name="logo"
          component={ImageField}
          imagePlaceholder={currentLogoURL}
          label="Logo"
          validate={[validators.image, validators.maxLogoSize]}
        />
      </div>
      <Field
        name="description"
        component={RichTextField}
        label={<FormattedMessage id="forms.description" />}
        validate={validators.requiredRichText}
      />
      <SubmitButton disabled={!valid || submitting} loading={submitting} />
    </form>
  );
}

MajorForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  currentLogoURL: PropTypes.string,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

MajorForm.defaultProps = {
  currentLogoURL: undefined,
};

export default MajorForm;
