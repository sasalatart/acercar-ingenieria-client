import React from 'react';
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

function renderTopRow(validators, admin, t) {
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

function DiscussionForm({
  validators,
  admin,
  loading,
  noData,
  id,
  previousAttachments,
  valid,
  submitting,
  handleSubmit,
  intl: { formatMessage: t },
}) {
  if (loading || noData) {
    return <DataPlaceholder noData={noData} absolute />;
  }

  const defaultTag = t({ id: 'discussions.defaultTag' });

  return (
    <div>
      <ActionBar />
      <Title text={t({ id: `discussions.${id ? 'edit' : 'new'}` })} />

      <form onSubmit={handleSubmit}>
        {renderTopRow(validators, admin, t)}
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
        <SubmitButton disabled={!valid || submitting} loading={submitting} />
      </form>
    </div>
  );
}

DiscussionForm.propTypes = {
  validators: PropTypes.shape({}).isRequired,
  admin: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  noData: PropTypes.bool.isRequired,
  id: PropTypes.number,
  previousAttachments: PropTypes.arrayOf(attachmentShape).isRequired,
  valid: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  intl: intlShape.isRequired,
};

DiscussionForm.defaultProps = {
  id: undefined,
};

export default DiscussionForm;
