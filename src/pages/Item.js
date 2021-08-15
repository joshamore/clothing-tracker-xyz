import React, { useState, useEffect } from 'react';
import { useSession } from '../helpers/hooks';
import { useParams, Redirect } from 'react-router-dom';
import { supabase } from '../helpers/supabaseClient';
import styled from 'styled-components';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import CoreLayout from '../components/CoreLayout';
import Spinner from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';
import { getClothingTypeNameFromId } from '../helpers/utils';

const CoreContainer = styled.div`
  width: 100%;
  margin-top: 16px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
const ItemCard = styled(Paper)`
  margin: 8px;
  padding: 8px;
  max-width: 370px;
  h2 {
    margin: 0;
  }
`;

const Item = () => {
  const session = useSession();
  const { id } = useParams();
  const [clothingItem, setClothingItem] = useState({
    loading: true,
    data: null,
  });

  // Fetch clothing items on pageload
  useEffect(() => {
    const getClothingItem = async () => {
      let { data, error } = await supabase
        .from('clothing_item')
        .select('*')
        .match({ id })
        .single();

      if (error) {
        setClothingItem({
          loading: false,
          data: null,
        });
        console.log(error);
        toast.error('Unable to get clothing item 😢');
      } else if (data) {
        setClothingItem({
          loading: false,
          data,
        });
      }
    };

    if (session.data && id) {
      getClothingItem();
    }
  }, [session, id]);

  console.log(clothingItem);

  // Render spinner while session is loading
  if (session.loading) return <Spinner />;
  // Redirect to home if no session
  if (!session.loading && !session.data) return <Redirect to='/' />;
  // Redirect to view if no clothing item
  if (!clothingItem.loading && !clothingItem.data)
    return <Redirect to='/view' />;

  return (
    <CoreLayout isLoggedIn={!!session.data}>
      {clothingItem.loading ? (
        <Spinner />
      ) : (
        <CoreContainer>
          <ItemCard>
            <h2>{clothingItem.data.name}</h2>
            <p>
              Purchase Date:
              {` ${dayjs(clothingItem.data.purchase_date).format(
                'DD/MM/YYYY'
              )}`}
            </p>
            <p>
              Purchase Condition:{' '}
              {` ${clothingItem.data.purchase_condition.toUpperCase()}`}
            </p>
            <p>Purchase Price: {`$${clothingItem.data.purchase_price}`}</p>
            <p>
              Clothing Type:
              {` ${getClothingTypeNameFromId(clothingItem.data.clothing_type)}`}
            </p>
          </ItemCard>
        </CoreContainer>
      )}
    </CoreLayout>
  );
};

export default Item;
