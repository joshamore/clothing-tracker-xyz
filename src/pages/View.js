import React, { useState, useEffect } from 'react';
import { useSession } from '../helpers/hooks';
import { Redirect } from 'react-router-dom';
import { supabase } from '../helpers/supabaseClient';
import { toast } from 'react-toastify';
import CoreLayout from '../components/CoreLayout';
import Spinner from '@material-ui/core/CircularProgress';
import ClothingTable from '../components/ClothingTable';

const View = () => {
  const session = useSession();
  const [clothingItems, setClothingItems] = useState({
    loading: true,
    data: [],
  });

  // Fetch clothing items on pageload
  useEffect(() => {
    if (session.data) {
      getClothingItems();
    }
  }, [session]);

  // Render spinner while session is loading
  if (session.loading) return <Spinner />;
  // Redirect to home if no session
  if (!session.loading && !session.data) return <Redirect to='/' />;

  const getClothingItems = async () => {
    let { data, error } = await supabase.from('clothing_item').select('*');

    if (error) {
      setClothingItems({
        loading: false,
        data: [],
      });
      console.log(error);
      toast.error('Unable to get clothing items 😢');
    } else if (data) {
      setClothingItems({
        loading: false,
        data,
      });
    }
  };

  console.log(clothingItems);

  // Render spinner while session is loading
  if (session.loading) return <Spinner />;
  // Redirect to home if no session
  if (!session.loading && !session.data) return <Redirect to='/' />;

  return (
    <CoreLayout isLoggedIn={!!session.data}>
      {clothingItems.loading ? (
        <Spinner />
      ) : (
        <ClothingTable clothingItems={clothingItems.data} />
      )}
    </CoreLayout>
  );
};

export default View;
