import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { Icon } from "..";
import { logoutUser } from "../../../actions/authActions";

import "./MainMenu.scss";

/**
 * The menu button found inside of the Dock component that handles user settings and authentication
 */
const Fuck = ({ history, logoutUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onLogoutClick = e => {
    logoutUser();
    history.push("/");
  };

  const menuItems = (
    <div className='main-menu'>
      <MenuItem className='main-menu-item' onClick={handleClose}>
        <Link className='main-menu-link' to='/profile'>
          Profile
        </Link>
      </MenuItem>
      <MenuItem className='main-menu-item' onClick={handleClose}>
        <Link className='main-menu-link' to='/settings'>
          My Account
        </Link>
      </MenuItem>
      <MenuItem
        className='main-menu-item'
        onClick={() => {
          onLogoutClick();
          handleClose();
        }}
      >
        Logout
      </MenuItem>
    </div>
  );

  return (
    <div>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <Icon name='Dehaze' />
      </Button>
      <Menu
        id='simple-menu'
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {menuItems}
      </Menu>
    </div>
  );
};

const mapDispatchToProps = {
  logoutUser
};

export default connect(null, mapDispatchToProps)(withRouter(Fuck));
