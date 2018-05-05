import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import { Col, Row } from 'antd';
import {
  TextField,
  RichTextField,
  TagsField,
  SwitchField,
  FilesField,
  SubmitButton,
} from '../Forms';
import DataPlaceholder from '../DataPlaceholder';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';
import { attachmentShape } from '../../shapes';

const styles = {
  pinnedWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  tagsInputWrapper: {
    marginTop: '10px',
  },
  fileInputWrapper: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0',
  },
};

export default class DiscussionForm extends Component {
  static propTypes = {
    validators: PropTypes.shape({}).isRequired,
    admin: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    noData: PropTypes.bool.isRequired,
    id: PropTypes.number,
    previousAttachments: PropTypes.arrayOf(attachmentShape).isRequired,
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    loadDiscussion: PropTypes.func.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  };

  static defaultProps = {
    id: undefined,
  };

  componentDidMount() {
    if (this.props.id) {
      this.props.loadDiscussion();
    }
  }

  renderTopRow() {
    const { validators, admin, intl: { formatMessage: t } } = this.props;

    const titleField = (
      <Field
        name="title"
        component={TextField}
        placeholder={t({ id: 'forms.title' })}
        validate={[
          validators.required,
          validators.minTitleLength,
          validators.maxTitleLength,
        ]}
      />
    );

    if (!admin) {
      return titleField;
    }

    return (
      <Row gutter={8}>
        <Col sm={24} md={20}>
          {titleField}
        </Col>
        <Col sm={24} md={4}>
          <div style={styles.pinnedWrapper}>
            <Field
              name="pinned"
              component={SwitchField}
              label={t({ id: 'forms.pinned' })}
            />
          </div>
        </Col>
      </Row>
    );
  }

  render() {
    const {
      validators,
      loading,
      noData,
      id,
      previousAttachments,
      valid,
      submitting,
      handleSubmit,
      intl: { formatMessage: t },
    } = this.props;

    if (loading || noData) return <DataPlaceholder noData={noData} absolute />;

    const defaultTag = t({ id: 'discussions.defaultTag' });

    return (
      <div>
        <ActionBar />
        <Title>{t({ id: `discussions.${id ? 'edit' : 'new'}` })}</Title>

        <form onSubmit={handleSubmit}>
          {this.renderTopRow()}
          <Field
            name="description"
            component={RichTextField}
            editorProps={{ placeholder: t({ id: 'forms.content' }) }}
            validate={validators.requiredRichText}
          />
          <div style={styles.tagsInputWrapper}>
            <Field
              name="tagList"
              component={TagsField}
              label="Tags"
              options={[{ key: defaultTag, value: defaultTag, label: defaultTag }]}
              validate={validators.maxTagCount}
            />
          </div>
          <div style={styles.fileInputWrapper}>
            <Field
              name="attachments_attributes"
              component={FilesField}
              previousAttachments={previousAttachments}
              instructions={t({ id: 'forms.dropzone' })}
              validate={validators.maxSizePerAttachment}
            />
          </div>
          <SubmitButton disabled={!valid || submitting} loading={submitting} />
        </form>
      </div>
    );
  }
}
