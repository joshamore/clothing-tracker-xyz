import styled from "@emotion/styled";

import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";

export const CoreContainer = styled(Container)`
	display: flex;
	justify-content: center;
`;

export const SignupCard = styled(Paper)`
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

export const SubheaderText = styled(Typography)`
	width: 100%;
	margin: 0 8px 8px;
`;

export const SignupInputContainer = styled.div`
	display: flex;
	justify-content: center;
	flex-wrap: wrap;
	width: 100%;
`;

export const SingupInput = styled(TextField)`
	width: 100%;
	margin: 0 8px 8px;
`;

export const ValidationErrorText = styled(Typography)`
	width: 100%;
	margin-bottom: 8px;
	color: red;
	font-style: italic;
`;
