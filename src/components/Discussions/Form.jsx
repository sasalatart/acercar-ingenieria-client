import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form';
import { intlShape } from 'react-intl';
import { Col, Row } from 'antd';
import {
  TextField,
  RichTextField,
  SelectField,
  SwitchField,
  FilesField,
  SubmitButton,
} from '../Forms';
import Spinner from '../Spinner';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';
import { attachmentShape } from '../../shapes';
import discussionsValidations from '../../validations/discussions';

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

class DiscussionForm extends Component {
  static propTypes = {
    admin: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
    discussionId: PropTypes.number,
    previousAttachments: PropTypes.arrayOf(attachmentShape).isRequired,
    valid: PropTypes.bool.isRequired,
    submitting: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    discussionId: undefined,
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
    this.setState({ validators: discussionsValidations(t) });
  }

  renderTopRow() {
    const { admin, intl: { formatMessage: t } } = this.props;
    const { validators } = this.state;

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
      loading,
      discussionId,
      previousAttachments,
      valid,
      submitting,
      handleSubmit,
      intl: { formatMessage: t },
    } = this.props;

    if (loading) {
      return <Spinner absolute />;
    }

    const { validators } = this.state;

    const defaultTag = t({ id: 'discussions.defaultTag' });

    return (
      <div>
        <ActionBar />
        <Title text={t({ id: `discussions.${discussionId ? 'edit' : 'new'}` })} />

        <form onSubmit={handleSubmit}>
          {this.renderTopRow()}
          <Field
            name="description"
            component={RichTextField}
            editorProps={{ placeholder: t({ id: 'forms.content' }) }}
            validate={validators.required}
          />
          <div style={styles.tagsInputWrapper}>
            <Field
              name="tagList"
              component={SelectField}
              label="Tags"
              mode="tags"
              options={[{ key: defaultTag, value: defaultTag, label: defaultTag }]}
              tokenSeparators={[',']}
              validate={validators.maxTagCount}
            />
          </div>
          <div style={styles.fileInputWrapper}>
            <Field
              name="attachments_attributes"
              component={FilesField}
              previousAttachments={previousAttachments}
              instructions={t({ id: 'forms.dropzone' })}
            />
          </div>
          <SubmitButton disabled={!valid} loading={submitting} />
        </form>
      </div>
    );
  }
}

export default DiscussionForm;
