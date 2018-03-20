import React from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { Row, Col } from 'antd';
import {
  TextField,
  TextArea,
  RichTextField,
  PictureField,
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
  intl: { formatMessage: t },
}) {
  const categoryOptions = CATEGORIES.map(key => ({
    key,
    label: t({ id: `majors.${key}` }),
    value: key,
  }));

  return (
    <form onSubmit={handleSubmit}>
      <Row gutter={GUTTER}>
        <Col {...COLUMN_LAYOUT}>
          <Field
            name="name"
            component={TextField}
            placeholder={t({ id: 'forms.name' })}
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
        placeholder={t({ id: 'forms.shortDescription' })}
        validate={[validators.required, validators.maxShortDescriptionLength]}
      />
      <Field
        name="videoUrl"
        component={TextField}
        placeholder={t({ id: 'forms.videoURL' })}
        validate={[validators.required, validators.videoUrl]}
      />
      <div style={styles.logoFieldWrapper}>
        <Field
          name="logo"
          component={PictureField}
          imagePlaceholder={currentLogoURL}
          instructions={{
            changePicture: t({ id: 'forms.changeLogo' }),
            drop: t({ id: 'forms.dropzone' }),
          }}
        />
      </div>
      <Field
        name="description"
        component={RichTextField}
        editorProps={{ placeholder: t({ id: 'forms.description' }) }}
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
  intl: intlShape.isRequired,
};

MajorForm.defaultProps = {
  currentLogoURL: undefined,
};

export default MajorForm;
