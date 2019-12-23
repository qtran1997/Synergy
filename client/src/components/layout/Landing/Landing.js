import React from "react";
import { Nav, Navbar, Button } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import { Icon } from "../";

import "./Landing.scss";

const Landing = () => {
  let openLink = "/login";
  return (
    <div className='landing'>
      <Navbar className='landing-navbar' bg='light' expand='lg'>
        <Navbar.Brand href='/'>
          <b>Synergy</b>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link href='/download'>Download</Nav.Link>
            <Nav.Link href='/support'>Support</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href='#link' inline='true'>
              <Icon name='GitHub' size='large' />
            </Nav.Link>
            <Nav.Link href='#link' inline='true'>
              <Icon name='Twitter' size='large' />
            </Nav.Link>
            <Nav.Link href='#link' inline='true'>
              <Icon name='Facebook' size='large' />
            </Nav.Link>
            <Nav.Link href={openLink} inline='true'>
              <Button variant='secondary'>Open</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default withRouter(Landing);
