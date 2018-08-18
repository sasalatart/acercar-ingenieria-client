import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Divider, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import get from 'lodash/get';
import RichText from '../../../Layout/RichText';
import Title from '../../../Layout/Title';
import SubTitle from '../../../Layout/SubTitle';
import Image from '../../../Layout/Image';
import ActionBar from './ActionBar';
import CommentsSection from '../../../Comments/Section';
import { majorShape } from '../../../../shapes';
import { themeStyles } from '../../../../theme';
import collections from '../../../../lib/collections';
import majorPlaceholder from '../../../../images/major.png';

const styles = {
  mediaContainer: themeStyles.mediaContainer,
  shortDescription: {
    textAlign: 'justify',
  },
};

function MajorInfo({ loggedIn, major }) {
  return (
    <Fragment>
      <ActionBar id={major.id} />
      <Title>{major.name}</Title>
      <SubTitle><FormattedMessage id={`majors.${major.category}`} /></SubTitle>

      <Divider />
      <Row type="flex" justify="center" align="middle" gutter={24}>
        <Col sm={6}>
          <div style={styles.mediaContainer}>
            <Image src={get(major.logo, 'medium', majorPlaceholder)} />
          </div>
        </Col>
        <Col sm={18}>
          <p style={styles.shortDescription}>{major.shortDescription}</p>
        </Col>
      </Row>

      <Divider />
      <div style={styles.mediaContainer}>
        <ReactPlayer url={major.videoUrl} controls />
      </div>

      <Divider />
      <RichText content={major.description} />

      {loggedIn &&
        <Fragment>
          <Divider />
          <CommentsSection
            baseResourceName={collections.majors}
            baseResourceId={major.id}
            toggable
          />
        </Fragment>
      }
    </Fragment>
  );
}

MajorInfo.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  major: majorShape.isRequired,
};

export default MajorInfo;
