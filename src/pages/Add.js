import React, { useState } from 'react';
import { useSession } from '../helpers/hooks';
import { Redirect } from 'react-router-dom';
import { supabase } from '../helpers/supabaseClient';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import CoreLayout from '../components/CoreLayout';
import Spinner from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

import { clothingTypes, clothingConditionType } from '../helpers/constants';

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

const StyledNumberInput = styled.input`
  width: 100%;
  margin: 8px;
  padding: 8px;
  border-radius: 8px;
`;

const StyledTextInput = styled.input`
  border-radius: 8px;
  margin: 0 8px;
  padding: 8px;
  width: 100%;
`;

const AddClothingButton = styled(Button)`
  margin-top: 8px;
`;

const Add = () => {
  const [formInput, setFormInput] = useState({
    clothingType: '',
    clothingCondition: '',
    clothingName: '',
    purchasePrice: null,
  });

  // Get user session if it exists
  const session = useSession();

  // Render spinner while session is loading
  if (session.loading) return <Spinner />;
  // Redirect to home if no session
  if (!session.loading && !session.data) return <Redirect to='/' />;

  // Form input handler
  const handleChange = (event) => {
    setFormInput({
      ...formInput,
      ...{ [event.target.name]: event.target.value },
    });
  };

  const handleSubmit = async () => {
    const { clothingType, clothingCondition, clothingName, purchasePrice } =
      formInput;

    const userId = session?.data?.user?.id;
    const clothingTypeId = clothingTypes.find(
      (el) => el.name === clothingType
    )?.id;

    try {
      const { data, error } = await supabase
        .from('clothing_item')
        .insert({
          user_id: userId,
          name: clothingName,
          clothing_type: clothingTypeId,
          purchase_condition: clothingCondition,
          purchase_price: purchasePrice,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      } else if (data) {
        const recordName = data?.name;
        toast.success(
          recordName ? `Added ${recordName} 🤑` : 'Added new clothing item 🤑'
        );

        // Clearing form input
        setFormInput({
          clothingType: '',
          clothingCondition: '',
          clothingName: '',
          purchasePrice: null,
        });
      }
    } catch (error) {
      console.error(error.message);
      toast.error('Unable to add clothing item 😞');
    }
  };

  return (
    <CoreLayout isLoggedIn={!!session.data}>
      <CoreContainer>
        <InputContainer elevation={1}>
          <h2>Add new clothing item</h2>

          <form>
            <StyledSelect
              name='clothingType'
              id='clothing-type-selector'
              onChange={handleChange}
              value={formInput.clothingType}
            >
              <option value='' disabled>
                Clothing Type
              </option>
              {clothingTypes.map((type) => (
                <option key={type.name} value={type.name}>
                  {type.name}
                </option>
              ))}
            </StyledSelect>
            <StyledSelect
              name='clothingCondition'
              id='clothing-condition-selector'
              onChange={handleChange}
              value={formInput.clothingCondition}
            >
              <option value='' disabled>
                Condition
              </option>
              {clothingConditionType.map((type) => (
                <option
                  key={type.name}
                  value={type.name}
                >{`${type.name} ${type.emoji}`}</option>
              ))}
            </StyledSelect>

            <StyledNumberInput
              type='number'
              name='purchasePrice'
              placeholder='Purchase Price'
              value={formInput.purchasePrice}
              onChange={handleChange}
            />

            <StyledTextInput
              type='text'
              name='clothingName'
              value={formInput.clothingName}
              onChange={handleChange}
              placeholder='Clothing Item Name'
            />
            <AddClothingButton
              color='primary'
              variant='contained'
              onClick={handleSubmit}
            >
              Add
            </AddClothingButton>
          </form>
        </InputContainer>
      </CoreContainer>
    </CoreLayout>
  );
};

export default Add;
