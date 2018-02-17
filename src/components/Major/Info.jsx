/* eslint-disable react/no-danger */
import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Divider, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import { majorShape } from '../../shapes';

const styles = {
  videoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

function MajorInfo({ major, intl: { formatMessage: t } }) {
  return (
    <div>
      <Divider>{t({ id: 'majors.review' })}</Divider>
      <Row type="flex" align="middle" gutter={24}>
        <Col sm={12}>
          <p>{t({ id: 'majors.ofType' }, { type: t({ id: `majors.${major.category}` }) })}</p>
          <p>{major.shortDescription}</p>
        </Col>
        <Col sm={12}>
          <div style={styles.videoContainer}>
            <ReactPlayer url={major.videoUrl} height={240} controls />
          </div>
        </Col>
      </Row>

      <Divider>{t({ id: 'majors.moreInfo' })}</Divider>
      <div dangerouslySetInnerHTML={{ __html: major.description }} />
    </div>
  );
}

MajorInfo.propTypes = {
  major: majorShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(MajorInfo);
