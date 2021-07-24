import React, { useState } from 'react';
import styled from 'styled-components';
import Navbar from './components/Navbar';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { clothingTypes, clothingConditionType } from './helpers/constants';

const CoreContainer = styled(Container)`
  display: flex;
  justify-content: center;
`;

const InputContainer = styled(Paper)`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 16px;
  padding: 8px 0;
  width: 300px;
  border-radius: 16px;
  h2 {
    text-align: center;
    margin: 0 0 8px 0;
    width: 100%;
  }
  form {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
`;

const StyledSelect = styled.select`
  width: 120px;
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
`;

const AddClothingButton = styled(Button)`
  margin-top: 8px;
`;

const App = () => {
  const [formInput, setFormInput] = useState({
    clothingType: null,
    clothingCondition: null,
  });

  // Form input handler
  const handleChange = (event) => {
    setFormInput({
      ...formInput,
      ...{ [event.target.name]: event.target.value },
    });
  };

  return (
    <>
      <Navbar />
      <CoreContainer>
        <InputContainer elevation={1}>
          <h2>Add new clothing item</h2>

          <form>
            <StyledSelect
              name='clothingType'
              id='clothing-type-selector'
              onChange={handleChange}
            >
              <option value='' selected disabled>
                Clothing Type
              </option>
              {clothingTypes.map((type) => (
                <option value={type.name}>{type.name}</option>
              ))}
            </StyledSelect>

            <StyledSelect
              name='clothingCondition'
              id='clothing-condition-selector'
              onChange={handleChange}
            >
              <option value='' selected disabled>
                Condition
              </option>
              {clothingConditionType.map((type) => (
                <option
                  value={type.name}
                >{`${type.name} ${type.emoji}`}</option>
              ))}
            </StyledSelect>

            <AddClothingButton
              color='primary'
              variant='contained'
              onClick={() => console.log(formInput)}
            >
              Add
            </AddClothingButton>
          </form>
        </InputContainer>
      </CoreContainer>
    </>
  );
};

export default App;
