import styled from "@emotion/styled";

import Spinner from "@mui/material/CircularProgress";

import CoreLayout from "./CoreLayout";

const LoadingContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const CoreSpinner = () => (
	<LoadingContainer>
		<Spinner />
	</LoadingContainer>
);

const LoadingSpinner = ({ hasCoreLayout = false }) => {
	if (hasCoreLayout) {
		return (
			<CoreLayout isLoggedIn={false}>
				<CoreSpinner />
			</CoreLayout>
		);
	}

	return <CoreSpinner />;
};

export default LoadingSpinner;
