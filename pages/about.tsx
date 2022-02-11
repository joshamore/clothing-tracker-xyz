import React from "react";
import styled from "@emotion/styled";

import { useSession } from "../src/helpers/hooks";

import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GitHubIcon from "@mui/icons-material/GitHub";
import PersonIcon from "@mui/icons-material/Person";

import Spinner from "../src/components/LoadingSpinner";
import CoreLayout from "../src/components/CoreLayout";

const CoreContainer = styled(Container)`
	margin-top: 16px;
	text-align: center;
	h1 {
		margin-bottom: 16px;
	}
	h2 {
		margin: 16px 0;
	}
`;

const HeroText = styled(Typography)`
	font-weight: bold;
`;

const ButtonGroupContainer = styled.div`
	a {
		&:not(:last-child) {
			margin-right: 8px;
		}
	}
`;

const About = () => {
	const session = useSession();

	// Render spinner while session is loading
	if (session.loading) return <Spinner hasCoreLayout />;

	return (
		<CoreLayout isLoggedIn={!!session.data}>
			<CoreContainer maxWidth="sm">
				<Typography variant="h3" component="h1">
					What&apos;s this?
				</Typography>
				<HeroText>
					ClothingTracker.xyz is an application to track your clothing items 👕.
				</HeroText>
				<Typography>
					You can add your current wardrobe and then track the purchase price
					and cost-per-wear of each item.
				</Typography>

				<Typography variant="h4" component="h2">
					More Details
				</Typography>

				<ButtonGroupContainer>
					<Button
						variant="contained"
						href="https://github.com/joshamore/clothing-tracker-xyz"
						target="_blank"
						endIcon={<GitHubIcon />}
					>
						Code
					</Button>
					<Button
						variant="contained"
						href="https://joshamore.com"
						target="_blank"
						endIcon={<PersonIcon />}
					>
						Author
					</Button>
				</ButtonGroupContainer>
			</CoreContainer>
		</CoreLayout>
	);
};

export default About;
