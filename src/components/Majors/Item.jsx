import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { List, Avatar, Icon } from 'antd';
import WithAuthorization from '../../hoc/WithAuthorization';
import ImportantDestroyButton from '../../containers/Majors/DestroyButton';
import { majorShape } from '../../shapes';
import ROUTES from '../../routes';

const { Item } = List;
const { Meta } = Item;

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
  const avatar = <Avatar src={logo.medium} shape="square" />;

  const titleHref = ROUTES.MAJOR(id);
  const title = <Link to={titleHref} href={titleHref}>{name}</Link>;
  const actions = [
    <Link to={titleHref} href={titleHref}><Icon type="info-circle" /></Link>,
  ];

  if (admin) {
    const majorEditHref = ROUTES.MAJOR_EDIT(id);
    actions.push(<Link to={majorEditHref} href={majorEditHref}><Icon type="edit" /></Link>);

    const destroyButton = (
      <ImportantDestroyButton
        id={id}
        warningMessage={t({ id: 'majors.destroyWarning' })}
        textToFill={name}
        iconOnly
      />
    );

    actions.push(destroyButton);
  }

  return (
    <Item actions={actions}>
      <Meta avatar={avatar} title={title} description={shortDescription} />
    </Item>
  );
}

MajorItem.propTypes = {
  admin: PropTypes.bool.isRequired,
  major: majorShape.isRequired,
  intl: intlShape.isRequired,
};

export default injectIntl(WithAuthorization(MajorItem));
