import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

interface TestAccountLoginModalProps {
	open: boolean;
	handleClose: () => void;
	handleTestLogin: () => void;
}

const TestAccountLoginModal = ({
	open,
	handleClose,
	handleTestLogin,
}: TestAccountLoginModalProps) => {
	const handleCloseAndLogin = () => {
		handleClose();
		handleTestLogin();
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="test-account-login-modal-title"
			aria-describedby="test-account-login-modal-description"
		>
			<DialogTitle id="test-account-login-modal-title">
				Log in with test account?
			</DialogTitle>
			<DialogContent>
				<DialogContentText id="test-account-login-modal-description">
					This is a public test account. The data entered here will be deleted
					automatically on a weekly cycle (and is publicly accessible). Are you
					sure you would like to proceed with the test account?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose}>No thanks</Button>
				<Button onClick={handleCloseAndLogin}>Yes, use test account</Button>
			</DialogActions>
		</Dialog>
	);
};

export default TestAccountLoginModal;
