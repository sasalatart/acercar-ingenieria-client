import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Divider, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import get from 'lodash/get';
import RichText from '../../../RichText';
import ActionBar from './ActionBar';
import Title from '../../../Layout/Title';
import SubTitle from '../../../Layout/SubTitle';
import Image from '../../../Image';
import { majorShape } from '../../../../shapes';
import { themeStyles } from '../../../../theme';
import majorPlaceholder from '../../../../images/major.png';

const styles = {
  mediaContainer: themeStyles.mediaContainer,
  shortDescription: themeStyles.justifiedTextContainer,
};

function MajorInfo({ major, intl: { formatMessage: t } }) {
  return (
    <Fragment>
      <ActionBar id={major.id} />
      <Title>{major.name}</Title>
      <SubTitle>{t({ id: `majors.${major.category}` })}</SubTitle>

      <Divider>{t({ id: 'majors.review' })}</Divider>
      <Row type="flex" align="middle" gutter={24}>
        <Col sm={6}>
          <div style={styles.mediaContainer}>
            <Image src={get(major.logo, 'medium', majorPlaceholder)} />
          </div>
        </Col>
        <Col sm={18}>
          <p style={styles.shortDescription}>{major.shortDescription}</p>
        </Col>
      </Row>

      <Divider>Video</Divider>
      <div style={styles.mediaContainer}>
        <ReactPlayer url={major.videoUrl} controls />
      </div>

      <Divider>{t({ id: 'majors.moreInfo' })}</Divider>
      <RichText content={major.description} />
    </Fragment>
  );
}

MajorInfo.propTypes = {
  major: majorShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(MajorInfo);
