import React from 'react';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "shards-react";

class MenuBar extends React.Component {
  render() {
    return (
      <Navbar type="light" theme="primary" expand="md">
        <NavbarBrand href="/">Yelp Dataset</NavbarBrand>
        <Nav navbar>
          <NavItem>
            <NavLink active href="/">
              Home
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink active href="/friends">
              Find Friends
            </NavLink>
          </NavItem>
          {/* <NavItem>
            <NavLink active href="/matches" >
              Matches
            </NavLink>
          </NavItem> */}
        </Nav>
      </Navbar>
    )
  }
}

export default MenuBar
