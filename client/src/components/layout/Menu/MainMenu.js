import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { Icon } from "../";
import { logoutUser } from "../../../actions/authActions";

/**
 * The menu button found inside of the Dock component that handles user settings and authentication
 */
const MainMenu = ({ auth, history, logoutUser }) => {
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

  const { isAuthenticated } = auth;

  let menuItems;
  if (isAuthenticated) {
    menuItems = (
      <div>
        <MenuItem onClick={handleClose}>
          <Link to='/profile'>Profile</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to='/settings'>My Account</Link>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onLogoutClick();
            handleClose();
          }}
        >
          Logout
        </MenuItem>
      </div>
    );
  } else {
    menuItems = (
      <div>
        <MenuItem onClick={handleClose}>
          <Link to='/register'>Register</Link>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to='/login'>Login</Link>
        </MenuItem>
      </div>
    );
  }

  return (
    <div>
      <Button
        aria-controls='simple-menu'
        aria-haspopup='true'
        onClick={handleClick}
      >
        <Icon name='dehaze' />
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

const mapStateToProps = state => ({
  auth: state.auth
});

const mapDispatchToProps = {
  logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(MainMenu));
