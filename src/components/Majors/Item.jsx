import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { List, Avatar, Icon } from 'antd';
import DestroyButton from '../../containers/Majors/DestroyButton';
import { majorShape } from '../../shapes';
import ROUTES from '../../routes';

const { Item } = List;
const { Meta } = Item;

function MajorItem({
  hasAdminPrivileges,
  major: {
    id,
    logo,
    name,
    shortDescription,
  },
}) {
  const avatar = <Avatar src={logo.medium} shape="square" />;

  const titleHref = ROUTES.MAJOR(id);
  const title = <Link to={titleHref} href={titleHref}>{name}</Link>;
  const actions = [
    <Link to={titleHref} href={titleHref}><Icon type="info-circle" /></Link>,
  ];

  if (hasAdminPrivileges) {
    const majorEditHref = ROUTES.MAJOR_EDIT(id);
    actions.push(<Link to={majorEditHref} href={majorEditHref}><Icon type="edit" /></Link>);
    actions.push(<DestroyButton id={id} iconOnly />);
  }

  return (
    <Item actions={actions}>
      <Meta avatar={avatar} title={title} description={shortDescription} />
    </Item>
  );
}

MajorItem.propTypes = {
  hasAdminPrivileges: PropTypes.bool.isRequired,
  major: majorShape.isRequired,
};

export default MajorItem;
