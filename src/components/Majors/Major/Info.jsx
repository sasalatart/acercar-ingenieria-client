import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Divider, Row, Col } from 'antd';
import ReactPlayer from 'react-player';
import get from 'lodash/get';
import withAuthorization from '../../../hoc/withAuthorization';
import CommentsSection from '../../Comments/Section';
import RichText from '../../Layout/RichText';
import Image from '../../Layout/Image';
import HideableButton from '../../Icons/HideableButton';
import { majorShape } from '../../../shapes';
import { themeStyles } from '../../../theme';
import routes from '../../../lib/routes';
import collections from '../../../lib/collections';
import majorPlaceholder from '../../../images/major.png';

const styles = {
  mediaContainer: themeStyles.mediaContainer,
  shortDescription: {
    textAlign: 'justify',
  },
};

function getActions(adminOrMajorAdmin, id) {
  const actions = [];

  if (adminOrMajorAdmin) {
    const editButton = (
      <HideableButton to={routes.majorEdit(id)} icon="edit">
        <FormattedMessage id="majors.edit" />
      </HideableButton>
    );

    actions.push(editButton);
  }

  return actions;
}

function MajorInfo({
  loggedIn,
  adminOrMajorAdmin,
  major,
  renderHeader,
}) {
  const subtitle = <FormattedMessage id={`majors.${major.category}`} />;
  const actions = getActions(adminOrMajorAdmin, major.id);

  return (
    <Fragment>
      {renderHeader({ subtitle, actions })}

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
            baseCollection={collections.majors}
            baseId={major.id}
            toggable
          />
        </Fragment>
      }
    </Fragment>
  );
}

MajorInfo.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  adminOrMajorAdmin: PropTypes.bool.isRequired,
  major: majorShape.isRequired,
  renderHeader: PropTypes.func.isRequired,
};

export default withAuthorization(MajorInfo);
