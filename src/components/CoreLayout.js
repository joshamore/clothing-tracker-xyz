import React from 'react';
import PropTypes from 'prop-types';
import Navbar from '../components/Navbar';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

/**
 * The core layout wrapper component for most pages
 * */
const CoreLayout = ({ isLoggedIn, children }) => (
  <>
    <Navbar isLoggedIn={isLoggedIn} />
    {children}

    <ToastContainer position='bottom-right' />
  </>
);

CoreLayout.propTypes = {
  isLoggedIn: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

CoreLayout.defaultProps = {
  isLoggedIn: false,
};

export default CoreLayout;
