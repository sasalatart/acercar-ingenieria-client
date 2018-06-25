import React from 'react';
import PropTypes from 'prop-types';
import { Menu, Layout } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Hideable from './Layout/Hideable';
import { themeStyles, breakpointsKeys } from '../theme';

const { Sider } = Layout;
const { Item } = Menu;

const styles = {
  sider: themeStyles.innerSider,
  menu: {
    marginBottom: '15px',
  },
  icon: {
    marginRight: '5px',
  },
  smIcon: {
    marginRight: '1px',
  },
};

function renderMenuItem(item, smScreen) {
  return (
    <Item key={item.key}>
      <FontAwesomeIcon icon={item.icon} style={smScreen ? styles.smIcon : styles.icon} />
      <Hideable breakpoint={breakpointsKeys.xs}>{item.text}</Hideable>
      {item.extra}
    </Item>
  );
}

function CustomMenu({
  items,
  activeMenuKey,
  smScreen,
  replaceRoute,
}) {
  const menu = (
    <Menu
      selectedKeys={[activeMenuKey]}
      onClick={({ key }) => replaceRoute(key)}
      mode={smScreen ? 'horizontal' : 'vertical'}
      style={styles.menu}
    >
      {items
        .filter(({ noRender }) => !noRender)
        .map(item => renderMenuItem(item, smScreen))}
    </Menu>
  );

  return smScreen
    ? menu
    : <Sider breakpoint="sm" collapsedWidth="45" style={styles.sider}>{menu}</Sider>;
}

CustomMenu.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    noRender: PropTypes.bool,
  })).isRequired,
  activeMenuKey: PropTypes.string.isRequired,
  smScreen: PropTypes.bool.isRequired,
  replaceRoute: PropTypes.func.isRequired,
};

export default CustomMenu;
