import React, { Fragment } from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { Row, Col } from 'antd';
import Linkify from 'react-linkify';
import ReactPlayer from 'react-player';
import ActionBar from '../containers/Layout/ActionBar';
import Title from './Layout/Title';
import { themeStyles } from '../theme';

const styles = {
  justifiedText: {
    textAlign: 'justify',
  },
  mediaContainer: themeStyles.mediaContainer,
};

function renderParagraph(text) {
  return (
    <Linkify>
      <p style={styles.justifiedText}>{text}</p>
    </Linkify>
  );
}

function AboutUs({ intl: { formatMessage: t } }) {
  return (
    <Fragment>
      <ActionBar />
      <Title>{t({ id: 'aboutUs' })}</Title>

      <Row gutter={36}>
        <Col sm={12}>
          <h1>{t({ id: 'aboutUs.whatIsAI.title' })}</h1>
          {renderParagraph(t({ id: 'aboutUs.whatIsAI.content' }))}

          <div style={styles.mediaContainer}>
            <ReactPlayer url="//player.vimeo.com/video/56773559" controls />
          </div>
        </Col>
        <Col sm={12}>
          <h1>{t({ id: 'aboutUs.mission.title' })}</h1>
          {renderParagraph(t({ id: 'aboutUs.mission.content' }))}

          <h1>{t({ id: 'aboutUs.vision.title' })}</h1>
          {renderParagraph(t({ id: 'aboutUs.vision.content' }))}
        </Col>
      </Row>
    </Fragment>
  );
}

AboutUs.propTypes = {
  intl: intlShape.isRequired,
};

export default injectIntl(AboutUs);
