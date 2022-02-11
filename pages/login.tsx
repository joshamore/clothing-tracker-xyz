import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

import { supabase } from "../src/helpers/supabaseClient";
import { SupabaseError as ApiError } from "../src/helpers/types";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import CoreLayout from "../src/components/CoreLayout";
import TestAccountLoginModal from "../src/components/TestAccountLoginModal";
import {
	CoreContainer,
	LoginCard,
	SubheaderText,
	PasswordButton,
	LoginInputContainer,
	LoginInput,
	PasswordInput,
	TestLoginLink,
} from "../src/styles/login.styles";

// Getting test login details
const TEST_EMAIL = process?.env?.NEXT_PUBLIC_TEST_EMAIL ?? "";
const TEST_PASSWORD = process?.env?.NEXT_PUBLIC_TEST_PASSWORD ?? "";

const Login = () => {
	const router = useRouter();

	const [loading, setLoading] = useState<boolean>(false);
	const [loginWithPassword, setLoginWithPassword] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

	/**
	 * Handles login click.
	 */
	const handleLogin = async (
		email: string,
		password: string,
		loginWithPassword: boolean
	) => {
		try {
			setLoading(true);

			let signInResponse;
			let error: ApiError | null = null;

			if (loginWithPassword) {
				// Handles login with password
				signInResponse = await supabase.auth.signIn({ email, password });
				error = signInResponse?.error ?? null;

				// If login failed, throwing to catch
				if (signInResponse.error) throw error;

				// If login was successful, redirect to home
				if (signInResponse?.session?.access_token) {
					router.push("/");
				}
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

	/**
	 * Handles test login click.
	 */
	const handleTestLogin = () => {
		if (TEST_EMAIL && TEST_PASSWORD) {
			setLoginWithPassword(true);
			setEmail(TEST_EMAIL);
			setPassword(TEST_PASSWORD);
			handleLogin(TEST_EMAIL, TEST_PASSWORD, true);
		} else {
			toast.error("Test login unavailable. Sorry about that!");
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
		<>
			<TestAccountLoginModal
				open={isModalOpen}
				handleClose={() => {
					setIsModalOpen(false);
				}}
				handleTestLogin={handleTestLogin}
			/>
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
								handleLogin(email, password, loginWithPassword);
							}}
						>
							{loading ? (
								<span>Loading...</span>
							) : (
								<span>{loginButtonText}</span>
							)}
						</Button>

						<TestLoginLink
							variant="caption"
							onClick={() => {
								setIsModalOpen(true);
							}}
						>
							Use test account?
						</TestLoginLink>
					</LoginCard>
				</CoreContainer>
			</CoreLayout>
		</>
	);
};

export default Login;
