import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import { Col, Row } from 'antd';
import {
  TextField,
  TextArea,
  RichTextField,
  SelectField,
  PictureField,
  FilesField,
  SubmitButton,
} from '../Forms';
import Spinner from '../Spinner';
import Title from '../Layout/Title';
import { optionShape, attachmentShape } from '../../shapes';
import articlesValidations from '../../validations/articles';

const styles = {
  fileInputWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0',
  },
};

const GUTTER = 8;
const COLUMN_LAYOUT = { sm: 24, lg: 12 };

class ArticleForm extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired,
    articleId: PropTypes.number,
    majorOptions: PropTypes.arrayOf(optionShape).isRequired,
    categoryOptions: PropTypes.arrayOf(optionShape).isRequired,
    currentPictureURL: PropTypes.string.isRequired,
    previousAttachments: PropTypes.arrayOf(attachmentShape).isRequired,
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    loadArticle: PropTypes.func,
    loadMajors: PropTypes.func.isRequired,
    loadCategories: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    articleId: undefined,
    loadArticle: undefined,
  }

  componentWillMount() {
    const {
      loadArticle, loadMajors, loadCategories, intl,
    } = this.props;

    if (loadArticle) {
      loadArticle();
    }
    loadMajors();
    loadCategories();

    this.setValidators(intl.formatMessage);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.intl.locale !== this.props.intl.locale) {
      this.setValidators(nextProps.intl.formatMessage);
    }
  }

  setValidators(t) {
    this.setState({ validators: articlesValidations(t) });
  }

  render() {
    const {
      loading,
      articleId,
      majorOptions,
      categoryOptions,
      currentPictureURL,
      previousAttachments,
      valid,
      submitting,
      handleSubmit,
      intl: { formatMessage: t },
    } = this.props;

    const { validators } = this.state;

    if (loading) {
      return <Spinner />;
    }

    return (
      <div>
        <Title text={t({ id: `articles.${articleId ? 'edit' : 'new'}` })} />
        <form onSubmit={handleSubmit}>
          <Field
            name="title"
            component={TextField}
            placeholder={t({ id: 'forms.title' })}
            validate={[validators.required]}
          />
          <Field
            name="shortDescription"
            component={TextArea}
            placeholder={t({ id: 'forms.shortDescription' })}
            validate={[validators.required, validators.maxShortDescriptionLength]}
          />
          <Row gutter={GUTTER}>
            <Col {...COLUMN_LAYOUT}>
              <Field
                name="majorId"
                component={SelectField}
                label="Major"
                options={majorOptions}
              />
            </Col>
            <Col {...COLUMN_LAYOUT}>
              <Field
                name="categoryList"
                component={SelectField}
                label={t({ id: 'categories' })}
                mode="multiple"
                options={categoryOptions}
              />
            </Col>
          </Row>
          <Field
            name="content"
            component={RichTextField}
            editorProps={{ placeholder: t({ id: 'forms.content' }) }}
            validate={validators.required}
          />
          <Row gutter={GUTTER}>
            <Col {...COLUMN_LAYOUT}>
              <div style={styles.fileInputWrapper}>
                <Field
                  name="picture"
                  component={PictureField}
                  imagePlaceholder={currentPictureURL}
                  instructions={{
                    changePicture: t({ id: 'forms.changePicture' }),
                    drop: t({ id: 'forms.dropzone' }),
                  }}
                />
              </div>
            </Col>
            <Col {...COLUMN_LAYOUT}>
              <div style={styles.fileInputWrapper}>
                <Field
                  name="attachments_attributes"
                  component={FilesField}
                  previousAttachments={previousAttachments}
                  instructions={t({ id: 'forms.dropzone' })}
                />
              </div>
            </Col>
          </Row>
          <SubmitButton disabled={!valid} loading={submitting} />
        </form>
      </div>
    );
  }
}

export default ArticleForm;
