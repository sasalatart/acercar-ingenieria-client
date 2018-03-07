import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Divider, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import RichText from '../RichText';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';
import { majorShape } from '../../shapes';
import { themeStyles } from '../../theme';

const styles = {
  mediaContainer: themeStyles.mediaContainer,
};

function MajorInfo({ major, intl: { formatMessage: t } }) {
  return (
    <div>
      <ActionBar />
      <Title text={major.name} />

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
      <RichText content={major.description} />
    </div>
  );
}

MajorInfo.propTypes = {
  major: majorShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(MajorInfo);
