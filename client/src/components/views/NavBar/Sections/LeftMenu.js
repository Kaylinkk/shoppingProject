import React from 'react';
import { Menu } from 'antd';
const SubMenu = Menu.SubMenu;

function LeftMenu(props) {
  return (
    <Menu mode={props.mode}>
      <SubMenu title={<span>Menu</span>}>
        <Menu.Item key="home">
          <a href="/">Home</a>
        </Menu.Item>
        <Menu.Item key="history">
          <a href="/history">History</a>
        </Menu.Item>
      </SubMenu>
    </Menu >
  )
}

export default LeftMenu