import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { supabase } from "../../src/helpers/supabaseClient";

import LinearProgress from "@mui/material/LinearProgress";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface RetireItemDialogProps {
	open: boolean;
	handleClose: () => void;
	clothingItemName: string;
	clothingItemId: string;
}

const RetireItemDialog = (props: RetireItemDialogProps) => {
	const router = useRouter();

	const [isProcessingRetire, setIsProcessingRetire] = useState(false);

	const { open, handleClose, clothingItemName, clothingItemId } = props;

	// Return empty element if not open.
	if (!open) return <></>;

	/**
	 * Handler to retire a clothing item.
	 *
	 * Redirects user back to /view on success.
	 */
	const handleRetireClose = async () => {
		setIsProcessingRetire(true);

		const { data, error } = await supabase
			.from("clothing_item")
			.update({ is_retired: true })
			.match({ id: clothingItemId })
			.single();

		if (data?.is_retired) {
			toast.success(`${clothingItemName} retired successfully 🎉`);
			router.push("/view");
		}

		if (error) {
			console.error(error.message);
			toast.error(`Unable to retire ${clothingItemName} 😢`);
		}

		handleClose();
	};

	return (
		<div>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="retire-item-dialog-title"
				aria-describedby="retire-item-dialog-description"
			>
				{isProcessingRetire && <LinearProgress />}

				<DialogTitle id="retire-item-dialog-title">
					{`Are you sure it's time to retire ${clothingItemName}?`}
				</DialogTitle>
				<DialogContent>
					<DialogContentText id="retire-item-dialog-description">
						Retiring a clothing item means it&apos;s going to the great wardrobe
						in the sky (e.g recycled, discarded, etc). You will not be able to
						add future wear records.
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="primary" variant="contained">
						No, keep it
					</Button>
					<Button onClick={handleRetireClose} color="error" variant="contained">
						Yes, retire
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
};

export default RetireItemDialog;
