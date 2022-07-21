import React from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { getCookie } from "./App";

class MainNavbar extends React.Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark" expand="md">
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
              <LinkContainer to="about">
                <Nav.Link>About</Nav.Link>
              </LinkContainer>
              <NavDropdown title="DEBUG">
                <NavDropdown.Item onClick={() => console.log(document.cookie)}>Log all cookies</NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {
                    document.cookie.split("; ").forEach((cookie) => {
                      document.cookie = `${cookie.split("=")[0]}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
                    });
                  }}
                >
                  Force clean all cookies
                </NavDropdown.Item>
              </NavDropdown>
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
