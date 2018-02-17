import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { Card } from 'antd';
import { imageShape } from '../../shapes';
import majorPlaceholder from '../../images/major.png';

const { Meta } = Card;

const styles = {
  card: {
    width: 200,
  },
};

function MajorCard({
  name, category, logo, style, intl: { formatMessage: t }, ...rest
}) {
  const cover = <img alt="major-logo" src={logo ? logo.medium : majorPlaceholder} />;

  return (
    <Card cover={cover} style={{ ...styles.card, ...style }} hoverable {...rest}>
      <Meta title={name} description={t({ id: `majors.${category}` })} />
    </Card>
  );
}

MajorCard.propTypes = {
  name: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  logo: imageShape,
  style: PropTypes.shape({}),
  intl: intlShape.isRequired,
};

MajorCard.defaultProps = {
  logo: undefined,
  style: {},
};

export default injectIntl(MajorCard);
