import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { toast } from "react-toastify";

import { supabase } from "../helpers/supabaseClient";
import { getCostPerWear } from "../helpers/utils";
import { ClothingItemHistoryType } from "../helpers/types";

import Spinner from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

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
`;

const ItemCardText = styled(Typography)`
	margin: 8px 0;
`;

interface ClothingItemHistoryProps {
	id: string;
	purchasePrice: number;
	shouldRefetchItemHistory: boolean;
	confirmRefetch: () => void;
}

interface ClothingItemHistoryState {
	loading: boolean;
	data: ClothingItemHistoryType[];
}

/**
 * Renders a card containing the history of a specified clothing item
 *
 * @param {string} id - The id of the clothing item.
 * @param {number} purchasePrice - The original purchase price.
 * */
const ClothingItemHistory = ({
	id,
	purchasePrice,
	shouldRefetchItemHistory,
	confirmRefetch,
}: ClothingItemHistoryProps) => {
	const [clothingItemHistory, setClothingItemHistory] =
		useState<ClothingItemHistoryState>({
			loading: true,
			data: [],
		});

	/**
	 * Fetches the history of a specified clothing item.
	 */
	const getClothingItemHistory = async () => {
		const response = await supabase
			.from("clothing_track")
			.select("*")
			.match({ clothing_item: id });

		const data: Array<ClothingItemHistoryType> | null = response?.data ?? [];
		const error: any | null = response?.error;

		if (error) {
			setClothingItemHistory({
				loading: false,
				data: [],
			});
			console.log(error);
			toast.error("Unable to get clothing items 😢");
		} else if (data) {
			setClothingItemHistory({
				loading: false,
				data,
			});
		}
	};

	// Fetch clothing item history on pageload
	useEffect(() => {
		getClothingItemHistory();
	}, [id, getClothingItemHistory]);

	// Triggering refetch on shouldRefetchItemHistory
	useEffect(() => {
		if (shouldRefetchItemHistory) {
			getClothingItemHistory().then(() => confirmRefetch());
		}
	}, [shouldRefetchItemHistory, confirmRefetch]);

	// Return spinner if data loading
	if (clothingItemHistory.loading) return <Spinner />;

	const wearCount = clothingItemHistory?.data?.length ?? 0;
	const costPerWear = getCostPerWear(purchasePrice, clothingItemHistory.data);

	return (
		<CoreContainer>
			<ItemCard>
				<ItemCardText>Wear Count: {wearCount}</ItemCardText>
				<ItemCardText>{`Cost Per Wear: $${costPerWear}`}</ItemCardText>
			</ItemCard>
		</CoreContainer>
	);
};

export default ClothingItemHistory;
