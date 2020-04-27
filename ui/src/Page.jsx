import React from 'react';
import {
  Nav, NavItem,
  Navbar, Grid,
  Glyphicon,
} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Content from './Content.jsx';

function NavBar() {
  return (
    <Navbar>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Header>
        <Navbar.Brand>My Company Inventory</Navbar.Brand>
      </Navbar.Header>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav>
          <LinkContainer exact to="/">
            <NavItem>Home</NavItem>
          </LinkContainer>
          <LinkContainer to="/products">
            <NavItem>Product List</NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
function Footer() {
  return (
    <small>
      <p className="text-center">
        <Glyphicon glyph="copyright-mark" />
        <br />
        Yash Jain
        <br />
        <a href="https://github.com/yashj21/" target="blank">
          GitHub repository
        </a>
      </p>
    </small>
  );
}
export default function Page() {
    return (
      <div>
        <NavBar />
        <Grid fluid>
          <Content />
        </Grid>
        <Footer />
      </div>
    );
}