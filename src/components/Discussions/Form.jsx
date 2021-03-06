import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { FormattedMessage } from 'react-intl';
import { Col, Row } from 'antd';
import {
  TextField,
  RichTextField,
  TagsField,
  SwitchField,
  FilesField,
  SubmitButton,
} from '../Forms';
import DataPlaceholder from '../Layout/DataPlaceholder';
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
    const { validators, admin } = this.props;

    const titleField = (
      <Field
        name="title"
        component={TextField}
        label={<FormattedMessage id="forms.title" />}
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
      <Row gutter={8} type="flex" align="middle">
        <Col sm={24} md={20}>
          {titleField}
        </Col>
        <Col sm={24} md={4}>
          <div style={styles.pinnedWrapper}>
            <Field
              name="pinned"
              component={SwitchField}
              label={<FormattedMessage id="forms.pinned" />}
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
    } = this.props;

    if (loading || noData) return <DataPlaceholder noData={noData} absolute />;

    const defaultTag = 'Acercar Ingeniería';
    return (
      <Fragment>
        <ActionBar />
        <Title>
          <FormattedMessage id={id ? 'discussions.edit' : 'discussions.new'} />
        </Title>

        <form onSubmit={handleSubmit}>
          {this.renderTopRow()}
          <Field
            name="description"
            component={RichTextField}
            label={<FormattedMessage id="forms.content" />}
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
              name="attachments"
              component={FilesField}
              previousAttachments={previousAttachments}
              instructions={<FormattedMessage id="forms.dropzone" />}
              label={<FormattedMessage id="forms.attachments" />}
              validate={validators.maxSizePerAttachment}
            />
          </div>
          <SubmitButton disabled={!valid || submitting} loading={submitting} />
        </form>
      </Fragment>
    );
  }
}
