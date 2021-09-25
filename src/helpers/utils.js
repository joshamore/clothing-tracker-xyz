import dayjs from 'dayjs';
import { clothingTypes } from '../helpers/constants';

/**
 * Returns the name of a clothingType when passed a clothingType id.
 *
 * If no valid clothingType id is passed, returns '';
 *
 * @param {number} id - The id of the clothingType.
 * @returns {string} - The name of the clothingType.
 * */
export const getClothingTypeNameFromId = (clothingTypeId) => {
  const clothingTypeName = clothingTypes.find(
    (type) => type.id === clothingTypeId
  )?.name;

  if (clothingTypeName) {
    return clothingTypeName;
  } else {
    return '';
  }
};

/**
 * Helper function to return cost per wear. Rounds to 2 decimal places.
 *
 * @param {number} purchasePrice - The price of the clothing item.
 * @param {Array} clothingItemHistory - The wear history of the clothing item.
 *
 * @return {number} - The cost per wear.
 * */
export const getCostPerWear = (purchasePrice, clothingItemHistory) => {
  const wearCount = clothingItemHistory.length;
  const costPerWear =
    wearCount === 0 ? purchasePrice : purchasePrice / wearCount;

  // Rounds cost to 2 decimal places
  return Math.round(costPerWear * 100) / 100;
};

/**
 * Converts a JavaScript date to the format used by the API.
 * */
export const convertDateToApiFormat = (date) => {
  return dayjs(date).format('YYYY-MM-DD');
};
