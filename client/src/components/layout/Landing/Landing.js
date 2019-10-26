import React from "react";
import { Nav, Navbar, NavDropdown } from "react-bootstrap";

import { Icon } from "../";

import "./Landing.scss";

const Landing = () => {
  return (
    <div className='landing'>
      <Navbar className='landing-navbar' bg='light' expand='lg'>
        <Navbar.Brand href='/'>Synergy</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/download'>Download</Nav.Link>
            <Nav.Link href='/support'>Support</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href='#link' inline>
              <Icon name='GitHub' />
            </Nav.Link>
            <Nav.Link href='#link' inline>
              <Icon name='Twitter' />
            </Nav.Link>
            <Nav.Link href='#link' inline>
              <Icon name='Facebook' />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Landing;
