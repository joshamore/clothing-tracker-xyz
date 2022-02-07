import dayjs from "dayjs";
import { clothingTypes } from "../helpers/constants";
import { ClothingItemHistoryType } from "./types";

/**
 * Returns the name of a clothingType when passed a clothingType id.
 *
 * If no valid clothingType id is passed, returns '';
 *
 * @param {number} id - The id of the clothingType.
 * @returns {string} - The name of the clothingType.
 * */
export const getClothingTypeNameFromId = (clothingTypeId: number | null) => {
	if (!clothingTypeId) return "";

	const clothingTypeName = clothingTypes.find(
		(type) => type.id === clothingTypeId
	)?.name;

	if (clothingTypeName) {
		return clothingTypeName;
	} else {
		return "";
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
export const getCostPerWear = (
	purchasePrice: number,
	clothingItemHistory: Array<ClothingItemHistoryType>
) => {
	const wearCount = clothingItemHistory.length;

	if (wearCount === 0) return 0.0;

	const costPerWear =
		wearCount === 0 ? purchasePrice : purchasePrice / wearCount;

	// Rounds cost to 2 decimal places
	return Math.round(costPerWear * 100) / 100;
};

/**
 * Converts a JavaScript date to the format used by the API.
 * */
export const convertDateToApiFormat = (date: string) => {
	return dayjs(date).format("YYYY-MM-DD");
};

/**
 * Confirms if two provided password strings match.
 *
 * Has an optional validation callback (used to set validation state).
 *
 * @param {string} password - The password to validate.
 * @param {string} confirmPassword - The password to validate against.
 * @param {Function} validationCallback - Optional callback to validate the password.
 */
export const validatePasswordMatch = (
	password: string,
	confirmPassword: string,
	validationCallback: Function | null = null
) => {
	if (password !== confirmPassword) {
		if (validationCallback) validationCallback("Passwords do not match.");
		return false;
	}
	return true;
};

/**
 * Checks if the component is being loaded in a browser.
 */
export const isBrowser = () => typeof window !== "undefined";

/**
 * Converts the first character in a string to uppercase if the string
 * contains 1 or more characters.
 *
 * @param {string} str - The string to convert.
 *
 * @return {string} - The converted string.
 */
export const capitalizeFirstLetter = (str: string) => {
	if (str.length > 0) {
		return str.charAt(0).toUpperCase() + str.slice(1);
	}

	return str;
};
