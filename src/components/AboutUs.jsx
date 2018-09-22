import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import Linkify from 'react-linkify';
import ReactPlayer from 'react-player';
import ActionBar from '../containers/Layout/ActionBar';
import Title from './Layout/Title';
import { CONTACT_EMAIL } from './Layout/Footer';
import { themeStyles } from '../theme';
import logoCAi from '../images/logo-cai.png';
import logoCA from '../images/logo-ca.png';

const styles = {
  justifiedText: {
    textAlign: 'justify',
  },
  title: {
    marginTop: '1em',
    marginBottom: '0.5em',
  },
  logosContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '25px',
  },
  caiLogo: {
    maxWidth: '33%',
    height: 'auto',
  },
  caLogo: {
    maxWidth: '66%',
    height: 'auto',
  },
  contactInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
    marginTop: '25px',
  },
  signature: {
    margin: 0,
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

      <h1 style={styles.title}>
        <FormattedMessage id="aboutUs.whatIsAI.title" />
      </h1>
      {renderParagraph('aboutUs.whatIsAI.content')}

      <div style={styles.mediaContainer}>
        <ReactPlayer url="//player.vimeo.com/video/56773559" controls />
      </div>

      <h1 style={styles.title}>
        <FormattedMessage id="aboutUs.mission.title" />
      </h1>
      {renderParagraph('aboutUs.mission.content')}

      <h1 style={styles.title}>
        <FormattedMessage id="aboutUs.vision.title" />
      </h1>
      {renderParagraph('aboutUs.vision.content')}

      <div style={styles.logosContainer}>
        <img src={logoCA} alt="logo-ca" style={styles.caLogo} />
        <img src={logoCAi} alt="logo-cai" style={styles.caiLogo} />
      </div>

      <div style={styles.contactInfo}>
        <h2 style={styles.signature}>Acercar Ingeniería</h2>
        <a href={`mailto:${CONTACT_EMAIL}`}>
          {CONTACT_EMAIL}
        </a>
      </div>
    </Fragment>
  );
}
