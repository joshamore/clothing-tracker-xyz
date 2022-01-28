import { useState } from "react";
import styled from "@emotion/styled";
import { toast } from "react-toastify";

import { supabase } from "../src/helpers/supabaseClient";
import { SupabaseError as ApiError } from "../src/helpers/types";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import CoreLayout from "../src/components/CoreLayout";

const CoreContainer = styled(Container)`
	display: flex;
	justify-content: center;
`;

const LoginCard = styled(Paper)`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	margin-top: 16px;
	padding: 8px 0;
	width: 300px;
	border-radius: 16px;
	h1 {
		margin: 0 0 8px 0;
		width: 100%;
	}
`;

const SubheaderText = styled(Typography)`
	width: 100%;
	margin: 0 0 8px 0;
`;

const LoginInputContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
	margin-bottom: 8px;
`;

const LoginInput = styled(TextField)`
	margin: 0 8px;
`;

const Login = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");

	const handleLogin = async (email: string) => {
		try {
			setLoading(true);
			const signInResponse = await supabase.auth.signIn({ email });
			const error: ApiError | null = signInResponse?.error ?? null;

			// Throwing error to catch block for handling.
			if (error) throw error;

			// Creating success toast.
			toast.info("Check your email for the login link!");
		} catch (error: any) {
			toast.error(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<CoreLayout isLoggedIn={false}>
			<CoreContainer>
				<LoginCard>
					<Typography variant="h5" component="h1" align="center">
						Log In (Existing user)
					</Typography>
					<SubheaderText align="center">
						Log in via magic link with your email below.
					</SubheaderText>

					<LoginInputContainer>
						<LoginInput
							id="login-email-input"
							fullWidth
							variant="outlined"
							label={email ? "" : "Email"}
							InputLabelProps={{ shrink: false }}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</LoginInputContainer>

					<Button
						variant="contained"
						disabled={loading}
						onClick={(e) => {
							e.preventDefault();
							handleLogin(email);
						}}
					>
						{loading ? <span>Loading...</span> : <span>Send magic link</span>}
					</Button>
				</LoginCard>
			</CoreContainer>
		</CoreLayout>
	);
};

export default Login;
