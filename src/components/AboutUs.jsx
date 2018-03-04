import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import Title from './Layout/Title';
import { themeStyles } from '../theme';

const styles = {
  justifiedText: {
    textAlign: 'justify',
  },
  mediaContainer: themeStyles.mediaContainer,
};

function AboutUs({ intl: { formatMessage: t } }) {
  return (
    <div>
      <Title text={t({ id: 'aboutUs' })} />

      <Row gutter={36}>
        <Col sm={12}>
          <h1>{t({ id: 'aboutUs.whatIsAI.title' })}</h1>
          <p style={styles.justifiedText}>{t({ id: 'aboutUs.whatIsAI.content' })}</p>

          <div style={styles.mediaContainer}>
            <ReactPlayer url="//player.vimeo.com/video/56773559" controls />
          </div>
        </Col>
        <Col sm={12}>
          <h1>{t({ id: 'aboutUs.mission.title' })}</h1>
          <p style={styles.justifiedText}>{t({ id: 'aboutUs.mission.content' })}</p>

          <h1>{t({ id: 'aboutUs.vision.title' })}</h1>
          <p style={styles.justifiedText}>{t({ id: 'aboutUs.vision.content' })}</p>
        </Col>
      </Row>
    </div>
  );
}

AboutUs.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AboutUs);
