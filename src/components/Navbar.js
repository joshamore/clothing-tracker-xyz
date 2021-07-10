import React from 'react';
import styled from 'styled-components';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const MenuButton = styled(IconButton)`
  margin-left: auto;
`;

const Navbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>👕 Clothing Tracker</Typography>
        <MenuButton edge='start' color='inherit' aria-label='menu'>
          <MenuIcon />
        </MenuButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
