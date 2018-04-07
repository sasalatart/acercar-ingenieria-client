import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { List, Avatar, Icon } from 'antd';
import get from 'lodash/get';
import WithAuthorization from '../../../hoc/WithAuthorization';
import DestroyButton from '../../../containers/DestroyButton';
import MajorLink from '../Major/Link';
import { majorShape } from '../../../shapes';
import ROUTES from '../../../routes';
import { themeStyles } from '../../../theme';
import majorPlaceholder from '../../../images/major.png';

const { Item } = List;
const { Meta } = Item;

const styles = {
  shortDescription: themeStyles.justifiedTextContainer,
};

function MajorItem({
  admin,
  major: {
    id,
    logo,
    name,
    shortDescription,
  },
  intl: { formatMessage: t },
}) {
  const avatar = <Avatar src={get(logo, 'thumb') || majorPlaceholder} shape="square" />;

  const title = <MajorLink id={id}>{name}</MajorLink>;
  const actions = [
    <MajorLink id={id}><Icon type="info-circle" /></MajorLink>,
  ];

  if (admin) {
    const majorEditHref = ROUTES.MAJOR_EDIT(id);
    actions.push(<Link to={majorEditHref} href={majorEditHref}><Icon type="edit" /></Link>);

    const destroyButton = (
      <DestroyButton
        collection="majors"
        id={id}
        warningMessage={t({ id: 'majors.destroyWarning' })}
        textToFill={name}
        important
        iconOnly
      />
    );

    actions.push(destroyButton);
  }

  const description = <p style={styles.shortDescription}>{shortDescription}</p>;
  return (
    <Item actions={actions}>
      <Meta avatar={avatar} title={title} description={description} />
    </Item>
  );
}

MajorItem.propTypes = {
  admin: PropTypes.bool.isRequired,
  major: majorShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(MajorItem));
