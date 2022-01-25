import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { toast } from "react-toastify";

import { supabase } from "../helpers/supabaseClient";
import { getCostPerWear } from "../helpers/utils";
import Spinner from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";

import { ClothingItemHistoryType } from "../helpers/types";

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

interface ClothingItemHistoryProps {
	id: string;
	purchasePrice: number;
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
}: ClothingItemHistoryProps) => {
	const [clothingItemHistory, setClothingItemHistory] =
		useState<ClothingItemHistoryState>({
			loading: true,
			data: [],
		});

	// Fetch clothing item history on pageload
	useEffect(() => {
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

		getClothingItemHistory();
	}, [id]);

	return (
		<CoreContainer>
			{clothingItemHistory.loading ? (
				<Spinner />
			) : (
				<ItemCard>
					<p>Wear Count: {clothingItemHistory.data.length}</p>
					<p>
						{`Cost Per Wear: $${getCostPerWear(
							purchasePrice,
							clothingItemHistory.data
						)}`}
					</p>
				</ItemCard>
			)}
		</CoreContainer>
	);
};

export default ClothingItemHistory;
