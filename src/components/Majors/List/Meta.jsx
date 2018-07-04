import React from 'react';
import { injectIntl, intlShape } from 'react-intl';
import { List } from 'antd';
import get from 'lodash/get';
import Image, { sizes } from '../../Layout/Image';
import MajorLink from '../Major/Link';
import { majorShape, majorOfInterestShape } from '../../../shapes';
import { themeStyles } from '../../../theme';
import majorPlaceholder from '../../../images/major.png';

const { Item } = List;
const { Meta } = Item;

const styles = {
  shortDescription: themeStyles.justifiedTextContainer,
};

function MajorMeta({ major, majorOfInterest, intl: { formatMessage: t } }) {
  const id = major ? major.id : majorOfInterest.majorId;
  const { logo, name } = major || majorOfInterest;

  const avatar = (
    <MajorLink id={id}>
      <Image src={get(logo, 'thumb') || majorPlaceholder} size={sizes.thumb} />
    </MajorLink>
  );

  const title = (
    <span>
      <MajorLink id={id}>{name}</MajorLink>
    </span>
  );

  const description = majorOfInterest
    ? t({ id: `majors.${majorOfInterest.category}` })
    : <p style={styles.shortDescription}>{major.shortDescription}</p>;

  return <Meta avatar={avatar} title={title} description={description} />;
}

MajorMeta.propTypes = {
  major: majorShape,
  majorOfInterest: majorOfInterestShape,
  intl: intlShape.isRequired,
};

MajorMeta.defaultProps = {
  major: undefined,
  majorOfInterest: undefined,
};

export default injectIntl(MajorMeta);
