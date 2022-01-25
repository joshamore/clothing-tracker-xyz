import React, { useState, useEffect } from "react";
import { useSession } from "../../src/helpers/hooks";
import { useRouter } from "next/router";
import { supabase } from "../../src/helpers/supabaseClient";
import styled from "styled-components";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import CoreLayout from "../../src/components/CoreLayout";
import Spinner from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import ClothingItemHistory from "../../src/components/ClothingItemHistory";
import { ClothingItemType } from "../../src/helpers/types";
import AddWearDialog from "../../src/components/AddWearDialog";
import { getClothingTypeNameFromId } from "../../src/helpers/utils";

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

const ButtonContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-top: 16px;
`;

interface ClothingItemState {
	loading: boolean;
	data: ClothingItemType | null;
}

const Item = () => {
	const session = useSession();

	const router = useRouter();
	const id = router.query.id as string;

	const [openAddWearDialog, setOpenAddWearDialog] = useState(false);
	const [clothingItem, setClothingItem] = useState<ClothingItemState>({
		loading: true,
		data: null,
	});

	// Fetch clothing item on pageload
	useEffect(() => {
		const getClothingItem = async () => {
			let { data, error } = await supabase
				.from("clothing_item")
				.select("*")
				.match({ id })
				.single();

			if (error) {
				setClothingItem({
					loading: false,
					data: null,
				});
				console.log(error);
				toast.error("Unable to get clothing item 😢");
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

	// Render spinner while session is loading
	if (session.loading) return <Spinner />;

	// Redirect to home if no session
	if (!session.loading && !session.data) {
		router.push("/");
		return;
	}
	// Redirect to view if no clothing item
	if (!clothingItem.loading && !clothingItem.data) {
		router.push("/view");
		return;
	}

	return (
		<CoreLayout isLoggedIn={!!session.data}>
			{clothingItem.loading ? (
				<Spinner />
			) : (
				<CoreContainer>
					<AddWearDialog
						open={openAddWearDialog}
						setOpen={setOpenAddWearDialog}
						clothingItem={clothingItem.data}
					/>
					<ItemCard>
						<h2>{clothingItem?.data?.name}</h2>
						<p>Nickname: {clothingItem?.data?.nickname}</p>
						<p>
							Purchase Date:
							{` ${dayjs(clothingItem?.data?.purchase_date).format(
								"DD/MM/YYYY"
							)}`}
						</p>
						<p>
							{`Purchase Condition: ${clothingItem?.data?.purchase_condition.toUpperCase()}`}
						</p>
						<p>{`Purchase Price: $${clothingItem?.data?.purchase_price}`}</p>
						<p>
							{`Clothing Type: ${getClothingTypeNameFromId(
								clothingItem?.data?.clothing_type ?? null
							)}`}
						</p>
					</ItemCard>

					<ButtonContainer>
						<Button
							variant="contained"
							color="primary"
							onClick={() => setOpenAddWearDialog(true)}
						>
							Add Wear
						</Button>
					</ButtonContainer>

					<ClothingItemHistory
						id={id}
						purchasePrice={clothingItem?.data?.purchase_price ?? 0}
					/>
				</CoreContainer>
			)}
		</CoreLayout>
	);
};

export default Item;
