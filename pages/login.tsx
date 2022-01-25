import { useState } from "react";
import { supabase } from "../src/helpers/supabaseClient";
import { SupabaseError as ApiError } from "../src/helpers/types";
import { toast } from "react-toastify";
import CoreLayout from "../src/components/CoreLayout";

const Login = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [email, setEmail] = useState<string>("");

	const handleLogin = async (email: string) => {
		try {
			setLoading(true);
			const signInResponse = await supabase.auth.signIn({ email });
			const error: ApiError | null = signInResponse?.error ?? null;
			if (error) throw error;
			toast.info("Check your email for the login link!");
		} catch (error: any) {
			toast.error(error.error_description || error.message);
		} finally {
			setLoading(false);
		}
	};

	return (
		<CoreLayout isLoggedIn={false}>
			<h1>Log In (Existing user)</h1>
			<p>Log in via magic link with your email below</p>
			<div>
				<input
					type="email"
					placeholder="Your email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>
			<div>
				<button
					onClick={(e) => {
						e.preventDefault();
						handleLogin(email);
					}}
					disabled={loading}
				>
					{loading ? <span>Loading</span> : <span>Send magic link</span>}
				</button>
			</div>
		</CoreLayout>
	);
};

export default Login;
