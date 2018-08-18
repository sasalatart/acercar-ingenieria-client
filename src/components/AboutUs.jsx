import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
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

function renderParagraph(textId) {
  return (
    <Linkify>
      <p style={styles.justifiedText}>
        <FormattedMessage id={textId} />
      </p>
    </Linkify>
  );
}

export default function AboutUs() {
  return (
    <Fragment>
      <ActionBar />
      <Title><FormattedMessage id="aboutUs" /></Title>

      <Row gutter={36}>
        <Col sm={12}>
          <h1><FormattedMessage id="aboutUs.whatIsAI.title" /></h1>
          {renderParagraph('aboutUs.whatIsAI.content')}

          <div style={styles.mediaContainer}>
            <ReactPlayer url="//player.vimeo.com/video/56773559" controls />
          </div>
        </Col>
        <Col sm={12}>
          <h1><FormattedMessage id="aboutUs.mission.title" /></h1>
          {renderParagraph('aboutUs.mission.content')}

          <h1><FormattedMessage id="aboutUs.vision.title" /></h1>
          {renderParagraph('aboutUs.vision.content')}
        </Col>
      </Row>
    </Fragment>
  );
}
