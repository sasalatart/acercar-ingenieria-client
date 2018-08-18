import React from 'react';
import { FormattedMessage } from 'react-intl';
import { List } from 'antd';
import get from 'lodash/get';
import Image, { sizes } from '../../Layout/Image';
import MajorLink from '../Major/Link';
import { majorShape, majorOfInterestShape } from '../../../shapes';
import majorPlaceholder from '../../../images/major.png';

const { Item } = List;
const { Meta } = Item;

const styles = {
  shortDescription: {
    textAlign: 'justify',
  },
};

function MajorMeta({ major, majorOfInterest }) {
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
    ? <FormattedMessage id={`majors.${majorOfInterest.category}`} />
    : <p style={styles.shortDescription}>{major.shortDescription}</p>;

  return <Meta avatar={avatar} title={title} description={description} />;
}

MajorMeta.propTypes = {
  major: majorShape,
  majorOfInterest: majorOfInterestShape,
};

MajorMeta.defaultProps = {
  major: undefined,
  majorOfInterest: undefined,
};

export default MajorMeta;
