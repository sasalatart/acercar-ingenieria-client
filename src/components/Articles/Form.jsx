import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import { Alert, Col, Row } from 'antd';
import {
  TextField,
  TextArea,
  RichTextField,
  SelectField,
  TagsField,
  ImageField,
  FilesField,
  SubmitButton,
} from '../Forms';
import DataPlaceholder from '../DataPlaceholder';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';
import { optionShape, attachmentShape } from '../../shapes';

const styles = {
  fileInputWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0',
  },
};

const GUTTER = 8;

export default class ArticleForm extends Component {
  static propTypes = {
    adminOrMajorAdmin: PropTypes.bool.isRequired,
    validators: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    id: PropTypes.number,
    majorOptions: PropTypes.arrayOf(optionShape).isRequired,
    categoryOptions: PropTypes.arrayOf(optionShape).isRequired,
    currentPreviewURL: PropTypes.string.isRequired,
    previousAttachments: PropTypes.arrayOf(attachmentShape).isRequired,
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    loadMajors: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    id: undefined,
  }

  componentDidMount() {
    this.props.loadMajors();
    this.props.loadCategories();
  }

  render() {
    const {
      adminOrMajorAdmin,
      validators,
      loading,
      noData,
      id,
      majorOptions,
      categoryOptions,
      currentPreviewURL,
      previousAttachments,
      valid,
      submitting,
      handleSubmit,
      intl: { formatMessage: t },
    } = this.props;

    if (loading || noData) return <DataPlaceholder noData={noData} absolute />;

    return (
      <Fragment>
        <ActionBar />
        <Title>{t({ id: `articles.${id ? 'edit' : 'new'}` })}</Title>

        {!adminOrMajorAdmin &&
          <Alert
            type="warning"
            message={t({ id: 'articles.approvalRequired.message' })}
            showIcon
          />
        }

        <form onSubmit={handleSubmit}>
          <Field
            name="title"
            component={TextField}
            label={t({ id: 'forms.title' })}
            validate={[validators.required]}
          />
          <Row gutter={GUTTER}>
            <Col sm={24} md={15}>
              {majorOptions.length > 0 &&
                <Field
                  name="majorId"
                  component={SelectField}
                  label="Major"
                  options={majorOptions}
                />
              }
              <Field
                name="categoryList"
                component={TagsField}
                label={t({ id: 'categories' })}
                options={categoryOptions}
              />
              <Field
                name="shortDescription"
                component={TextArea}
                label={t({ id: 'forms.shortDescription' })}
                validate={[validators.required, validators.maxShortDescriptionLength]}
              />
            </Col>
            <Col sm={24} md={9}>
              <div style={styles.fileInputWrapper}>
                <Field
                  name="preview"
                  component={ImageField}
                  label={t({ id: 'forms.optionalPicture' })}
                  imagePlaceholder={currentPreviewURL}
                  validate={[validators.image, validators.maxPreviewSize]}
                />
              </div>
            </Col>
          </Row>
          <Field
            name="content"
            component={RichTextField}
            label={t({ id: 'forms.content' })}
            validate={validators.requiredRichText}
          />
          <div style={styles.fileInputWrapper}>
            <Field
              name="attachments"
              component={FilesField}
              previousAttachments={previousAttachments}
              instructions={t({ id: 'forms.dropzone' })}
              label={t({ id: 'forms.attachments' })}
              validate={validators.maxSizePerAttachment}
            />
          </div>
          <SubmitButton disabled={!valid || submitting} loading={submitting} />
        </form>
      </Fragment>
    );
  }
}
