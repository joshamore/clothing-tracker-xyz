import React from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';

const CoreContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const InputContainer = styled(Paper)`
  margin-top: 16px;
  width: 300px;
  border-radius: 16px;
`;

const App = () => {
  return (
    <>
      <Navbar />
      <CoreContainer>
        <InputContainer elevation={1}>
          <p>HELP</p>
        </InputContainer>
      </CoreContainer>
    </>
  );
};

export default App;
