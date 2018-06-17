import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { List } from 'antd';
import isEmpty from 'lodash/isEmpty';
import MajorMeta from '../../../Majors/List/Meta';
import { majorOfInterestShape } from '../../../../shapes';

const { Item } = List;

const styles = {
  noneOfInterest: {
    textAlign: 'center',
  },
};

function renderMajor(majorOfInterest) {
  return (
    <Item>
      <MajorMeta majorOfInterest={majorOfInterest} />
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
      renderItem={renderMajor}
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
