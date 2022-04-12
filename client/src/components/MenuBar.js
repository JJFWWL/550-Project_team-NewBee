import React from 'react';
import { Menu, Affix } from "antd";
import { BankOutlined, RedditOutlined, TeamOutlined, SketchCircleFilled } from '@ant-design/icons';

class MenuBar extends React.Component {
  render() {
    return (
      <Affix><Menu theme="dark" mode="horizontal">
        <Menu.Item key="1" icon={<BankOutlined />}><a href="/" style={{fontFamily:'cursive'}}>Home</a></Menu.Item>
        <Menu.Item key="2" icon={<RedditOutlined />}><a href="/businesses" style={{fontFamily:'cursive'}}>Restaurant Recommender</a></Menu.Item>
        <Menu.Item key="3" icon={<TeamOutlined />}><a href="/friends" style={{fontFamily:'cursive'}}>Find Friends</a></Menu.Item>
        <Menu.Item key="4" icon={<SketchCircleFilled />}><a href="/scientists" style={{fontFamily:'cursive'}}>Restaurant Scientists</a></Menu.Item>

      </Menu></Affix>
    )
  }
}

export default MenuBar
