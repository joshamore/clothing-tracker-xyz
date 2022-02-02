import Link from "next/link";
import styled from "@emotion/styled";

import { useSession } from "../src/helpers/hooks";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

import Spinner from "../src/components/LoadingSpinner";
import CoreLayout from "../src/components/CoreLayout";

const CoreContainer = styled(Container)`
	display: flex;
	justify-content: center;
`;

const HomeLinkCard = styled(Paper)`
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

const Home = () => {
	const session = useSession();

	// Render spinner while session is loading
	if (session.loading) return <Spinner />;

	const subheaderText = !session.data
		? "Login or create a new account to track your clothing items!"
		: "Welcome back!";

	return (
		<CoreLayout isLoggedIn={!!session.data}>
			<CoreContainer>
				<HomeLinkCard>
					<Typography variant="h5" component="h1" align="center">
						Clothing Tracker
					</Typography>

					<SubheaderText align="center">{subheaderText}</SubheaderText>

					{!session.data ? (
						<Stack spacing={1}>
							<Link href="/login" passHref>
								<Button variant="contained">Log In</Button>
							</Link>
							<Link href="/signup" passHref>
								<Button variant="contained">Signup</Button>
							</Link>
						</Stack>
					) : (
						<Stack spacing={1}>
							<Link href="/add" passHref>
								<Button variant="contained">Add page</Button>
							</Link>
							<Link href="/view" passHref>
								<Button variant="contained">View page</Button>
							</Link>
						</Stack>
					)}
				</HomeLinkCard>
			</CoreContainer>
		</CoreLayout>
	);
};

export default Home;
