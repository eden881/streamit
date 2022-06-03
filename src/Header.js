import React from "react";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { LinkContainer } from "react-router-bootstrap";

class MainNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="sm">
        <Container>
          <Navbar.Brand>{this.props.appName}</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              <LinkContainer to="browse">
                <Nav.Link>Browse</Nav.Link>
              </LinkContainer>
              <LinkContainer to="settings">
                <Nav.Link>Settings</Nav.Link>
              </LinkContainer>
              <LinkContainer to="about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <React.Fragment>
        <MainNavbar appName={this.props.appName} />
      </React.Fragment>
    );
  }
}

export default Header;
