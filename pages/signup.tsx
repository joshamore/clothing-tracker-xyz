import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { supabase } from "../src/helpers/supabaseClient";
import { SupabaseError as ApiError } from "../src/helpers/types";
import { validatePasswordMatch } from "../src/helpers/utils";

import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import CoreLayout from "../src/components/CoreLayout";
import {
	CoreContainer,
	SignupCard,
	SubheaderText,
	SignupInputContainer,
	SingupInput,
	ValidationErrorText,
} from "../src/styles/signup.styles";

const Signup = () => {
	const [loading, setLoading] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [validationError, setValidationError] = useState<string | null>(null);

	// Clearing out the validation error if one of the password fields are altered.
	useEffect(() => {
		if (validationError) {
			setValidationError(null);
		}
	}, [password, confirmPassword]);

	const handleSignup = async () => {
		setLoading(true);
		setValidationError(null);

		// Validating password input
		const validatePassword = validatePasswordMatch(
			password,
			confirmPassword,
			setValidationError
		);

		// Return early if password is invalid (inline error set in callback).
		if (!validatePassword) {
			setLoading(false);
			return;
		}

		try {
			const signUpResponse = await supabase.auth.signUp({ email, password });
			const error: ApiError | null = signUpResponse?.error ?? null;

			// Throwing error to catch block for handling.
			if (error) throw error;

			// Creating success toast.
			toast.info("Check your email for your confirmation link!");
		} catch (error: any) {
			toast.error(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<CoreLayout isLoggedIn={false}>
			<CoreContainer>
				<SignupCard>
					<Typography variant="h5" component="h1" align="center">
						Sign Up
					</Typography>
					<SubheaderText align="center">
						Create a new account and start adding your wardrobe!
					</SubheaderText>

					<SignupInputContainer>
						<SingupInput
							id="signup-email-input"
							fullWidth
							size="small"
							variant="outlined"
							label={email ? "" : "Email"}
							InputLabelProps={{ shrink: false }}
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>

						<SingupInput
							id="signup-password-input"
							fullWidth
							size="small"
							variant="outlined"
							type="password"
							label={password ? "" : "Password"}
							InputLabelProps={{ shrink: false }}
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>

						<SingupInput
							id="signup-confirm-password-input"
							fullWidth
							size="small"
							variant="outlined"
							type="password"
							label={confirmPassword ? "" : "Confirm Password"}
							InputLabelProps={{ shrink: false }}
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						/>
					</SignupInputContainer>

					{validationError && (
						<ValidationErrorText variant="caption" align="center">
							{validationError}
						</ValidationErrorText>
					)}

					<Button
						variant="contained"
						disabled={loading}
						onClick={(e) => {
							e.preventDefault();
							handleSignup();
						}}
					>
						{loading ? <span>Loading...</span> : <span>Create account</span>}
					</Button>
				</SignupCard>
			</CoreContainer>
		</CoreLayout>
	);
};

export default Signup;
