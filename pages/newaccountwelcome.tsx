import { useEffect } from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";
import Confetti from "react-confetti";

import { isBrowser } from "../src/helpers/utils";

import Typography from "@mui/material/Typography";

import CoreLayout from "../src/components/CoreLayout";

const CoreContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`;

const HeadingContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: center;
	margin-top: 16px;
	max-width: 320px;
`;

const Emoji = styled.span`
	display: flex;
	margin-top: 16px;
	font-size: 3rem;
`;

const NewAccountWelcome = () => {
	const router = useRouter();

	const isBrowserEnv = isBrowser();

	useEffect(() => {
		// Redirecting user to home page after 15 seconds.
		const redirectTimeout = setTimeout(() => {
			router.push("/");
		}, 15000);

		// Cleanup to remove timeout on unmount
		return () => {
			clearTimeout(redirectTimeout);
		};
	}, []);

	return (
		<>
			{isBrowserEnv && (
				<Confetti
					width={window.innerWidth || 300}
					height={window.innerHeight || 300}
					numberOfPieces={100}
					recycle={false}
				/>
			)}
			<CoreLayout isLoggedIn={false}>
				<CoreContainer>
					<HeadingContainer>
						<Typography variant="h3" component="h1" align="center" gutterBottom>
							New account created!
						</Typography>
						<Typography>Check your email to verify your account 🔥</Typography>

						<Emoji>🥳</Emoji>
					</HeadingContainer>
				</CoreContainer>
			</CoreLayout>
		</>
	);
};

export default NewAccountWelcome;
