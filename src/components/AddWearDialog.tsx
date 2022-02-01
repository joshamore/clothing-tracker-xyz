import React, { useState } from "react";
import styled from "@emotion/styled";
import { toast } from "react-toastify";

import { ClothingItemType } from "../../src/helpers/types";
import { supabase } from "../helpers/supabaseClient";
import { convertDateToApiFormat } from "../helpers/utils";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const ContentContaier = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

interface AddWearDialogProps {
	open: boolean;
	setOpen: (open: boolean) => void;
	clothingItem: ClothingItemType | null;
	confirmRefetchRequired: () => void;
}

const AddWearDialog = ({
	open,
	setOpen,
	clothingItem,
	confirmRefetchRequired,
}: AddWearDialogProps) => {
	const [wearDate, setWearDate] = useState(Date.now());

	// Return empty if no clothing item is provided
	if (!clothingItem) return <></>;

	const { name, id: clothingItemId, user_id: userId } = clothingItem;

	const handleClose = () => {
		setOpen(false);
	};

	const handleAddClick = async () => {
		try {
			const { data, error } = await supabase
				.from("clothing_track")
				.insert({
					user_id: userId,
					clothing_item: clothingItemId,
					track_datetime: convertDateToApiFormat(wearDate.toString()),
				})
				.single();

			if (error) {
				throw new Error(error.message);
			} else if (data) {
				toast.success("Added wear 🦾");

				// Clearing date input
				setWearDate(Date.now());

				// Refetching item history
				confirmRefetchRequired();
			}
		} catch (error: any) {
			console.error(error.message);
			toast.error("Unable to add wear record 😞");
		} finally {
			handleClose();
		}
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<ContentContaier>
				<DialogTitle id="form-dialog-title">Add Wear to {name}</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Have you worn this clothing item? Add a track record by clicking{" "}
						<strong>Add Wear</strong> below.
					</DialogContentText>
				</DialogContent>

				<DialogActions>
					<Button onClick={handleClose} color="secondary" variant="contained">
						Cancel
					</Button>
					<Button onClick={handleAddClick} color="primary" variant="contained">
						Add Wear
					</Button>
				</DialogActions>
			</ContentContaier>
		</Dialog>
	);
};

export default AddWearDialog;
