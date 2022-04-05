import React from 'react';
import { Menu } from "antd";
import { BankOutlined, RedditOutlined, TeamOutlined, SketchCircleFilled } from '@ant-design/icons';

class MenuBar extends React.Component {
  render() {
    return (
      <Menu theme="dark" mode="horizontal">
        <Menu.Item key="1" icon={<BankOutlined />}><a href="/">Home</a></Menu.Item>
        <Menu.Item key="2" icon={<RedditOutlined />}><a href="/restaurants">Restaurant Recommender</a></Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined />}><a href="/friends">Find Friends</a></Menu.Item>
        <Menu.Item key="4" icon={<SketchCircleFilled />}><a href="/scientists">Restaurant Scientists</a></Menu.Item>

      </Menu>
    )
  }
}

export default MenuBar
