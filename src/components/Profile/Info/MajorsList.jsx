import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { List, Avatar } from 'antd';
import isEmpty from 'lodash/isEmpty';
import ROUTES from '../../../routes';
import { majorOfInterestShape } from '../../../shapes';
import majorImage from '../../../images/major.png';

const styles = {
  noneOfInterest: {
    textAlign: 'center',
  },
};

function renderMajor(major, t) {
  const href = ROUTES.MAJOR(major.id);

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Avatar src={major.logo.thumb || majorImage} shape="square" />}
        title={<Link to={href} href={href}>{major.name}</Link>}
        description={t({ id: `majors.${major.category}` })}
      />
    </List.Item>
  );
}

function MajorsList({ majorsOfInterest, intl: { formatMessage: t } }) {
  if (isEmpty(majorsOfInterest)) {
    return <h4 style={styles.noneOfInterest}>{t({ id: 'profile.noMajorsOfInterest' })}</h4>;
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={majorsOfInterest}
      renderItem={major => renderMajor(major, t)}
      bordered
    />
  );
}

MajorsList.propTypes = {
  majorsOfInterest: PropTypes.arrayOf(majorOfInterestShape),
  intl: intlShape.isRequired,
};

MajorsList.defaultProps = {
  majorsOfInterest: [],
};

export default injectIntl(MajorsList);