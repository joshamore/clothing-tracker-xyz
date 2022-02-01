import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import dayjs from "dayjs";
import { toast } from "react-toastify";

import { supabase } from "../../src/helpers/supabaseClient";
import { useSession } from "../../src/helpers/hooks";
import { getClothingTypeNameFromId } from "../../src/helpers/utils";
import { ClothingItemType } from "../../src/helpers/types";

import Spinner from "@mui/material/CircularProgress";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import CoreLayout from "../../src/components/CoreLayout";
import RetireItemDialog from "../../src/components/RetireItemDialog";
import AddWearDialog from "../../src/components/AddWearDialog";
import ClothingItemHistory from "../../src/components/ClothingItemHistory";

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

const ItemActionButton = styled(Button)`
	&:not(:last-child) {
		margin-right: 8px;
	}
`;

interface ClothingItemState {
	loading: boolean;
	data: ClothingItemType | null;
}

const Item = () => {
	const session = useSession();

	const router = useRouter();
	const id = (router?.query?.id as string) ?? "";

	const [openAddWearDialog, setOpenAddWearDialog] = useState(false);
	const [clothingItem, setClothingItem] = useState<ClothingItemState>({
		loading: true,
		data: null,
	});
	const [shouldRefetchItemHistory, setShouldRefetchItemHistory] =
		useState(false);
	const [isRetireDialogOpen, setIsRetireDialogOpen] = useState(false);

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
				console.error(error);
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
		id: clothingItemId,
		nickname,
		purchase_condition: purchaseCondition,
		purchase_price: purchasePrice,
		clothing_type: clothingType,
	} = clothingItem?.data ?? {
		name: "",
		id: "",
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
					<RetireItemDialog
						open={isRetireDialogOpen}
						handleClose={() => setIsRetireDialogOpen(false)}
						clothingItemName={name}
						clothingItemId={clothingItemId}
					/>

					<AddWearDialog
						open={openAddWearDialog}
						setOpen={setOpenAddWearDialog}
						clothingItem={clothingItem.data}
						confirmRefetchRequired={() => setShouldRefetchItemHistory(true)}
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
						<ItemActionButton
							variant="contained"
							color="primary"
							onClick={() => setOpenAddWearDialog(true)}
						>
							Add Wear
						</ItemActionButton>
						<ItemActionButton
							variant="contained"
							color="error"
							onClick={() => setIsRetireDialogOpen(true)}
						>
							Retire
						</ItemActionButton>
					</ButtonContainer>

					<ClothingItemHistory
						id={id}
						purchasePrice={purchasePrice ?? 0}
						shouldRefetchItemHistory={shouldRefetchItemHistory}
						confirmRefetch={() => setShouldRefetchItemHistory(false)}
					/>
				</CoreContainer>
			)}
		</CoreLayout>
	);
};

export default Item;
