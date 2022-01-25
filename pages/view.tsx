import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSession } from "../src/helpers/hooks";
import { supabase } from "../src/helpers/supabaseClient";
import { toast } from "react-toastify";
import CoreLayout from "../src/components/CoreLayout";
import Spinner from "@material-ui/core/CircularProgress";
import ClothingTable from "../src/components/ClothingTable";
import { ClothingItemType } from "../src/helpers/types";

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

	// Fetch clothing items on pageload
	useEffect(() => {
		if (session.data) {
			getClothingItems();
		}
	}, [session]);

	const getClothingItems = async () => {
		const clothingItemResponse = await supabase
			.from("clothing_item")
			.select("*");

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

	// Render spinner while session is loading
	if (session.loading) return <Spinner />;

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
