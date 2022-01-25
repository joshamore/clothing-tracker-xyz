import React, { useState, useEffect } from "react";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { supabase } from "../../src/helpers/supabaseClient";
import { useSession } from "../../src/helpers/hooks";
import { getClothingTypeNameFromId } from "../../src/helpers/utils";
import { ClothingItemType } from "../../src/helpers/types";
import CoreLayout from "../../src/components/CoreLayout";
import ClothingItemHistory from "../../src/components/ClothingItemHistory";
import AddWearDialog from "../../src/components/AddWearDialog";
import Spinner from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const CoreContainer = styled.div`
	width: 100%;
	margin-top: 16px;
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
`;

const ItemCard = styled(Paper)`
	margin: 16px;
	padding: 16px;
	max-width: 370px;
`;

const ItemCardText = styled(Typography)`
	margin: 8px 0;
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

	const {
		name,
		nickname,
		purchase_condition: purchaseCondition,
		purchase_price: purchasePrice,
		clothing_type: clothingType,
	} = clothingItem?.data ?? {
		name: "",
		nickname: "",
		purchase_condition: "",
		purchase_price: 0,
		clothing_type: null,
	};

	const purchaseDate = dayjs(clothingItem?.data?.purchase_date).format(
		"DD/MM/YYYY"
	);
	const renderClothingType = getClothingTypeNameFromId(clothingType ?? null);

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
						<Typography variant="h4" component="h2" align="center">
							{name}
						</Typography>
						{nickname && <ItemCardText>{`Nickname: ${nickname}`}</ItemCardText>}
						<ItemCardText>{`Purchase Date: ${purchaseDate}`}</ItemCardText>
						<ItemCardText>{`Purchase Condition: ${purchaseCondition}`}</ItemCardText>
						<ItemCardText>{`Purchase Price: $${purchasePrice}`}</ItemCardText>
						<ItemCardText>{`Clothing Type: ${renderClothingType}`}</ItemCardText>
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

					<ClothingItemHistory id={id} purchasePrice={purchasePrice ?? 0} />
				</CoreContainer>
			)}
		</CoreLayout>
	);
};

export default Item;
