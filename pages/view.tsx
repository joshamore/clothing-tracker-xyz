import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { useSession } from "../src/helpers/hooks";
import { supabase } from "../src/helpers/supabaseClient";
import { ClothingItemType } from "../src/helpers/types";

import Spinner from "../src/components/LoadingSpinner";
import CoreLayout from "../src/components/CoreLayout";
import ClothingTable from "../src/components/ClothingTable";

interface ClothingItemsState {
	loading: boolean;
	data: ClothingItemType[];
}

const View = () => {
	const session = useSession();
	const router = useRouter();

	const [clothingItems, setClothingItems] = useState<ClothingItemsState>({
		loading: true,
		data: [],
	});

	/**
	 * Fetch the user's clothing items from the database
	 */
	const getClothingItems = async () => {
		const clothingItemResponse = await supabase
			.from("clothing_item")
			.select("*")
			.order("created_datetime", { ascending: false });

		const data: Array<ClothingItemType> | null = clothingItemResponse?.data;
		const error: any | null = clothingItemResponse?.error;

		if (error) {
			setClothingItems({
				loading: false,
				data: [],
			});
			console.error(error);
			toast.error("Unable to get clothing items 😢");
		} else if (data) {
			setClothingItems({
				loading: false,
				data,
			});
		}
	};

	// Fetch clothing items on pageload
	useEffect(() => {
		if (session.data) {
			getClothingItems();
		}
	}, [session]);

	// Render spinner while session is loading
	if (session.loading) return <Spinner hasCoreLayout />;

	// Redirect to home if no session present
	if (!session.loading && !session.data) {
		router.push("/");
		return;
	}

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
