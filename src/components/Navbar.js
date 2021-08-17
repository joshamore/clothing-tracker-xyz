import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { supabase } from '../helpers/supabaseClient';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

const ButtonHolder = styled.div`
  margin-left: auto;
`;

const Navbar = ({ isLoggedIn }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    supabase.auth.signOut();
    handleClose();
  };

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>👕 Clothing Tracker</Typography>

        <ButtonHolder>
          <IconButton
            edge='start'
            color='inherit'
            aria-controls='navbar-menu'
            aria-haspopup='true'
            onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id='navbar-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {isLoggedIn ? (
              <div>
                <MenuItem onClick={handleClose} component={Link} to='/add'>
                  ➕ Add Clothing
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to='/view'>
                  👀 View Wardrobe
                </MenuItem>
                <MenuItem onClick={handleLogout}>👋 Logout</MenuItem>
              </div>
            ) : (
              <div>
                <MenuItem onClick={handleClose} component={Link} to='/login'>
                  Login
                </MenuItem>
                <MenuItem onClick={handleClose} component={Link} to='/signup'>
                  Sign Up
                </MenuItem>
              </div>
            )}
          </Menu>
        </ButtonHolder>
      </Toolbar>
    </AppBar>
  );
};

Navbar.propTypes = {
  isLoggedIn: PropTypes.bool,
};

Navbar.defaultProps = {
  isLoggedIn: false,
};

export default Navbar;
