import styled from "@emotion/styled";

import Spinner from "@mui/material/CircularProgress";

const LoadingContainer = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`;

const LoadingSpinner = () => {
	return (
		<LoadingContainer>
			<Spinner />
		</LoadingContainer>
	);
};

export default LoadingSpinner;
