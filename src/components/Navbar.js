import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { supabase } from '../helpers/supabaseClient';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const ButtonHolder = styled.div`
  margin-left: auto;
`;

const Navbar = ({ isLoggedIn }) => {
  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6'>👕 Clothing Tracker</Typography>

        {isLoggedIn ? (
          <ButtonHolder>
            <Button
              variant='contained'
              color='secondary'
              onClick={() => supabase.auth.signOut()}
            >
              Sign Out
            </Button>
          </ButtonHolder>
        ) : (
          <ButtonHolder>
            <IconButton edge='start' color='inherit' aria-label='menu'>
              <MenuIcon />
            </IconButton>
          </ButtonHolder>
        )}
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
