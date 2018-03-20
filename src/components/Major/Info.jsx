import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Divider, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import get from 'lodash/get';
import RichText from '../RichText';
import ActionBar from '../../containers/Layout/ActionBar';
import Title from '../Layout/Title';
import { majorShape } from '../../shapes';
import { themeStyles } from '../../theme';
import majorPlaceholder from '../../images/major.png';

const styles = {
  mediaContainer: themeStyles.mediaContainer,
  shortDescription: themeStyles.justifiedTextContainer,
};

function MajorInfo({ major, intl: { formatMessage: t } }) {
  return (
    <div>
      <ActionBar />
      <Title text={major.name} />

      <Divider>{t({ id: 'majors.review' })}</Divider>
      <Row type="flex" align="middle" gutter={24}>
        <Col sm={6}>
          <div style={styles.mediaContainer}>
            <img src={get(major.logo, 'medium') || majorPlaceholder} alt="major-logo" />
          </div>
        </Col>
        <Col sm={18}>
          <p>{t({ id: 'majors.ofType' }, { type: t({ id: `majors.${major.category}` }) })}</p>
          <p style={styles.shortDescription}>{major.shortDescription}</p>
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
