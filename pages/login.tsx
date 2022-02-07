import { useState } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";
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
	margin: 0 8px 8px;
`;

const PasswordButton = styled(Button)`
	margin: 0 0 8px 0;
`;

const LoginInputContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	width: 100%;
	margin-bottom: 8px;
`;

const LoginInput = styled(TextField)`
	width: 100%;
	margin: 0 8px;
`;

const PasswordInput = styled(LoginInput)`
	margin-top: 8px;
`;

const Login = () => {
	const router = useRouter();

	const [loading, setLoading] = useState<boolean>(false);
	const [loginWithPassword, setLoginWithPassword] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleLogin = async () => {
		try {
			setLoading(true);

			let signInResponse;
			let error: ApiError | null = null;

			if (loginWithPassword) {
				// Handles login with password
				signInResponse = await supabase.auth.signIn({ email, password });

				// If login failed, throwing to catch
				if (error) throw error;

				// If login was successful, redirect to home
				if (signInResponse?.session?.access_token) router.push("/");
			} else {
				// Handles login via magic link
				signInResponse = await supabase.auth.signIn({ email });
				error = signInResponse?.error ?? null;

				// If magic link failed, throwing to catch
				if (error) throw error;

				// Creating success toast.
				toast.info("Check your email for the login link!");
			}
		} catch (error: any) {
			toast.error(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	const subheaderText = loginWithPassword
		? "Log in with your email address and password below."
		: "Log in via a magic link sent to your email address below.";
	const loginMethodText = loginWithPassword
		? "Use Magic Link instead?"
		: "Use Password instead?";
	const loginButtonText = loginWithPassword ? "Login" : "Send magic link";

	return (
		<CoreLayout isLoggedIn={false}>
			<CoreContainer>
				<LoginCard>
					<Typography variant="h5" component="h1" align="center">
						Log In (Existing user)
					</Typography>
					<SubheaderText align="center">{subheaderText}</SubheaderText>

					<PasswordButton
						onClick={() => setLoginWithPassword(!loginWithPassword)}
					>
						{loginMethodText}
					</PasswordButton>

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

						{loginWithPassword && (
							<PasswordInput
								id="login-password-input"
								fullWidth
								variant="outlined"
								type="password"
								label={password ? "" : "Password"}
								InputLabelProps={{ shrink: false }}
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
						)}
					</LoginInputContainer>

					<Button
						variant="contained"
						disabled={loading}
						onClick={(e) => {
							e.preventDefault();
							handleLogin();
						}}
					>
						{loading ? <span>Loading...</span> : <span>{loginButtonText}</span>}
					</Button>
				</LoginCard>
			</CoreContainer>
		</CoreLayout>
	);
};

export default Login;
