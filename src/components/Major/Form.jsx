import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { intlShape } from 'react-intl';
import { Field } from 'redux-form';
import { Button, Row, Col } from 'antd';
import { TextField, TextArea, RadioField } from '../Forms';
import PictureInput from '../Forms/PictureInput';
import RichTextInput from '../Forms/RichTextInput';
import majorsValidations from '../../validations/majors';

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
  submitButton: {
    width: '100%',
  },
};

const GUTTER = 8;
const COLUMN_LAYOUT = { sm: 24, lg: 12 };
const CATEGORIES = ['disciplinary', 'interdisciplinary'];

class MajorEditForm extends Component {
  static propTypes = {
    currentLogoURL: PropTypes.string,
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    currentLogoURL: undefined,
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
    this.setState({ validators: majorsValidations(t) });
  }

  render() {
    const {
      currentLogoURL, valid, submitting, handleSubmit, intl: { formatMessage: t },
    } = this.props;

    const { validators } = this.state;

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
            component={PictureInput}
            imagePlaceholder={currentLogoURL}
            instructions={{
              changePicture: t({ id: 'forms.changeLogo' }),
              drop: t({ id: 'forms.dropzone' }),
            }}
          />
        </div>
        <Field
          name="description"
          component={RichTextInput}
          editorProps={{ placeholder: t({ id: 'forms.description' }) }}
        />
        <Button
          type="primary"
          htmlType="submit"
          disabled={!valid}
          loading={submitting}
          style={styles.submitButton}
        >
          {t({ id: 'forms.submit' })}
        </Button>
      </form>
    );
  }
}

export default MajorEditForm;
