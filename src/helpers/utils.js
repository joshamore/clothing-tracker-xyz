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
