import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Divider, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import { Editor } from 'react-draft-wysiwyg';
import { stateFromContent } from '../Forms/RichTextInput';
import { majorShape } from '../../shapes';

const styles = {
  mediaContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function MajorInfo({ major, intl: { formatMessage: t } }) {
  return (
    <div>
      <h1>{major.name}</h1>
      <Divider>{t({ id: 'majors.review' })}</Divider>
      <Row type="flex" align="middle" gutter={24}>
        <Col sm={8}>
          <div style={styles.mediaContainer}>
            <img src={major.logo.medium} alt="major-logo" />
          </div>
        </Col>
        <Col sm={16}>
          <p>{t({ id: 'majors.ofType' }, { type: t({ id: `majors.${major.category}` }) })}</p>
          <p>{major.shortDescription}</p>
        </Col>
      </Row>

      <Divider>Video</Divider>
      <div style={styles.mediaContainer}>
        <ReactPlayer url={major.videoUrl} controls />
      </div>

      <Divider>{t({ id: 'majors.moreInfo' })}</Divider>
      <Editor editorState={stateFromContent(major.description)} readOnly toolbarHidden />
    </div>
  );
}

MajorInfo.propTypes = {
  major: majorShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(MajorInfo);
