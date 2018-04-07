import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { List, Avatar } from 'antd';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import MajorLink from '../../../Majors/Major/Link';
import { majorOfInterestShape } from '../../../../shapes';
import majorPlaceholder from '../../../../images/major.png';

const { Item } = List;
const { Meta } = Item;

const styles = {
  noneOfInterest: {
    textAlign: 'center',
  },
};

function renderMajor(major, t) {
  return (
    <Item>
      <Meta
        avatar={<Avatar src={get(major.logo, 'thumb') || majorPlaceholder} shape="square" />}
        title={<MajorLink id={major.majorId}>{major.name}</MajorLink>}
        description={t({ id: `majors.${major.category}` })}
      />
    </Item>
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
