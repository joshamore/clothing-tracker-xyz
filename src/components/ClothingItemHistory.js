import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { supabase } from '../helpers/supabaseClient';
import { getCostPerWear } from '../helpers/utils';
import styled from 'styled-components';
import { toast } from 'react-toastify';
import Spinner from '@material-ui/core/CircularProgress';
import Paper from '@material-ui/core/Paper';

const CoreContainer = styled.div`
  width: 100%;
  margin-top: 8px;
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

/**
 * Renders a card containing the history of a specified clothing item
 *
 * @param {string} id - The id of the clothing item.
 * @param {number} purchasePrice - The original purchase price.
 * */
const ClothingItemHistory = ({ id, purchasePrice }) => {
  const [clothingItemHistory, setClothingItemHistory] = useState({
    loading: true,
    data: [],
  });

  // Fetch clothing item history on pageload
  useEffect(() => {
    const getClothingItemHistory = async () => {
      let { data, error } = await supabase
        .from('clothing_track')
        .select('*')
        .match({ clothing_item: id });

      if (error) {
        setClothingItemHistory({
          loading: false,
          data: [],
        });
        console.log(error);
        toast.error('Unable to get clothing items 😢');
      } else if (data) {
        setClothingItemHistory({
          loading: false,
          data,
        });
      }
    };

    getClothingItemHistory();
  }, [id]);

  console.log(clothingItemHistory);

  return (
    <CoreContainer>
      {clothingItemHistory.loading ? (
        <Spinner />
      ) : (
        <ItemCard>
          <p>Wear Count: {clothingItemHistory.data.length}</p>
          <p>
            Cost Per Wear:
            {` $${getCostPerWear(purchasePrice, clothingItemHistory.data)}`}
          </p>
        </ItemCard>
      )}
    </CoreContainer>
  );
};

ClothingItemHistory.propTypes = {
  id: PropTypes.string.isRequired,
  purchasePrice: PropTypes.number,
};

ClothingItemHistory.defaultProps = {
  purchasePrice: 0,
};

export default ClothingItemHistory;
