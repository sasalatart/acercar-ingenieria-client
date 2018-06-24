import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Divider, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import get from 'lodash/get';
import RichText from '../../../RichText';
import ActionBar from './ActionBar';
import Title from '../../../Layout/Title';
import SubTitle from '../../../Layout/SubTitle';
import Image from '../../../Image';
import CommentsSection from '../../../Comments/Section';
import { majorShape } from '../../../../shapes';
import { themeStyles } from '../../../../theme';
import collections from '../../../../lib/collections';
import majorPlaceholder from '../../../../images/major.png';

const styles = {
  mediaContainer: themeStyles.mediaContainer,
  shortDescription: themeStyles.justifiedTextContainer,
};

function MajorInfo({ loggedIn, major, intl: { formatMessage: t } }) {
  return (
    <Fragment>
      <ActionBar id={major.id} />
      <Title>{major.name}</Title>
      <SubTitle>{t({ id: `majors.${major.category}` })}</SubTitle>

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
  intl: intlShape.isRequired,
};

export default injectIntl(MajorInfo);
